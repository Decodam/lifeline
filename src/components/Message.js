import React, { useEffect } from 'react';
import { IconVolume, IconClipboard } from "@tabler/icons-react";
import { ReactTyped } from "react-typed";
import speech from 'react-tts-voice';

const Message = (props) => {

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };


    
    useEffect(() => {
        if(props.bot && props.last) {
            speech({
                text: props.text,
                lang: 'hi-IN',
                volume: 0.8,
                rate: 1.1,
                pitch: 1,
                voice: 'Google हिन्दी'
            });
        }
    }, [])

    return (
        <div className='my-4'>
            <div className={`message-text w-fit ${props.bot ? "font-semibold text-stone-900" : "font-medium text-stone-600 ml-auto text-right"} text-lg sm:text-xl max-w-60 sm:max-w-screen-md ${!props.bot ? "bg-grayscale" : "bg-transparent"} p-4 rounded-3xl`}>
                {props.last && props.bot ? (
                    <>
                        <ReactTyped
                            strings={[props.text]}  // Pass the single message string as an array with one element
                            typeSpeed={40}
                            backSpeed={50}
                            showCursor={false}
                            loop={false}  // Set loop to false if you don't want it to loop
                        />
                    </>
                ) : props.text}
            </div>

            <div className="flex justify-between items-center px-4">
                {props.bot ? (<div className='text-sm text-stone-400'>{`>. `}Doctor Bot</div>) : (<div className='text-sm ml-auto w-fit mt-4 text-stone-400'>user{` .<`}</div>)}
                {props.bot && (
                    <div>
                        <button onClick={() => {
                            speech({
                                text: props.text,
                                lang: 'en-UK',
                                volume: 0.8,
                                rate: 1.1,
                                pitch: 1,
                                voice: 'Google UK English Male	'
                            });
                        }}>
                            <IconVolume color='#aaa' size={16} />
                        </button>
                        <button className='ml-2' onClick={() => {
                            copyToClipboard(props.text)
                        }}>
                            <IconClipboard color='#aaa' size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Message;