import { axiosInstance } from "../axios";

type postAIScheduleThemeAPIRequest = {
  startDate: string;
  endDate: string;
  budget: number;
  isDomestic: boolean;
};
type postAIScheduleThemeAPIResponse = {
  region: string;
  theme: string;
}[];

export const postAIScheduleTheme = async (
  data: postAIScheduleThemeAPIRequest
): Promise<postAIScheduleThemeAPIResponse> => await axiosInstance.post("/trip/theme", data);
