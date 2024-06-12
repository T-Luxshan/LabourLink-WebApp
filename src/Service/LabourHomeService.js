import axiosAuthInstance from "./AuthService";
import axios from "axios";

const REST_API_BASE_URL_LABOUR_PROFILE = "http://localhost:8080/api/labour-profiles";
const REST_API_BASE_URL_LABOUR_REVIEW = "http://localhost:8080/api/v1/labourReview";

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

