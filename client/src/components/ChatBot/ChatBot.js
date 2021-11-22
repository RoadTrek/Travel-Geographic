import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import gif from "../../Image/micListening.gif";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { InputGroup, Form, Button, Alert } from 'react-bootstrap';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function ChatBotComp() {
  const [chat, setChat] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const steps = [
    {
      id: '0',
      message: 'Welcome to react chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Bye!',
      end: true,
    },
  ];

  const socketRef = useRef();

  const socket = io("http://localhost:8080", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });

  useEffect(() => {
    socketRef.current = socket.connect("http://localhost:8080");
    socketRef.current.on("message", ({ note }) => {
      const temp = note.substring(8);
      console.log(temp);
      if (
        temp === "login" ||
        temp === "signup" ||
        temp === "gallery" ||
        temp === "expedition" ||
        temp === "logout"
      ) {
        window.location.href = "http://localhost:3000/" + temp;
      }
      setChat([...chat, { note }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);
  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const onMessageSubmit = (e) => {
    console.log(note);
    socketRef.current.emit("message", { note });
    e.preventDefault();
    setNote("");
  };

  const renderChat = () => {
    return chat.map(({ note }, index) => (
      <>
        <div key={index}>
          <h3>
            <span>{note}</span>
          </h3>
        </div>
      </>
    ));
  };

  const deleteMessage = () => {
    setNote("");
  };

  const chatMessages = [
    "U: Hi",
    "B: Yo!",
    "U: everything going right",
    "B: Yes, human all good!"
  ]

  return (
    <>
      <div style={{
        borderRadius: "15px 50px 30px",
        backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/000/625/887/small_2x/Abstract_Grey_transparent_geometric_background_with_triangles.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: "20px",
        bottom: 0,
        right: 0,
        position: "fixed",
        width: "400px",
        height: "60%",
        zIndex: 1000,
        opacity: 1,
        outline: "none",
        boxShadow: "rgb(204, 219, 232) 6px 6px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
      }}>
        {chatMessages.map(item => {
          if (item[0] === 'U') {
            return (<div>
              <Alert style={{ textAlign: "right", margin: "10px", width: "fit-content" }} variant="primary">
                {item}
              </Alert>
            </div>);
          } else {
            return (<Alert style={{ margin: "10px", width: "fit-content" }} variant="primary">
              {item}
            </Alert>);
          }
        }
        )}
        <InputGroup style={{ bottom: 0, position: "fixed", width: "300px", marginBottom: "14px" }}>
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username with two button addons"
          />
          <Button variant="outline-secondary">S</Button>
          <Button variant="outline-secondary">M</Button>
        </InputGroup>
      </div>

      <div className="card">
        <h1>Voice Notes</h1>
        <div className="container">
          <div className="box">
            <h2>Current Note</h2>
            {isListening ? (
              <span>Listening...</span>
            ) : (
              <span>Press to speak</span>
            )}
            <button onClick={() => setIsListening((prevState) => !prevState)}>
              {isListening ? (
                <div>
                  <img src={gif} alt="mic" />
                </div>
              ) : (
                <img
                  src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-mic-essentials-icongeek26-linear-colour-icongeek26.png"
                  alt="mic"
                />
              )}
            </button>
            <button onClick={onMessageSubmit}>
              <img
                src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-send-user-interface-kmg-design-outline-color-kmg-design.png"
                alt="Send"
              />
            </button>
            <button onClick={deleteMessage}>
              <img
                src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png"
                alt="delete"
              />
            </button>
            <p>{note}</p>
          </div>
          <div className="box"></div>
        </div>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div>
    </>
  );
}

export default ChatBotComp;
