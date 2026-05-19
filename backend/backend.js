import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookieparser'
import authRoutes from './routes/auth'

dotenv.config();

const app = express();

// middlewares for parsing json request and cookies
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('sensei off the wagon');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('backend bhaag rha hy port ${PORT} pe');
})