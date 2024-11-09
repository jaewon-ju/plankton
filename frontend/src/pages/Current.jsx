import "@/styles/Current.css";
import CurrentMap from "@/components/CurrentMap/CurrentMap";
import useGeolocation from "@/hooks/useGeolocation";

export default function Current() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  return (
    <div className="current-container">
      <div className="current-map-box">
        {locationLoading ? (
          <p>Loading location...</p>
        ) : (
          <CurrentMap currentLocation={currentMyLocation} />
        )}
      </div>
    </div>
  );
}
