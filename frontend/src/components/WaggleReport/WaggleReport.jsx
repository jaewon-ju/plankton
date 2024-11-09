import React, { useState } from "react";
import "./WaggleReport.css";

export default function WaggleReport() {
    const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태

    const categories = ["인원혼잡", "통행불편", "시설문제", "안전사고", "기타"];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="wreport-container">
            <div className="wreport-category">
                <p>사건 유형</p>
                <div className="wreport-category-list">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={selectedCategory === category ? "selected" : ""}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
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

            <button className="wreport-submit">접수하기</button>
        </div>
    );
}
