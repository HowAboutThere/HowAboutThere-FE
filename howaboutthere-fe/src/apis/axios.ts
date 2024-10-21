import axios from "axios";

const BASE_URL = "http://k8s-eksdemogroup-ac5f71b163-971273520.ap-northeast-2.elb.amazonaws.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
