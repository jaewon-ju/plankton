import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/Start.css";

export default function Start() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/list");
        }, 2500000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="start">
            <div className="start-container">
                <div className="start-logo">
                    <img src={process.env.PUBLIC_URL + '/logo2.png'} alt="logo"/>
                </div>
                <h1>와글<br/>와글</h1>
            </div>
        </div>
    )
}