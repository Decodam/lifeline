import React, {  } from 'react';
import { useSelector } from 'react-redux';
import { selectPage } from './navigationSlice';
import HomePage from './pages/HomePage';
import EmergencyChat from './pages/EmergencyChat';


const App = (props) => {
    const page = useSelector(selectPage);


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