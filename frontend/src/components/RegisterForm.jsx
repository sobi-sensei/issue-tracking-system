import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from 'lucide-react'

import LoginSidePanel from './LoginSidePanel'

const RegisterForm = ({ role, title, subtitle, setUser }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/register/${role}`, 
            {
                name,
                email,
                password
            })

            setUser(response.data.user)
            
            navigate('/dashboard')

        } catch (err) {

        setError(

            err.response?.data?.message ||
            'Registration failed.'

        )
        } finally {

        setLoading(false)

        }
    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <LoginSidePanel />

                <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>
                    <div className='w-full max-w-md animate-fade-in'>

                    <Link to='/register' className='inline-flex items-center gap-1 text-slate-400 hover:text-slate-500 text-sm mb-10 transition-colors'>
                        <ArrowLeftIcon size={16}/> Return to previous page
                    </Link>

                    <div className='mb-8'>
                        <h1 className='text-2xl sm:text-3xl font-medium text-zinc-800'>{title}</h1>
                        <p className='text-slate-500 text-sm sm:text-base'>{subtitle}.</p>
                    </div>

                    {error && (
                        <div className='mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3'>
                            <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0' />
                            {error}
                        </div>
                    )}

                    <form className='space-y-5' onSubmit={handleSubmit}>

                        <div>
                            <label className='block text-sm font-semibold text-slate-700 mb-2'>Full Name</label>
                            
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder='John Doe'
                                className='w-full text-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-slate-700 mb-2'>Email ID</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='you@example.com'
                                className='w-full text-sm border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-slate-700 mb-2'>Password</label>
                            <div className='relative'>
                                <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='**********'
                                className='w-full text-sm border border-slate-300 rounded-xl px-4 py-3 pr-11 outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
                                />
                                <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center'
                        >
                            {loading && <Loader2Icon className='animate-spin h-4 w-4 mr-2' />}
                            Create Account
                        </button>

                    </form>

                    </div>
                </div>
        </div>
  )
}

export default RegisterForm