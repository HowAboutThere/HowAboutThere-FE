import { Map as GoogleMap, MapProps as GoogleMapProps } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";

type MapProps = GoogleMapProps &
  Required<Pick<GoogleMapProps, "id">> & {
    children?: ReactNode;
  };

export default function Map({ children, ...props }: MapProps) {
  return (
    <GoogleMap
      className="w-full aspect-video"
      defaultCenter={{ lat: 37.5665, lng: 126.978 }}
      defaultZoom={11}
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      gestureHandling="none"
      disableDefaultUI
      disableDoubleClickZoom
      {...props}
    >
      {children}
    </GoogleMap>
  );
}
