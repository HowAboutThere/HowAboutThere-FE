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

type postAIScheduleLocationAPIRequest = {
  region: string;
  thema: string;
};
type postAIScheduleLocationAPIResponse = {
  placeId: string;
  spotname: string;
  address: string;
}[];
export const postAIScheduleLocation = async (
  data: postAIScheduleLocationAPIRequest
): Promise<postAIScheduleLocationAPIResponse> => await axiosInstance.post("/trip/spot", data);

export const postAISchedulePlan = async () => await axiosInstance.post("/trip/itinerary", {});
