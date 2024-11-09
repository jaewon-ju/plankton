import React, { useEffect, useState } from "react";
import "@/styles/Main.css";
import MainMap from "@/components/MainMap/MainMap";
import useGeolocation from "@/hooks/useGeolocation";

export default function Main() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  return (
    <div className="main-container">
      <div className="main-map-box">
        {locationLoading ? (
          <p>Loading location...</p>
        ) : (
          <MainMap currentLocation={currentMyLocation} />
        )}
      </div>
    </div>
  );
}
