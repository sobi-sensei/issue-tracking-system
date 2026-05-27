import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MenuIcon, UserIcon, XIcon } from 'lucide-react'

const NavBar = ({ user }) => {
  
    const { pathname } = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)


     //closing navbar on routing
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])


    const userName = user?.name || 'user'
    const role = user?.role || 'member'

    // const role = "" || "Member"

    const navbarContent = (

        

        <>
            {/* header */}
            <div className='px-5 pt-6 pb-5 border-b border-white/6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <UserIcon className='text-white size-7'/>
                        <div>
                            <p className='font-semibold text-[13px] text-white tracking-wide'>Project MS</p>
                            <p className='text-[11px] text-slate-500 font-medium'>Management System</p>
                        </div>
                    </div>
                    <button onClick={()=>setMobileOpen(false)} className='lg:hidden text-slate-400 hover:text-white p-1'>
                        <XIcon size={20}/>
                    </button>
                </div>
            </div>

            {/* user profile */}
            {userName && (
                <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4'>
                    <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0'>
                            <span className='text-slate-400 text-xs font-semibold'>
                                {userName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className='min-w-0'>
                            <p className='text-[13px] font-medium text-slate-200 truncate'>{userName}</p>
                            <p className='text-[11px] text-slate-500 truncate'>{role === "admin" ? "Admin" : "Member"}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

    return (
    <>
        {/* hamburger button mobile */}
        <button onClick={() => setMobileOpen(true)} className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10'>
            <MenuIcon size={20}/>
        </button>

        {/* mobile overlay */}
        {mobileOpen && <div className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40' onClick={() => setMobileOpen(false)}/>}

        {/* desktop navbar */}
        <aside className='hidden lg:flex flex-col h-full w-[260px] bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4'>
            {navbarContent}
        </aside>

        {/* mobile navbar */}
        <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0': '-translate-x-full'}`}>
            {navbarContent}
        </aside>
    </>
  )
}

export default NavBar