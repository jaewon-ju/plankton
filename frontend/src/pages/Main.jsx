import { useEffect } from "react";
import "@/styles/Main.css";
import MainMap from "@/components/MainMap/MainMap";
import useGeolocation from "@/hooks/useGeolocation";
import { getCongestionData } from "@/services/congestionService";

export default function Main() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  const hotspotName = "여의도한강공원";

  const fetchCongestionData = async () => {
    const { status, data } = await getCongestionData(hotspotName);

    if (status === 200 && data) {
      console.log(data);
    } else {
      console.log(status);
    }
  };

  useEffect(() => {
    fetchCongestionData();
  });

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
