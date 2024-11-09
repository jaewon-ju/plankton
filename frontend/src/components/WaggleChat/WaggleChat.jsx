import React, { useState } from "react";
import "./WaggleChat.css";

export default function WaggleChat() {
  const [messages, setMessages] = useState([]); // 기존 메시지 데이터 제거
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: newMessage,
          time: "오후 9:00",
          type: "sent",
        },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="wchat-container">
      <div className="wchat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`wchat-message ${message.type}`}>
            {message.image && <img src={message.image} alt="첨부 이미지" className="wchat-message-image" />}
            <p className="wchat-message-text">{message.text}</p>
            <span className="wchat-message-time">{message.time}</span>
          </div>
        ))}
      </div>
      <div className="wchat-input-container">
        <input
          type="text"
          placeholder="채팅을 입력해 보세요"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
        />
        <button onClick={handleSend} className="wchat-send-button">🚀</button>
      </div>
    </div>
  );
}
