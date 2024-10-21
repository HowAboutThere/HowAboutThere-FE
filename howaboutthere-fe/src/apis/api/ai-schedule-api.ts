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
): Promise<postAIScheduleThemeAPIResponse> => (await axiosInstance.post("/trip/theme", data)).data;

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
): Promise<postAIScheduleLocationAPIResponse> => (await axiosInstance.post("/trip/spot", data)).data;

type postAISchedulePlanAPIRequest = {
  startDate: string;
  endDate: string;
  touristspots: { spotname: string }[];
};

type postAISchedulePlanAPIResponse = {
  day: string;
  summary: string;
  spots: {
    summary: string;
    time: string;
    touristSpot: string;
    activity: string;
  }[];
};

export const postAISchedulePlan = async (
  data: postAISchedulePlanAPIRequest
): Promise<postAISchedulePlanAPIResponse[]> => (await axiosInstance.post("/trip/itinerary", data)).data;
