import axiosAuthInstance from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/user";

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
export const findChatMessages = (senderEmail, recipientEmail) => {
  return axiosAuthInstance.get(
    `http://localhost:8080/messages/${senderEmail}/${recipientEmail}`
  );
};

export const getUserByToken = () => {
  return axiosAuthInstance.get("http://localhost:8080/api/user/user");
};
