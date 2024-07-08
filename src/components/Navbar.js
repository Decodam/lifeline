import React, { useState } from 'react';
import { Squeeze as Hamburger } from 'hamburger-react'


const Navbar = (props) => {
    const [isOpen, setOpen] = useState(false);

    const toggleNav = () => {
        setOpen(!isOpen);
    }

    return(
        <>
            <header className='flex z-10 fixed top-0 left-0 w-screen justify-center items-center h-14 bg-white'>
                <nav className='flex w-full max-w-4xl mx-5 justify-between items-center border-b border-b-stone-200 h-full'>
                    <div className="nav-logo text-primary font-semibold cursor-pointer sm:ml-10 text-xl sm:text-lg">Lifeline.ai</div>
                    <div className="nav-list hidden sm:flex sm:mr-10 items-center">
                        <div className='ml-10 font-semibold text-dark hover:-translate-y-1 transition-transform cursor-pointer'>Home.</div>
                        <div className='ml-10 font-medium text-gray-500 hover:-translate-y-1 transition-transform cursor-pointer'><a target='_blank' rel="noreferrer" href="https://github.com/Decodam/lifeline">About.</a></div>
                        <div className='ml-10 font-medium text-gray-500 hover:-translate-y-1 transition-transform cursor-pointer'><a target='_blank' rel="noreferrer" href="https://arghya-mondal-work.netlify.app/">Contact.</a></div>
                    </div>
                    <div className="nav-btn z-20 sm:hidden">
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
                    </div>
                </nav>
            </header>

            <div onClick={toggleNav} className={`fixed z-10 h-screen w-screen top-0 flex justify-center items-center flex-col ${isOpen ? "nav-res-open nav-res" : "nav-res"} bg-white`}>
                <div className='my-4 text-2xl font-semibold text-primary cursor-pointer'>Home.</div>
                <div className='my-4 text-2xl font-medium text-gray-500 cursor-pointer'><a target='_blank' rel="noreferrer" href="https://github.com/Decodam/lifeline">About.</a></div>
                <div className='my-4 text-2xl font-medium text-gray-500 cursor-pointer'><a target='_blank' rel="noreferrer" href="https://arghya-mondal-work.netlify.app/">Contact.</a></div>
            </div>
        </>
    );
}


export default Navbar;