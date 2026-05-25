import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'
import protect from '../middleware/auth.js'

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000 // cookie 30 din baad kharab ho jaie ga :3   
}

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET, 
        {
            expiresIn: '30d'
        }
    );
}

// Register handler

// router.post('/register/admin', async (req, res) => {
const handleRegister = (role) => async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Enter all the required fields' });
    }

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    //checking to see if email already in database
    if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "Email already in use." });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // registering user in databse
    const newUser = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
        [name, email, hashedPassword, role]
    );

    const token = generateToken(newUser.rows[0].id);

    // saving jwt token in browser cookie so that user can stay signed in
    res.cookie('token', token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0] });
}


// Login handler

// router.post('/login/admin', async (req, res) => {
const handleLogin = (role) => async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Enter all the required fields' });
    }

    // querying database
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, role])


    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Not authorized' });
    }

    const userData = user.rows[0];

    const isCorrect = await bcrypt.compare(password, userData.password);

    if (!isCorrect) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken(userData.id);

    res.cookie('token', token, cookieOptions);

    res.json({ 
        user: { 
            id: userData.id, 
            name: userData.name, 
            email: userData.email,
            role: userData.role
        }
    });
}

router.post('/register/admin', handleRegister('admin'))
router.post('/register/member', handleRegister('member'))
router.post('/login/admin', handleLogin('admin'))
router.post('/login/member', handleLogin('member'))


router.get('/me', protect, async (req, res) => {
    res.json(req.user)
})

router.post('/logout', (req, res) => {
    res.cookie('token', '', { ...cookieOptions, maxAge: 1 });
    res.json({ message: 'Logged out successfully' });
})

export default router;