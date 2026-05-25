import { Link } from 'react-router-dom'
import { LogInIcon, UserPlusIcon } from 'lucide-react'
import LoginSidePanel from '../components/LoginSidePanel'

const Landing = () => {

    const options = [
        {
            to: '/login',
            title: 'Login',
            description: 'Sign in to access your account',
            icon: LogInIcon
        },
        {
            to: '/register',
            title: 'Register',
            description: 'Create an account',
            icon: UserPlusIcon
        }
    ]

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <LoginSidePanel/>

            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen'>
                <div className='w-full max-w-md animate-fade-in relative z-10'>

                    <div className='mb-20 text-center md:text-left'>
                        <h2 className='text-3xl font-medium text-slate-900 tracking-tight'>Get Started</h2>
                        <p className='text-slate-500'>Login or create a new account.</p>
                    </div>

                    <div className='space-y-3'>
                        {options.map((option) => (
                            <Link
                                key={option.to}
                                to={option.to}
                                className='group block bg-slate-100 border border-slate-50 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-100'
                            >
                                <div className='relative z-10 flex items-center justify-between gap-4 sm:gap-5'>
                                    <div>
                                        <h3 className="text-md text-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">{option.title}</h3>
                                        <p className="text-sm text-slate-400">{option.description}</p>
                                    </div>
                                    <option.icon className='w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-all duration-300 shrink-0' />
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )

}

export default Landing