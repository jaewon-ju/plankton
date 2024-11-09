import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/main" className="header-logo">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
        </Link>
        
      </div>
    </header>
  );
}