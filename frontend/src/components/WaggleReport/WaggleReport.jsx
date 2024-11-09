import React from "react";
import "./WaggleReport.css";

export default function WaggleReport() {

    return(

    <div className="wreport-container">
        <div className="wreport-category">
            <p>사건 유형</p>
            <div className="wreport-category-list">
                <p>인원혼잡</p>
                <p>통행불편</p>
                <p>시설문제</p>
                <p>안전사고</p>
                <p>기타</p>
            </div>
        </div>

        <div className="wreport-content">
            <h1>신고내용</h1>
            <input type="text" />
        </div>

        <div className="wreport-img">
            <h1>사진 첨부하기</h1>
            <input type="file" />
        </div>

        <button>접수하기</button>
    </div>)
}