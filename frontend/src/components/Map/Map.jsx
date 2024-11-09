import { Container as MapDiv, NaverMap, useNavermaps } from "react-naver-maps";
import React, { useEffect, useState, useCallback } from "react";
import "./Map.css";

export default function Map() {
  const navermaps = useNavermaps();

  const handleZoomChanged = useCallback((zoom) => {
    console.log(`zoom: ${zoom}`);
  }, []);

  return (
    <MapDiv className="main-map">
      <NaverMap
        zoomControl
        zoomControlOptions={{
          position: navermaps.Position.TOP_RIGHT,
        }}
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={13}
        onZoomChanged={handleZoomChanged}
      />
    </MapDiv>
  );
}
