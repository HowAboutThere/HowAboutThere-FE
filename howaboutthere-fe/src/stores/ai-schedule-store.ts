import { AIScheduleFormType } from "@/components/Domain/AISchedule/AIScheduleForm/AIScheduleFormCard";
import { ThemeType } from "@/types/theme-type";
import { create } from "zustand";

type State = {
  form: AIScheduleFormType;
  themes: ThemeType[];
};
type Action = {
  updateForm: (form: State["form"]) => void;
  updateThemes: (themes: State["themes"]) => void;
};

export const useAIScheduleStore = create<State & Action>((set) => ({
  form: {
    budget: 0,
    schedule: { from: undefined, to: undefined },
    region: "domestic",
  },
  themes: [],
  updateForm: (form) => set(() => ({ form })),
  updateThemes: (themes) => set(() => ({ themes })),
}));
