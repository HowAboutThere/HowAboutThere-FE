export type PlanType = "activity" | "transport";
export type TransportType = "taxi" | "bus" | "subway" | "walk";

export type Plan = {
  type: PlanType;
  duration: number;
};

export type ActivityPlan = Plan & {
  time: string;
  location: string;
  activity: string;
};

export type TransportPlan = Plan & {
  type: PlanType;
  method: TransportType;
  duration: number;
};
