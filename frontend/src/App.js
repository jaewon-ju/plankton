import React, { useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "@/App.css";
import Start from "@/pages/Start";
import Main from "@/pages/Main";
import List from "@/pages/List";
import Current from "@/pages/Current";
import Chat from "@/pages/Chat";
import Notice from "@/pages/Notice";
import FloatingButton from "@/components/FloatingButton/FloatingButton";
import Header from "@/components/Header/Header";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function AppContent() {
  const location = useLocation();

  const showHeader = ["/main", "/notice", "/current", "/chat"].includes(
    location.pathname
  );

  return (
    <div className="app-container">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/list" element={<List />} />
        <Route path="/main" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/current" element={<Current />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {!(
        location.pathname === "/" ||
        location.pathname === "/list" ||
        location.pathname === "/current" ||
        location.pathname === "/chat"
      ) && <FloatingButton />}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // 소켓 연결과 구독 설정
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      console.log("Connected to WebSocket:", frame);

      // /topic/posts 구독 설정
      stompClient.subscribe("/topic/posts", function (message) {
        const post = JSON.parse(message.body);
        console.log("New Post Created:", post);
        // 필요한 동작 수행
      });
    });

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
