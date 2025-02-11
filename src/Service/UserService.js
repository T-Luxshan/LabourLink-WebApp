import axiosAuthInstance from "./AuthService";
import { URL } from "./BaseUrl";
const REST_API_BASE_URL = `${URL}/api/user`;

export const getUserByEmail = (email) => {
  return axiosAuthInstance.get(REST_API_BASE_URL + "/" + email);
};

// export const findConnectedUsers = () => {
//   return axiosAuthInstance.get(REST_API_BASE_URL + "/connectedLabours");
// };

// export const findConnectedCustomers = () => {
//   return axiosAuthInstance.get(REST_API_BASE_URL + "/connectedCustomers");
// };

export const findConnectedUsers = (email) => {
  return axiosAuthInstance.get(REST_API_BASE_URL + "/connectedUsers/"+ email);
};

export const updateUserStatus = (email, newUser) => {
  return axiosAuthInstance.put(`${REST_API_BASE_URL}/${email}`, newUser);
};



export const getUserByToken = () => {
  return axiosAuthInstance.get(`${URL}/api/user/user`);
};
