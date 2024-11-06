import "@/App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Start />} />
        <Route path="*" element={<Error />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
