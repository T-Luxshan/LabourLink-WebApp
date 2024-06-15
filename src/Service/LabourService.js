import axiosAuthInstance from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/labour";

export const getLabourById = (email) => {
  return axiosAuthInstance.get(REST_API_BASE_URL + "/getLabourById/" + email);
};

export const updatePassword = (email, newPassword) => {
  return axiosAuthInstance.put(`${REST_API_BASE_URL}/changePassword/${email}`, {
    newPassword
  })
}

export const deleteLabour = (email) => {
  return axiosAuthInstance.delete(`${REST_API_BASE_URL}/${email}`)
};

export const updateLabour = (email, name, mobileNumber, nic) => {
  return axiosAuthInstance.put(`${REST_API_BASE_URL}/${email}`, {
    name, mobileNumber, nic
  })
}
