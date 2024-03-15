import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/customer";


export const getCustomers = (email) => {
  return axios.get(REST_API_BASE_URL + "/" + email);
};

export const updateCustomer = (email, customer) => {
  return axios.put(REST_API_BASE_URL + "/" + email, customer);
};

export const deleteCustomer = (email) => {
  return axios.delete(REST_API_BASE_URL + "/" + email);
};
