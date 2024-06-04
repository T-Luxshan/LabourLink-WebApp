import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/labour";

export const getLabourById = (email) => {
  return axios.get(REST_API_BASE_URL + "/getLabourById/" + email);
};
