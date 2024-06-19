import axiosAuthInstance from "./AuthService";
import axios from "axios";

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

export const UpdateBookingStage = (id, bookingStage) => {
  return axiosAuthInstance.patch(`${REST_API_BASE_URL}/updateStage/${id}`,{
    bookingStage
  })
}

export const getFullBookingDetails = (id) =>{
  return axiosAuthInstance.get(REST_API_BASE_URL+"/"+id)
}

export const getBookingDetailsForLabour = (email) => {
  return axios.get(`${REST_API_BASE_URL}/labour/${email}`)
}