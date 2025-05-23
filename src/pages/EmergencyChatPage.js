import React, { useEffect, useRef, useState } from 'react';
import { IconMicrophone, IconMessage, IconPaperclip, IconX, IconSend, IconChevronDown } from "@tabler/icons-react"
import Message from '../components/Message';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../config/languageSlice';

const EmergencyChatPage = () => {
    const [Listening, setListening] = useState(false);
    const [TextMode, setTextMode] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const lang = useSelector(selectLanguage);
    const { transcript, resetTranscript } = useSpeechRecognition();

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEN_AI_KEY);


    const [Messages, setMessages] = useState([
        {
            message: "Hey this is lifeline, what is your emergency?",
            bot: true
        },
    ])

    const toggleTextMode = () => {
        setTextMode(!TextMode)
    }

    
    const processResponse = (text) => {
        // Define the flag prefixes
        const flags = {
            location: '--location',
            services: '--services',
            procedure: '--procedure'
        };
    
        let cleanedText = text;
    
        // Check for --location flag
        if (cleanedText.includes(flags.location)) {
            alert("Accessing your location....");
            cleanedText = cleanedText.replace(flags.location, '');
        }
    
        // Check for --services flag
        if (cleanedText.includes(flags.services)) {
            alert("Emergency services are on their way....");
            cleanedText = cleanedText.replace(flags.services, '');
        }
    
        // Check for --procedure flag
        if (cleanedText.includes(flags.procedure)) {
            const procedureStartIndex = cleanedText.indexOf(flags.procedure);
            let procedureName = cleanedText.substring(procedureStartIndex + flags.procedure.length + 1); // Skip over "--procedure-" and the following dash
            const spaceIndex = procedureName.indexOf(' ');
            if (spaceIndex !== -1) {
                procedureName = procedureName.substring(0, spaceIndex); // Extract only the first word
            }
            procedureName = procedureName.trim();
            
            const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${procedureName}`;
            window.open(youtubeSearchUrl, '_blank');
            cleanedText = cleanedText.replace(flags.procedure + '-' + procedureName, ''); // Replace "--procedure-procedureName" with an empty string
        }
    
        // Remove extra spaces and return cleaned text
        return cleanedText.trim();
    };

    const handleSend = async () => {
        let response;
        if (Listening) {
            setUserInput(transcript);
            SpeechRecognition.stopListening();
            setListening(false);
            
            // Add user's audio input to Messages
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    message: transcript, // Use transcript here instead of userInput
                    bot: false
                }
            ]);
            response = await sendMessageToGemini(transcript);
            resetTranscript();

        }
        else{                    
            // Add user's text input to Messages
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    message: userInput, // Use transcript here instead of userInput
                    bot: false
                }
            ]);

            response = await sendMessageToGemini(userInput);
        }

        let cleanText = processResponse(response)
    
        setMessages(prevMessages => [
            ...prevMessages,
            {
                message: cleanText,
                bot: true
            }
        ]);
    
        setUserInput("");
    }
    
    
    // Mapping function to transform Messages to the required format
    const transformMessages = (messages) => {
        // Manual message to prepend
        const manualMessage = {
            role: "user",
        parts: [{ text: ` ${lang === "hi" ? " Respond in hindi from now onwards" : ""} You are an AI emergency dispatcher (similar to 911). you are supposed to help the callers out as their emergency lifeline. Try to solve their problems and be proactive and innovative. If necesary you can
            1. Ask them them their location.
            2. Tell where necesary emergency services can be found based on their location. Also provide with emergency numbers
            3. No need to mention that you are ai, the user already knows this is just for research. Just make it natural and realistic. 
            4. You can guide them with emergency life saving procedures as you might be their only help` 
        }]
        };
    
        // Mapping existing messages and prepending the manual message
        const transformedMessages = [
            manualMessage,
            ...messages.map((msg) => ({
                role: msg.bot ? "model" : "user",
                parts: [{ text: msg.message }],
            }))
        ];
    
        return transformedMessages;
    };
    
    const sendMessageToGemini = async (input) => {
        const messageHistory = transformMessages(Messages);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const chat = model.startChat({
            history: messageHistory,
            generationConfig: {
                maxOutputTokens: 100,
            },
        });
        
        // Constructing the prompt based on conversation history
        
        const promt = (lang === "hi" ? " Respond in hindi from now onwards" : "") + "-> Last Message from caller: "+input+` - Use these information to create a emergency for our caller. you must also attach these three flags to interact with the user based on the chat history and information you have and requirements:
            --procedure-[procudureName] then you can redirect user to show how to do something or a procedure (for example how to use fireextengisher first aid or cpr according to situation put them in one word like firstAid.) with procedureName being procedure name. Use it as much as possible as showing how to do is faster in emergency
            --location at the back of you response you will get location of the user, 
            --services then you can call emergency services. 
        `;
    
        const result = await chat.sendMessage(promt);
        const response = await result.response;
        let text = response.text();
    
        // Remove asterisks and hash symbols
        text = text.replace(/[*#]/g, '');
    
        return text;
    }



    const startListening = () => {
        if(Listening){
            SpeechRecognition.stopListening();
            setListening(false);
        } else {
            setListening(true);
            SpeechRecognition.startListening({ continuous: true });
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;
            setShowScrollButton(scrollTop + clientHeight < scrollHeight && scrollTop > 0);
        }
    };


    const handleCancel = () => {
        SpeechRecognition.stopListening();
        resetTranscript();
        setListening(false);
        setTextMode(false);
        setUserInput("");
    }


    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [userInput]);

    return (
        <>
            <Navbar />
            <div className="h-screen w-screen flex justify-center">
                <div className="max-w-screen-lg w-full my-20 mx-5" ref={chatContainerRef} onScroll={handleScroll} style={{ overflowY: 'auto' }}>

                    {Messages.map((item, index) => (
                        <Message text={item.message} bot={item.bot} last={(Messages.length === index+1) ? (true) : (false)} key={index} />
                    ))}
                    
                    {Listening && <p className='text-gray-300 text-sm m-5 text-clip'>Transcript: {transcript}</p>}

                    <div ref={messagesEndRef}  />
                </div>
                    <button
                        onClick={scrollToBottom}
                        className={`fixed bottom-24 bg-primary text-white p-2 rounded-full shadow-lg ${showScrollButton ? 'visible' : 'invisible'}`}
                    >
                        <IconChevronDown size={18} />
                    </button>
            </div>

            <div className="h-20 fixed bottom-0 bg-white w-screen flex justify-center items-center">
                <div className="max-w-screen-lg w-full mx-5 h-full flex justify-center items-center border-t-gray-200 border-t">
                    {TextMode ? (
                        <div onClick={handleCancel} className={`bg-gray-100 mx-4 size-12 rounded-full flex justify-center items-center cursor-pointer sm:hover:bg-gray-200 sm:hover:scale-105 transition`}>
                            <IconX />
                        </div>
                    ) : (
                        <div onClick={toggleTextMode} className={`bg-gray-100 mx-4 size-12 rounded-full flex justify-center items-center cursor-pointer sm:hover:bg-gray-200 sm:hover:scale-105 transition`}>
                            <IconMessage />
                        </div>
                    )}


                    {TextMode ? (
                        <>
                            <input type="text" placeholder='What is your question?' name="message" value={userInput} className='flex-1 min-w-0 h-full' onChange={(e) => setUserInput(e.target.value)} />
                            <div onClick={handleSend} className={`bg-primary mx-4 size-12 sm:w-20 rounded-full flex justify-center items-center cursor-pointer sm:hover:bg-primary sm:hover:scale-105 transition`}>
                                <IconSend color='#fff' />
                            </div>
                        </>
                    ) : (
                        <>
                            {Listening ?( 
                                <div onClick={handleSend} className={`${Listening ? "bg-primary" : "bg-primary"} size-14 rounded-full flex justify-center items-center cursor-pointer scale-105 sm:hover:bg-primary sm:hover:scale-110 transition`}>
                                    <IconSend color='#fff' />
                                </div>
                                ) : (
                                    <div onClick={startListening} className={`${Listening ? "bg-primary" : "bg-primary"} size-14 rounded-full flex justify-center items-center cursor-pointer sm:hover:bg-primary sm:hover:scale-105 transition`}>
                                        <IconMicrophone color='#fff' />
                                    </div>
                                )}
                            
                            {Listening ? (
                                <div onClick={handleCancel} className={`bg-gray-100 mx-4 size-12 rounded-full flex justify-center items-center cursor-pointer sm:hover:bg-gray-200 sm:hover:scale-105 transition`}>
                                    <IconX />
                                </div>
                            ) : (
                                <div className={`bg-gray-100 mx-4 size-12 rounded-full flex justify-center items-center cursor-pointer sm:hover:bg-gray-200 sm:hover:scale-105 transition`}>
                                    <IconPaperclip />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

        </>
    );
}


export default EmergencyChatPage;