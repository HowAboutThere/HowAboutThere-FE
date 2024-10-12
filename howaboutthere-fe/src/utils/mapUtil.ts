import { LatLng } from "@/types/location-type";

export const getBoundFromPoints = (points: LatLng[]) => {
  const bounds = new google.maps.LatLngBounds();
  points.forEach((point) => bounds.extend(point));
  return bounds;
};
