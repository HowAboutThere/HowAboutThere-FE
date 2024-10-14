import AIScheduleFormCard from "@/components/Domain/AISchedule/AIScheduleForm/AIScheduleFormCard";
import AIScheduleLocationCard from "@/components/Domain/AISchedule/AIScheduleLocation/AIScheduleLocationCard";
import AISchedulePlanCard from "@/components/Domain/AISchedule/AISchedulePlan/AISchedulePlanCard";
import AIScheduleThemeCard from "@/components/Domain/AISchedule/AIScheduleTheme/AIScheduleThemeCard";
import { Punnel } from "@/hooks/usePunnel";

export const PUNNELS: Record<string, Punnel[]> = {
  "ai-travel": [
    {
      punnelId: "form",
      punnelComponent: <AIScheduleFormCard />,
    },
    {
      punnelId: "theme",
      punnelComponent: <AIScheduleThemeCard />,
    },
    {
      punnelId: "location",
      punnelComponent: <AIScheduleLocationCard />,
    },
    {
      punnelId: "plan",
      punnelComponent: <AISchedulePlanCard />,
    },
  ],
};
