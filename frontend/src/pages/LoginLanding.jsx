import { Link } from "react-router-dom"
import { ShieldIcon, UserIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'


import LoginSidePanel from "../components/LoginSidePanel"
import LoginForm from "../components/LoginForm"

const LoginLanding = ({ mode = 'login' }) => {

  const isLogin = mode === 'login'
  const basePath = isLogin ? '/login' : '/register'

  const portalOptions = [
    {
        to: `${basePath}/admin`,
        title: "Admin Portal",
        description: isLogin ? "Sign in to manage your crem" : "Create an admin account",
        icon: ShieldIcon
    },
    {
        to: `${basePath}/member`,
        title: "Member Portal",
        description: isLogin ? "Sign in to access your account" : "Register as a member",
        icon: UserIcon
    }
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        <LoginSidePanel />

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">

            <div className="w-full max-w-md animate-fade-in relative z-10">

                {/* Header */}
                <Link to='/auth' className='inline-flex items-center gap-1 text-slate-400 hover:text-slate-500 text-sm mb-10 transition-colors'>
                    <ArrowLeftIcon size={16}/> Return to previous page
                </Link>

                <div className="mb-20 text-center md:text-left">
                    <h2 className="text-3xl font-medium text-slate-900 tracking-tight">
                        {isLogin ? 'Welcome' : 'Create Account'}
                    </h2>
                    <p className="text-slate-500">Choose your designated role.</p>
                </div>

                {/* Portal List */}
                <div className="space-y-3">
                    {portalOptions.map((portal)=>(
                        <Link 
                        key={portal.to} 
                        to={portal.to} className="group block bg-slate-100 border border-slate-50 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-100">
                            <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-5">
                                <h3 className="text-md text-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">{portal.title}</h3>
                                <p className="text-sm text-slate-400">{portal.description}</p>
                                <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-all duration-300"/>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    </div>
  )
}

export default LoginLanding