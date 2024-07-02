import axiosAuthInstance from "./AuthService";

import axios from "axios";
import { URL } from "./BaseUrl";

const REST_API_BASE_URL = `${URL}/api/customer`;

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
  return axiosAuthInstance.delete(`${URL}/api/customer/deleteCustomer/${email}`);
};