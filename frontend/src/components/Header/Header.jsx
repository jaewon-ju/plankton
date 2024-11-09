import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; // 페이지 간 이동을 위한 Link 컴포넌트

export default function Header() {
  return (
    <header className="header">
      <div className="list-logo">
        <Link to="/main">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
        
        </Link>
      </div>
      <nav className="nav">
        
        
      </nav>
    </header>
  );
}
