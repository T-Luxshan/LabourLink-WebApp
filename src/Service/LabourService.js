import axiosAuthInstance from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/labour";

export const getLabourById = (email) => {
  return axiosAuthInstance.get(REST_API_BASE_URL + "/getLabourById/" + email);
};
