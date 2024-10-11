import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

export default function Map() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        className="w-full aspect-video"
        defaultCenter={{ lat: 37.566535, lng: 126.977962 }}
        minZoom={10}
        defaultZoom={11}
        maxZoom={18}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        gestureHandling="cooperative"
        disableDefaultUI
        disableDoubleClickZoom
      />
    </APIProvider>
  );
}
