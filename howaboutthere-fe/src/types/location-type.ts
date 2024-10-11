export type LocationType = {
  location: string;
  address: string;
  description: string;
  imgSrc?: string;
  latlng: LatLng;
};

export type LatLng = {
  lat: number;
  lng: number;
};
