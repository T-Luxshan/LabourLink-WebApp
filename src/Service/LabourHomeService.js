import axiosAuthInstance from "./AuthService";
import axios from "axios";
import { URL } from "./BaseUrl";

const REST_API_BASE_URL_LABOUR_PROFILE =  `${URL}/api/labour-profiles`;
const REST_API_BASE_URL_LABOUR_REVIEW = `${URL}/api/v1/labourReview`;

export const getLabourProfileById = (email) => {
    return axiosAuthInstance.get(`${REST_API_BASE_URL_LABOUR_PROFILE}/getLabourProfileById/${email}`)
}

// get my reviews
export const getMyReviews = () => {
    return axiosAuthInstance.get(`${REST_API_BASE_URL_LABOUR_REVIEW}/getMyReviews`)
}

// Get avg rating
export const getAvgRating= () => {
    return axiosAuthInstance.get(`${REST_API_BASE_URL_LABOUR_REVIEW}/rating`)
}

// Update profile
export const updateProfile = (email, aboutMe, gender, languages) => {
    return axiosAuthInstance.put(`${REST_API_BASE_URL_LABOUR_PROFILE}/update/${email}`,{
        email, aboutMe, gender, languages
    })
}

export const createProfile = (aboutMe, gender, languages, labourEmail) => {
    return axiosAuthInstance.post(`${REST_API_BASE_URL_LABOUR_PROFILE}/create`, {
        aboutMe, gender, languages, labourEmail
    })
}

