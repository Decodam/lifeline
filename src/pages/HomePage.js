import React from 'react';
import Navbar from '../components/Navbar';
import { IconArrowUpRight } from '@tabler/icons-react';
import doctor from "../assets/doctor-image.svg";
import emergency from "../assets/emergency-image.svg";
import { useDispatch } from 'react-redux';
import { setPage } from '../config/navigationSlice';


const HomePage = (props) => {
    const currentYear = new Date().getFullYear();
    const dispatch = useDispatch();



    return(
        <>
            <Navbar />
            <div className='container mt-24 sm:mt-14 w-full p-5 max-w-4xl mx-auto'>
                {/* Hero Section */}
                <div id="hero" className='md:min-h-96 flex flex-col justify-center'>
                    <p className="text-4xl text-center sm:text-left font-bold max-w-2xl"><span className='text-primary'>Lifeline</span> helps you find <br /> Life support during <span className='text-primary'>emergencies</span></p>
                    <p className='mt-8 sm:mt-4 text-center sm:text-left text-stone-600 max-w-2xl'>LifeLine is an AI-based emergency service fixing slow response times in developing countries. We offer instant aid, rapid response, and an AI doctor for symptom-based diagnoses. Save lives with lifeline!</p>
                    <div className="flex flex-col mx-auto justify-center items-center sm:ml-0 sm:flex-row mt-8 sm:mt-7">
                        <div onClick={() => {dispatch(setPage(1))}} className="px-7 py-2 size-fit rounded-lg bg-primary text-white cursor-pointer font-semibold transition-all sm:hover:-translate-y-2">Emergency</div>
                        <div onClick={() => {dispatch(setPage(2))}} className="px-7 py-2 size-fit mt-3 sm:ml-4 sm:mt-0 rounded-lg bg-offwhite text-dark cursor-pointer font-semibold transition-all sm:hover:-translate-y-2">AI Diagnosis</div>
                    </div>
                </div>
            </div>

            {/* Bento Section */}
            <div className='bentogrid w-full p-5 max-w-5xl mx-auto'>
                <div className="girdrow flex flex-col md:flex-row">
                    {/* Emergency card */}
                    <div onClick={() => {dispatch(setPage(1))}} className="bentocard border border-offwhite relative group m-3 rounded-3xl overflow-hidden flex-1 min-h-64 bg-grayscale p-9 cursor-pointer">
                        <div
                            style={{ background: "#363636" }}
                            className="iconbutton absolute top-4 right-4 group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity size-10 flex justify-center items-center rounded-full duration-300 text-grayscale"
                        >
                            <IconArrowUpRight />
                        </div>
                        <p className="cardlead mt-10 md:mt-0 max-w-64 font-bold text-4xl">Emergency Response</p>
                        <p className="carddesc max-w-64 mt-3 font-medium text-sm text-gray-500">Get AI assisted emergency dispatcher powered by Google Gemini API.</p>
                        <img src={emergency} alt="Emergency" className="md:absolute bottom-0 right-0 md:mt-5 md:ml-5 size-48" />
                    </div>

                    {/* Doctor card */}
                    <div onClick={() => {dispatch(setPage(2))}} className="bentocard border border-offwhite relative group m-3 rounded-3xl overflow-hidden flex-1 min-h-64 bg-grayscale p-9 cursor-pointer">
                        <div
                            style={{ background: "#363636" }}
                            className="iconbutton absolute top-4 right-4 group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity size-10 flex justify-center items-center rounded-full duration-300 text-grayscale"
                        >
                            <IconArrowUpRight />
                        </div>
                        <p className="cardlead mt-10 md:mt-0 max-w-64 font-bold text-4xl">AI Assisted Diagnosis</p>
                        <p className="carddesc max-w-64 mt-3 font-medium text-sm text-gray-500">Get experimental AI assisted preliminary diagnosis using the Gemini API.</p>
                        <img src={doctor} alt="Doctor" className="md:absolute  bottom-0 right-0 md:mt-5 md:ml-5 size-48" />
                    </div>
                </div>

                <div className="girdrow flex flex-col md:flex-row">
                    {/* Procedure card */}
                    <div className="bentocard flex flex-col justify-end border border-offwhite relative group m-3 rounded-3xl overflow-hidden flex-[1.75] bg-grayscale p-9 cursor-pointer">
                        <div
                            style={{ background: "#363636" }}
                            className="iconbutton absolute top-4 right-4 group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity size-10 flex justify-center items-center rounded-full duration-300 text-grayscale"
                        >
                            <IconArrowUpRight />
                        </div>
                        <p className="cardlead mt-10 md:mt-0 max-w-64 font-bold text-4xl">Learn Procedures</p>
                        <p className="carddesc max-w-64 mt-3 font-medium text-sm text-gray-500">Learn more about life saving emergency procedures and how to perform them.</p>
                    </div>

                    {/* About card */}
                    <div className="bentocard  flex flex-col justify-end border border-offwhite relative group m-3 rounded-3xl overflow-hidden flex-1 bg-grayscale p-9 cursor-pointer">
                        <a href="https://github.com/Decodam/lifeline" target="_blank" rel="noopener noreferrer">
                            <div
                                style={{ background: "#363636" }}
                                className="iconbutton absolute top-4 right-4 group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity size-10 flex justify-center items-center rounded-full duration-300 text-grayscale"
                            >
                                <IconArrowUpRight />
                            </div>
                        </a>    
                        <p className="cardlead mt-10 md:mt-0 max-w-64 font-bold text-4xl">About us</p>
                        <p className="carddesc max-w-64 mt-3 font-medium text-sm text-gray-500">Learn more about lifeline and its mission and contribute to it.</p>
                    </div>

                    {/* Contact card */}
                    <div className="bentocard  flex flex-col justify-end border border-offwhite relative group m-3 rounded-3xl overflow-hidden flex-1 bg-grayscale p-9 cursor-pointer">
                        <a href="https://arghya-mondal-work.netlify.app/" target="_blank" rel="noopener noreferrer">
                            <div
                                style={{ background: "#363636" }}
                                className="iconbutton absolute top-4 right-4 group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity size-10 flex justify-center items-center rounded-full duration-300 text-grayscale"
                            >
                                <IconArrowUpRight />
                            </div>
                        </a>
                        <p className="cardlead mt-10 md:mt-0 max-w-64 font-bold text-4xl">Contact</p>
                        <p className="carddesc max-w-64 mt-3 font-medium text-sm text-gray-500">Lets connect and discuss how we can save more lives.</p>
                    </div>
                </div>
            </div>


            <div className='footer-container w-full p-5 max-w-5xl mx-auto'>
                <footer className="bg-white text-center py-4 border-t border-t-gray-200">
                    <p>Made by Arghya Mondal</p>
                    <div className="flex justify-center items-center mt-2">
                        <a href="https://github.com/Decodam" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary mx-2">GitHub</a>
                        <a href="https://www.linkedin.com/in/arghya-mondal-work/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary mx-2">LinkedIn</a>
                        <a href="https://www.instagram.com/arghya__mondal/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary mx-2">Instagram</a>
                        <a href="https://arghya-mondal-work.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary mx-2">Portfolio</a>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">&copy; {currentYear} Arghya Mondal. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
}

export default HomePage;
