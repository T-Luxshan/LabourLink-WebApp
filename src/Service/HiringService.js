import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/bookings";

export const bookLabour = (booking) => {
  return axios.post(REST_API_BASE_URL, booking);
};