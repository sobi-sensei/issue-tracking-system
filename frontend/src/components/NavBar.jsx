import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {} from 'lucide-react'
import { dummyData } from '../assets/assets'

const NavBar = () => {
  
    const { pathname } = useLocation
    const [userName, setUserName] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        setUserName(dummyData.firstName + ' ' + dummyData.lastName)
    }, [])

    const navbarContent = (
        <>
        
        </>
    )

    //closing navbar on routing
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    return (
    <>
        <button onClick={() => setMobileOpen(true)} className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10'>
            <MenuIcon size={20}/>
        </button>

        {/* Mobile Overlay */}
        {mobileOpen && <div className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40' onClick={() => setMobileOpen(false)}/>}

        {/* Desktop navbar */}
        <aside className='hidden lg:flex flex-col h-full w-full w-[260px] bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4'>
            {navbarContent}
        </aside>

        {/* Desktop navbar */}
        <aside className="lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0': '-translate-x-full'}">
            {navbarContent}
        </aside>
    </>
  )
}

export default NavBar