import {
  Container as MapDiv,
  NaverMap,
  Polygon,
  useNavermaps,
} from "react-naver-maps";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CurrentMap.css";

export default function CurrentMap({ currentLocation }) {
  const navermaps = useNavermaps();
  const [polygons, setPolygons] = useState([]);

  // 각 공원의 폴리곤 좌표 설정
  useEffect(() => {
    const parkPolygons = [
      [
        new navermaps.LatLng(37.5197849, 126.917224),
        new navermaps.LatLng(37.515335, 126.92649),
        new navermaps.LatLng(37.5169011, 126.92810239),
        new navermaps.LatLng(37.521247, 126.917224),
      ],
      [
        new navermaps.LatLng(37.5225771, 126.9381753),
        new navermaps.LatLng(37.5178799, 126.9420377),
        new navermaps.LatLng(37.5182203, 126.9453851),
        new navermaps.LatLng(37.5231898, 126.9406644),
      ],
      [
        new navermaps.LatLng(37.524645, 126.91852),
        new navermaps.LatLng(37.525, 126.92),
        new navermaps.LatLng(37.52139, 126.919706),
        new navermaps.LatLng(37.524, 126.925),
        new navermaps.LatLng(37.53, 126.926),
      ],
      [
        new navermaps.LatLng(37.5306094, 126.9257299),
        new navermaps.LatLng(37.5253, 126.934313),
        new navermaps.LatLng(37.5265253, 126.9365446),
        new navermaps.LatLng(37.5318345, 126.9284765),
      ],
      [
        new navermaps.LatLng(37.5314261, 126.9217817),
        new navermaps.LatLng(37.5342848, 126.9229833),
        new navermaps.LatLng(37.5354419, 126.9123403),
        new navermaps.LatLng(37.5337403, 126.9127695),
      ],
    ];

    setPolygons(parkPolygons);
  }, [navermaps]);

  // 색상 설정 배열
  const fillColors = ["#ff000050", "#ffa50050", "#98fb9850"]; // 빨강, 주황, 연두
  const strokeColors = ["#ff0000", "#ffa500", "#98fb98"];

  return (
    <MapDiv className="main-map">
      {/* 범례 추가 */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#ff0000" }}></span>
          위험
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#ffa500" }}></span>
          주의
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#98fb98" }}></span>
          안전
        </div>
      </div>

      <NaverMap
        zoomControl
        zoomControlOptions={{
          position: navermaps?.Position?.TOP_RIGHT,
        }}
        defaultCenter={new navermaps.LatLng(37.52389, 126.92667)}
        minZoom={14}
        maxBounds={
          new navermaps.LatLngBounds(
            new navermaps.LatLng(37.515, 126.9241),
            new navermaps.LatLng(37.533, 126.9369)
          )
        }
      >
        {polygons.map((path, index) => (
          <Polygon
            key={`polygon-${index}`}
            paths={[path]}
            fillColor={fillColors[index % 3]}
            strokeColor={strokeColors[index % 3]}
            strokeWeight={2}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
}

CurrentMap.propTypes = {
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};
