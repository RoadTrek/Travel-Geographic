// import React, { useState,useRef, useEffect } from 'react'
// import './ChatBot.css'
// import io from 'socket.io-client';
// import TextField from '@material-ui/core/TextField';
// // import Form from '@material-ui/core/Form';
// // const socket=io.connect("http://localhost:4000");

// const socket=io.connect("http://localhost:8080");

// function ChatBot() {

//   const [ state, setState ] = useState({ message: "", name: "" })
// 	const [ chat, setChat ] = useState([])


// 	useEffect(
// 		() => {
// 			socket.on("message", ({ name, message }) => {
// 				setChat([ ...chat, { name, message } ])
// 			})
// 			// return () => socket.current.disconnect()
// 		},
// 		// [ chat ]
// 	)

// 	const onTextChange = (e) => {
// 		setState({ ...state, [e.target.name]: e.target.value })
// 	}

// 	const onMessageSubmit = (e) => {
// 		e.preventDefault();
//     const { name, message } = state
//     console.log(message);
// 		socket.emit("message", { name, message })
// 		setState({ message: "", name })
// 	}

// 	const renderChat = () => {
// 		return chat.map(({ name, message }, index) => (
// 			<div key={index}>
// 				<h3>
// 					{name}: <span>{message}</span>
// 				</h3>
// 			</div>
// 		))
// 	}
  

  

//   return (
//     <>
//     <div className="card">
// 			<form onSubmit={onMessageSubmit}>
// 				<h1>Messenger</h1>
// 				<div className="name-field">
// 					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
// 				</div>
// 				<div>
// 					<TextField
// 						name="message"
// 						onChange={(e) => onTextChange(e)}
// 						value={state.message}
// 						id="outlined-multiline-static"
// 						variant="outlined"
// 						label="Message"
// 					/>
// 				</div>
// 				<button>Send Message</button>
// 			</form>
// 			<div className="render-chat">
// 				<h1>Chat Log</h1>
// 				{renderChat()}
// 			</div>
// 		</div>
//     </>
//   )
// }

// export default ChatBot;




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
	const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

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
				setChat([ ...chat, { name, message } ])
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
  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
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
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
				</div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
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