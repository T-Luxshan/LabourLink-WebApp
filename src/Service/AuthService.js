import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const REST_API_BASE_URL_AUTH = "http://localhost:8080/api/v1/auth";
const  baseURL = 'http://localhost:8080/api';
const FORGOTPASSWORD_BASE_URL = "http://localhost:8080/forgotPassword";

// API for register customer
export const registerCustomer = (name, email, password, mobileNumber, address) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/register/customer`, {
        name, email, password, mobileNumber, address
    });
  };


  // // API for login customer
  export const loginCustomer = (role, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/customer`, {
        role, email, password
    });
  };

  // API for login customer
  export const login = (role, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/${role.toLowerCase()}`, {
        role, email, password
    });
  };

  // API to check whether customer exist or not
  export const isCustomerExist = (email) => {
    return axios.get(`${FORGOTPASSWORD_BASE_URL}/customerExist/${email}`)
  }

    // API to send email with an OTP when forgot password.
    export const sendOTP = (email) => {
      return axios.post(`${FORGOTPASSWORD_BASE_URL}/verifyMail/CUSTOMER/${email}`)
    } 
  
    // API for verify OTP.
    export const verifyOTP = (otp, email) => {
      return axios.post(`${FORGOTPASSWORD_BASE_URL}/verifyOtp/CUSTOMER/${otp}/${email}`)
    }
  
    //API for Change password.
    export const changePassword = (email, role, password, repeatPassword) =>{
      return axios.post(`${FORGOTPASSWORD_BASE_URL}/changePassword/${role}/${email}`,{
        password, repeatPassword
      });
    };

    // API to check whether a NIC already exist in the DB or not.
    export const isNICExist = (nic) => {
      return axios.get(`${REST_API_BASE_URL_AUTH}/nicExist/${nic}`)
    }
  

  // THIS PART RELATED TO LABOUR AUTHENTICATION.

  // API for register labour
  export const registerLabour = (name, email, password, mobileNumber, nic, documentUri, jobRole) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/register/labour`, {
        name, email, password, mobileNumber, nic, documentUri, jobRole
    });
  };

  // API for get user role 
 export const getUserRole = (email) => {
   return axios.get(`${REST_API_BASE_URL_AUTH}/getUserRole/${email}`)
 }

  //  API for login labour
   export const loginLabour = (role, email, password) => {
    return axios.post(`${REST_API_BASE_URL_AUTH}/login/labour`, {
        role, email, password
    });
  };


const axiosAuthInstance = axios.create({
  baseURL,
  
})

axiosAuthInstance.interceptors.request.use(
  async (config) => {
    // Get the token from localStorage (or wherever you store it)
     const token = localStorage.getItem('token');
    // Set the authorization header if a token exists
    if (token) {
      const user = jwtDecode(token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      console.log(isExpired);
      if(!isExpired){
        config.headers.Authorization = `Bearer ${token}`;
        // return config;
      }else {
        
        // console.log("Access token expired");
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${REST_API_BASE_URL_AUTH}/refresh`, {refreshToken})
        console.log(response);

        console.log("Token updated.")
        // console.log(response.data.accessToken);
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        const token = localStorage.getItem('token');

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    }
    else{
      LogoutUser(); // need to login again.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;

//logout the user from the application.
export const LogoutUser = () => {
  
  const navigate = useNavigate();

  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userEmail');

  navigate('/login');

}