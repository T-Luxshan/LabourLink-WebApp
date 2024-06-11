import axiosAuthInstance from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/customer";

export const getCustomersByEmail = (email) => {
  return axiosAuthInstance.get(REST_API_BASE_URL + "/" + email);
};

export const updateCustomerPassword = (email, newPassword) => {
  return axiosAuthInstance.put(`${REST_API_BASE_URL}/changePassword/${email}`, {
    newPassword,
  });
};

export const updateCustomer = (email, customer) => {
  return axiosAuthInstance.put(REST_API_BASE_URL + "/" + email, customer);
};

export const deleteCustomer = (email) => {
  return axiosAuthInstance.delete(REST_API_BASE_URL + "/" + email);
};
