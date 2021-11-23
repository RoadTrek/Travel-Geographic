import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import gif from "../../Image/chatbot.gif";
import { InputGroup, Form, Button, Alert } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import userIcon from "../../Image/usericon.png";
import botIcon from "../../Image/bot.png";

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
    setUserMessage("");
    setIsListening((prevState) => !prevState);
    e.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      chatSubmitHandler(event);
    }
  };

  const ROOT_CSS = css({
    height: 330,
  });

  let renderThis;

  if (isOpen) {
    renderThis = (
      <div
        style={{
          opacity: 1,
          borderRadius: "15px 50px 30px",
          backgroundImage:
            "url('https://i.pinimg.com/originals/90/de/6a/90de6a722188fc9a9c0835db1f0e5500.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          bottom: 0,
          right: 0,
          position: "fixed",
          width: "400px",
          height: "70%",
          zIndex: 1000,
          outline: "none",
          boxShadow:
            "rgb(204, 219, 232) 6px 6px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
        }}
      >
        <div>
          <img
            alt=""
            style={{
              float: "right",
              margin: "5px",
              marginBottom: "5px",
              zIndex: "20000",
              position: "relative",
            }}
            onClick={() => setIsOpen(false)}
            src={"https://img.icons8.com/ios/35/000000/cancel.png"}
          />
        </div>
        <div>
          <ScrollToBottom className={ROOT_CSS}>
            {chatMessages.map((item) => {
              if (item[0] === "U") {
                return (
                  <div style={{ justifyContent: "right", display: "flex" }}>
                    <Alert
                      style={{
                        borderRadius: "100px",
                        margin: "10px",
                        width: "fit-content",
                      }}
                      variant="primary"
                    >
                      {item.substring(2)}
                    </Alert>
                    <img
                      style={{ height: "60px", width: "60px" }}
                      src={userIcon}
                      alt=""
                    />
                  </div>
                );
              } else {
                return (
                  <div style={{ justifyContent: "left", display: "flex" }}>
                    <img
                      style={{ height: "60px", width: "60px" }}
                      src={botIcon}
                      alt=""
                    />
                    <Alert
                      style={{
                        borderRadius: "100px",
                        margin: "10px",
                        width: "fit-content",
                      }}
                      variant="success"
                    >
                      {item.substring(2)}
                    </Alert>
                  </div>
                );
              }
            })}
          </ScrollToBottom>
        </div>
        {/* <div style={{  borderBottomRightRadius: "50px !important" }}> */}
          <InputGroup
            style={{
              bottom: 0,
              position: "fixed",
              width: "300px",
              marginBottom: "14px",
            }}
          >
            <Form.Control
            style={{borderRadius:"20px"}}
              onKeyPress={handleKeyPress}
              value={userMessage}
              onChange={(event) => setUserMessage(event.target.value)}
              aria-label="Recipient's username with two button addons"
            />
            <img
              alt=""
              style={{ border: "1px solid #464f4f", marginLeft: "4px" }}
              onClick={chatSubmitHandler}
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/30/000000/external-send-user-interface-kmg-design-flat-kmg-design.png"
            />
            <span onClick={() => setIsListening((prevState) => !prevState)}>
              {isListening ? (
                <img
                  alt=""
                  style={{ border: "1px solid #464f4f", marginLeft: "4px" }}
                  src="https://img.icons8.com/emoji/37/000000/red-circle-emoji.png"
                />
              ) : (
                <img
                  alt=""
                  style={{ border: "1px solid #464f4f", marginLeft: "4px" }}
                  src="https://img.icons8.com/small/37/000000/microphone.png"
                />
              )}
            </span>
          </InputGroup>
        {/* </div> */}
      </div>
    );
  } else {
    renderThis = (
      <Button class="bg-transparent" onClick={() => setIsOpen(true)}>
        <img
          style={{
            height: "80px",
            width: "70px",
            bottom: 70,
            right: 60,
            position: "fixed",
          }}
          alt=""
          src={gif}
        />
      </Button>
    );
  }

  return <>{renderThis}</>;
}

export default ChatBotComp;
