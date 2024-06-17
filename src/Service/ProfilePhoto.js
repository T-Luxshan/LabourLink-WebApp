import axiosAuthInstance from "./AuthServeice";

const BASE_URL="http://localhost:8080/api/profilePhoto/"

export const displayProfilePhoto = (email) => {
  return axiosAuthInstance.get(BASE_URL+ "display/" + email);
};