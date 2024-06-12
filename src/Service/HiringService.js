import axiosAuthInstance from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/bookings";

export const bookLabour = (booking) => {
  return axiosAuthInstance.post(REST_API_BASE_URL, booking);
};

export const getBookingHistoryByCustomerId = (email) => {
  return axiosAuthInstance.get(REST_API_BASE_URL + "/customer/" + email);
}

export const getAppointmentsByLabourAndStage = (email, stage) => {
  return axiosAuthInstance.get(`${REST_API_BASE_URL}/labour/${email}/${stage}`);
}