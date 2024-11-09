/// Slide.jsx
import "@/styles/Slide.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import WaggleReport from "@/components/WaggleReport/WaggleReport";
import WaggleChat from "@/components/WaggleChat/WaggleChat";

export default function Slide({ isOpen, togglePanel }) {
  const [activeTab, setActiveTab] = useState("chat"); // 기본값을 "채팅참여"로 설정
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (touchStart - e.touches[0].clientY > 50) {
      togglePanel(true);
    } else if (e.touches[0].clientY - touchStart > 50) {
      togglePanel(false);
    }
  };

  const handleKeyDown = (e, tab) => {
    if (e.key === "Enter" || e.key === " ") {
      setActiveTab(tab);
    }
  };

  return (
    <div
      className={`sliding-panel-container ${isOpen ? "open" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        className="drag-handle"
        onClick={() => togglePanel(!isOpen)}
        onKeyDown={(e) => handleKeyDown(e, !isOpen)}
        tabIndex="0"
        role="button"
        aria-expanded={isOpen}
      />
      <div className="sliding-panel">
        <div className="tab-container">
          <div
            className={`tab ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
            onKeyDown={(e) => handleKeyDown(e, "chat")}
            tabIndex="0"
            role="button"
            aria-pressed={activeTab === "chat"}
          >
            <span role="img" aria-label="chat">
              💬
            </span>
            채팅참여
          </div>
          <div
            className={`tab ${activeTab === "report" ? "active" : ""}`}
            onClick={() => setActiveTab("report")}
            onKeyDown={(e) => handleKeyDown(e, "report")}
            tabIndex="0"
            role="button"
            aria-pressed={activeTab === "report"}
          >
            <span role="img" aria-label="report">
              🚨
            </span>
            사건신고
          </div>
        </div>
        <div className="divider"></div>
        {/* activeTab 값에 따라 컴포넌트 전환 */}
        {activeTab === "report" ? <WaggleReport /> : <WaggleChat />}
      </div>
    </div>
  );
}

// propTypes
Slide.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
};
