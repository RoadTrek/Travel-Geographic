import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client";
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function ChatBot() {
    const [chat, setChat] = useState([])
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)

    const socketRef = useRef()

    const socket = io("http://localhost:8080", {
        withCredentials: true,
        extraHeaders: {
            "my-custom-header": "abcd"
        }
    });

    useEffect(
        () => {
            socketRef.current = socket.connect("http://localhost:8080")
            socketRef.current.on("message", ({ name, message }) => {
                setChat([...chat, { name, message }])
            })
            return () => socketRef.current.disconnect()
        },
        [chat]
    )
    useEffect(() => {
        handleListen()
    }, [isListening])

    const handleListen = () => {
        if (isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log('Stopped Mic on Click')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }

        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            console.log(transcript)
            setNote(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    const onMessageSubmit = (e) => {
        socketRef.current.emit("message", { note })
        e.preventDefault()
        setNote('')
    }

    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                    <span>{note}</span>
                </h3>
            </div>
        ))
    }

    return (
        <>
            <div className="card">
                <h1>Voice Notes</h1>
                <div className="container">
                    <div className="box">
                        <h2>Current Note</h2>
                        {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                        <button onClick={() => setIsListening(prevState => !prevState)}>
                            Start/Stop
                        </button>
                        <p>{note}</p>
                    </div>
                    <div className="box">
                    </div>
                </div>
                <form onSubmit={onMessageSubmit}>

                </form>
                <div className="render-chat">
                    <h1>Chat Log</h1>
                    {renderChat()}
                </div>
            </div>
        </>
    )
}

export default ChatBot