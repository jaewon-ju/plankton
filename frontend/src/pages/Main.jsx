import React, { useEffect, useState } from "react";
import "@/styles/Main.css";
import Map from "@/components/Map/Map";

export default function Main() {
  return (
    <div className="main-container">
      <Map />
    </div>
  );
}
