const LoginSidePanel = () => {
  return (
    <div className="hidden md:flex w-[55%] bg-indigo-950 relative overflow-hidden border-r border-gray-600">

        <div className="absolute -top-30 -left-30 w-62 h-62 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-30 -left-30 w-85 h-85 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full">

            <h1 className="text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-tight">Issue Tracking<br /> Management System</h1>

            <p className="text-slate-400 text-lg max-w-md leading-relaxed">blah blah blah</p>

        </div>

        <div className="absolute -bottom-30 -right-30 w-78 h-78 bg-indigo-500/20 rounded-full blur-3xl"></div>
    </div>
  )
}

export default LoginSidePanel