import axiosAuthInstance from "./AuthServeice";

const REST_API_BASE_URL = "http://localhost:8080/api/bookings";

export const bookLabour = (booking) => {
  return axiosAuthInstance.post(REST_API_BASE_URL, booking);
};

export const getBookingHistoryByCustomerId = (email) => {
  return axiosAuthInstance.get(REST_API_BASE_URL + "/customer/" + email);
}