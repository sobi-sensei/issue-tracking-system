import { Link } from "react-router-dom"
import { ShieldIcon, UserIcon, ArrowRightIcon } from 'lucide-react'


import LoginSidePanel from "../components/LoginSidePanel"
import LoginForm from "../components/LoginForm"

const LoginLanding = () => {

  const portalOptions = [
    {
        to: "/login/admin",
        title: "Admin Portal",
        description: "blalcla",
        icon: ShieldIcon
    },
    {
        to: "/login/member",
        title: "Member Portal",
        description: "avlsdlcvjsv",
        icon: UserIcon
    }
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        <LoginSidePanel />

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">

            <div className="w-full max-w-md animate-fade-in relative z-10">

                {/* Header */}
                <div className="mb-20 text-center md:text-left">
                    <h2 className="text-3xl font-medium text-slate-900 tracking-tight">Welcome</h2>
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
                                <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-all duration-300"/>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
            </div>

        </div>
    </div>
  )
}

export default LoginLanding