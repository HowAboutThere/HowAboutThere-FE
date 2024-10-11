import Pin from "@/assets/map/pin.png";
import { LatLng } from "@/types/location-type";

import { AdvancedMarker, Map as GoogleMap, MapProps as GoogleMapProps, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type MapProps = GoogleMapProps & Required<Pick<GoogleMapProps, "id">>;
export default function Map(props: MapProps) {
  const map = useMap(props.id);
  const [center, setCenter] = useState<LatLng>({ lat: 37.566535, lng: 126.977962 });

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener("center_changed", () => {
      const center = map.getCenter();
      if (center) {
        setCenter({ lat: center.lat(), lng: center.lng() });
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map]);

  return (
    <GoogleMap
      className="w-full aspect-video"
      defaultCenter={center}
      minZoom={10}
      defaultZoom={11}
      maxZoom={18}
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      gestureHandling="none"
      disableDefaultUI
      disableDoubleClickZoom
      {...props}
    >
      <AdvancedMarker position={center}>
        <img className="w-10 animate-bounce" src={Pin} alt="pin" />
      </AdvancedMarker>
    </GoogleMap>
  );
}
