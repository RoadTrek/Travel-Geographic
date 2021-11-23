import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import gif from "../../Image/micListening.gif";
import { InputGroup, Form, Button, Alert } from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from '@emotion/css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function ChatBotComp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

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
      console.log("inside");
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
      setChatMessages([...chatMessages, "B: " + note]);
    });
    return () => socketRef.current.disconnect();
  }, [chatMessages]);
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
      setUserMessage(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const chatSubmitHandler = (e) => {
    const tempChat = [...chatMessages];
    tempChat.push("U: " + userMessage);
    setChatMessages(tempChat);
    console.log(userMessage);
    socketRef.current.emit("message", { userMessage });
    setUserMessage('');
    e.preventDefault();
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      chatSubmitHandler(event);
    }
  }

  const ROOT_CSS = css({
    height: 330,
  });

  let renderThis;

  if (isOpen) {
    renderThis = (
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
        width: "350px",
        height: "70%",
        zIndex: 1000,
        opacity: 1,
        outline: "none",
        boxShadow: "rgb(204, 219, 232) 6px 6px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
      }}>
        <div>
          <img
            style={{ float: "right", margin: "5px", marginBottom: "5px", zIndex: "20000", position: "relative" }}
            onClick={() => setIsOpen(false)}
            src={"https://img.icons8.com/ios/35/000000/cancel.png"}
          />
        </div>
        <div>
          <ScrollToBottom className={ROOT_CSS}>
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
          </ScrollToBottom>
        </div>


        <InputGroup style={{ bottom: 0, position: "fixed", width: "300px", marginBottom: "14px" }}>
          <Form.Control
            onKeyPress={handleKeyPress}
            value={userMessage}
            onChange={(event) => setUserMessage(event.target.value)}
            aria-label="Recipient's username with two button addons"
          />
          <Button style={{ border: "1px solid black", marginLeft: "4px" }} onClick={chatSubmitHandler} variant="outline-secondary">S</Button>
          <span onClick={() => setIsListening((prevState) => !prevState)}>
            {isListening ?
              <img style={{ border: "1px solid black", marginLeft: "4px" }} src="https://img.icons8.com/emoji/37/000000/red-circle-emoji.png" />
              :
              <img style={{ border: "1px solid black", marginLeft: "4px" }} src="https://img.icons8.com/small/37/000000/microphone.png" />
            }
          </span>
        </InputGroup>
      </div>
    )
  }
  else {
    renderThis = (
      <Button style={{
        bottom: 0,
        right: 0,
        position: "fixed",
      }} onClick={() => setIsOpen(true)} variant="primary" size="lg">
        Open ChatBot
      </Button>
    )
  }

  return (
    <>
      {renderThis}
    </>
  );
}

export default ChatBotComp;
