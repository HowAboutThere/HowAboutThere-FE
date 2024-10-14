import { LatLng } from "./location-type";

export type PlanType = "activity" | "transport";
export type TransportType = "taxi" | "bus" | "subway" | "walk";

export type Plan = {
  id: number;
  type: PlanType;
};

export type ActivityPlan = Plan & {
  time: string;
  location: string;
  latlng: LatLng;
  activity: string;
};

export type TransportPlan = Plan & {
  type: PlanType;
  method: TransportType;
  duration: number;
};
