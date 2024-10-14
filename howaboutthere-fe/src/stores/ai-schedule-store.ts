import { AIScheduleFormType } from "@/components/Domain/AISchedule/AIScheduleForm/AIScheduleFormCard";
import { LocationType } from "@/types/location-type";
import { ThemeType } from "@/types/theme-type";
import { create } from "zustand";

type State = {
  form: AIScheduleFormType;
  themes: ThemeType[];
  locations: LocationType[];
};
type Action = {
  updateForm: (form: State["form"]) => void;
  updateThemes: (themes: State["themes"]) => void;
  updateLocations: (Locations: State["locations"]) => void;
};

export const useAIScheduleStore = create<State & Action>((set) => ({
  form: {
    budget: 0,
    schedule: { from: undefined, to: undefined },
    region: "domestic",
  },
  themes: [],
  locations: [],
  updateForm: (form) => set(() => ({ form })),
  updateThemes: (themes) => set(() => ({ themes })),
  updateLocations: (Locations) => set(() => ({ locations: Locations })),
}));
