{/*import React from "react";
import "./WaggleChat.css";

export default function WaggleChat() {
    return (
        <div className="wchat-container">
            
        </div>
    )
} */}
import React, { useState } from "react";
import "./WaggleChat.css";

export default function WaggleChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "여기가 진짜 불꽃놀이 사진찍기 좋은거 같아요! 완전 낭만있게 나오네요. 스팟 추천해요!😊", time: "오후 8:31", type: "received", image: "https://example.com/firework.jpg" },
    { id: 2, text: "우와 진짜 사진 맛집이네요! 이쪽으로 오길 잘 한것 같네요 ㅋㅋ", time: "오후 8:57", type: "sent" },
    { id: 3, text: "저도 사진찍으려고 이쪽으로 왔어요...! 불꽃쇼 진짜 잘 보이는 것 같네요.", time: "오후 8:59", type: "received" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, time: "오후 9:00", type: "sent" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="wchat-container">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type}`}
          >
            {message.image && <img src={message.image} alt="첨부 이미지" className="message-image" />}
            <p className="message-text">{message.text}</p>
            <span className="message-time">{message.time}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="채팅을 입력해 보세요"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend} className="send-button">🚀</button>
      </div>
    </div>
  );
}
