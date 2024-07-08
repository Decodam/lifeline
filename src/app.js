import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPage } from './config/navigationSlice';
import HomePage from './pages/HomePage';
import EmergencyChat from './pages/EmergencyChat';


const App = (props) => {
    const page = useSelector(selectPage);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    useEffect(() => {
        const checkVoices = () => {
            if (window.speechSynthesis.getVoices().length > 0) {
                setVoicesLoaded(true);
            } else {
                window.speechSynthesis.onvoiceschanged = () => {
                    setVoicesLoaded(true);
                };
            }
        };

        checkVoices();
    }, []);


    if (!voicesLoaded) {
        return(
            <div className='h-screen w-screen flex justify-center items-center'><div className='spinner' /></div>
        ); 
    }


    return(
        <>
            {
                (page === 1) ? (
                    <EmergencyChat />
                ) : (<HomePage />)
            }
        </>
    );
}


export default App;