import React, { useEffect, useState } from "react";
import "./Main.css";
import { IoSend } from "react-icons/io5";

const Main = ({
  value,
  setValue,
  message,
  setMessage,
  title,
  setTitle,
  prechat,
  setPrechat,
}) => {
  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:8000/response", options);
      const data = await response.json();
      setMessage(data.outputs[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!title && value && message) {
      setTitle(value);
    }

    if (title && value && message) {
      setPrechat((prechat) => [
        ...prechat,
        {
          title: title,
          content: value,
        },
      ]);
      setValue("");

      setTimeout(() => {
        setPrechat((prechat) => [
          ...prechat,
          {
            title: title,
            content: message.text,
          },
        ]);
      }, 1000);
    }
  }, [message, title]);

  const chat = prechat.filter((prechat) => prechat.title === title);
  return (
    <div className="main">
      <div className="top">
        <p>Gemini</p>
      </div>

      <div className="chat">
        <div className="chat-area">
          <div className="greet">
            {!title && <p>Hello</p>}
            {!title && <p>How can i help you today</p>}
          </div>
          {chat?.map((chatMessage, index) => (
            <div
              key={index}
              className={`chat-message ${
                index % 2 === 0 ? "user-message" : "bot-message"
              }`}
            >
              <p>{chatMessage.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <div className="search-box">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask anything"
          />
          <IoSend onClick={getMessages} className="send" />
        </div>
      </div>
    </div>
  );
};

export default Main;
