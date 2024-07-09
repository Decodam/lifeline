import React, { useState } from 'react';
import { Squeeze as Hamburger } from 'hamburger-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPage, setPage } from '../config/navigationSlice';
import { selectLanguage, setLanguage } from '../config/languageSlice';


const Navbar = (props) => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch();
    const page = useSelector(selectPage);
    const lang = useSelector(selectLanguage);

    const toggleNav = () => {
        setOpen(!isOpen);
    }

    const toggleLanguage = () => {
        if(lang === "en"){
            dispatch(setLanguage("hi"))
        } else {
            dispatch(setLanguage("en"))
        }
    }

    return(
        <>
            <header className='flex z-10 fixed top-0 left-0 w-screen justify-center items-center h-14 bg-white'>
                <nav className='flex w-full max-w-4xl mx-5 justify-between items-center border-b border-b-stone-200 h-full'>
                    <div onClick={() => {dispatch(setPage(0))}} className="nav-logo text-primary font-semibold cursor-pointer sm:ml-10 text-xl sm:text-lg">Lifeline.{page === 1 ? "emegency" : page === 2 ? "doctor" : "ai"  }</div>
                    
                    {page === 0 && (
                        <div className="nav-list hidden sm:flex sm:mr-10 items-center">
                            <div onClick={() => {dispatch(setPage(0))}} className='ml-10 font-semibold text-dark hover:-translate-y-1 transition-transform cursor-pointer'>Home.</div>
                            <div className='ml-10 font-medium text-gray-500 hover:-translate-y-1 transition-transform cursor-pointer'><a target='_blank' rel="noreferrer" href="https://github.com/Decodam/lifeline">About.</a></div>
                            <div className='ml-10 font-medium text-gray-500 hover:-translate-y-1 transition-transform cursor-pointer'><a target='_blank' rel="noreferrer" href="https://arghya-mondal-work.netlify.app/">Contact.</a></div>
                        </div>
                    )}

                    <div className={`nav-btn z-20 flex items-center ${page === 0 ? "sm:hidden" : ""}`}>
                        {page !== 0 && (<div className='mr-4 font-semibold text-sm cursor-pointer' onClick={toggleLanguage}>{lang === "en" ? "हिंदी" : "Eng"}</div>)}
                        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
                    </div>
                </nav>
            </header>

            <div onClick={toggleNav} className={`fixed z-10 h-screen w-screen max-w-sm sm:border-r sm:border-r-gray-200 top-0 flex justify-center items-center flex-col ${isOpen ? "nav-res-open nav-res" : "nav-res"} bg-white`}>
                <div onClick={() => {dispatch(setPage(0))}} className={`my-4 text-2xl font-semibold ${page === 0 ? "text-primary" : "text-gray-500"} cursor-pointer`}>Home.</div>
                <div onClick={() => {dispatch(setPage(1))}} className={`my-4 text-2xl font-semibold ${page === 1 ? "text-primary" : "text-gray-500"} cursor-pointer`}>Emergency.</div>
                <div onClick={() => {dispatch(setPage(2))}} className={`my-4 text-2xl font-semibold ${page === 2 ? "text-primary" : "text-gray-500"} cursor-pointer`}>Doctor.</div>
                <div className='my-4 text-2xl font-medium text-gray-500 cursor-pointer'><a target='_blank' rel="noreferrer" href="https://github.com/Decodam/lifeline">About.</a></div>
                <div className='my-4 text-2xl font-medium text-gray-500 cursor-pointer'><a target='_blank' rel="noreferrer" href="https://arghya-mondal-work.netlify.app/">Contact.</a></div>
            </div>
        </>
    );
}


export default Navbar;