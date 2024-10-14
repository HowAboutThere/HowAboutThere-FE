import { AIScheduleFormType } from "@/components/Domain/AISchedule/AIScheduleForm/AIScheduleFormCard";
import { PlanType } from "@/components/Domain/AISchedule/AISchedulePlan/AISchedulePlanCard";
import { LocationType } from "@/types/location-type";
import { ThemeType } from "@/types/theme-type";
import { create } from "zustand";

type State = {
  form: AIScheduleFormType;
  themes: ThemeType[];
  locations: LocationType[];
  plan: PlanType | undefined;
};
type Action = {
  updateForm: (form: State["form"]) => void;
  updateThemes: (themes: State["themes"]) => void;
  updateLocations: (Locations: State["locations"]) => void;
  updatePlan: (plans: State["plan"]) => void;
};

export const useAIScheduleStore = create<State & Action>((set) => ({
  form: {
    budget: 0,
    schedule: { from: undefined, to: undefined },
    region: "domestic",
  },
  themes: [],
  locations: [],
  plan: undefined,
  updateForm: (form) => set(() => ({ form })),
  updateThemes: (themes) => set(() => ({ themes })),
  updateLocations: (Locations) => set(() => ({ locations: Locations })),
  updatePlan: (plans) => set(() => ({ plan: plans })),
}));
