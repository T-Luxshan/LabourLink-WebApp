import axiosAuthInstance from "./AuthService";
import axios from "axios";
import { URL } from "./BaseUrl";

const REST_API_BASE_URL_REVIEW = `${URL}/api/v1/labourReview`;

// API for add review
export const addReview = (jobRole, description, rating, labourEmail) => {
    return axiosAuthInstance.post(`${REST_API_BASE_URL_REVIEW}/addReview`,{
        jobRole, description, rating, labourEmail
    });
};

//API for edit review
export const editReview = (id, jobRole, description, rating, labourEmail) => {
    return axiosAuthInstance.put(`${REST_API_BASE_URL_REVIEW}/editReview/${id}`,{
        jobRole, description, rating, labourEmail
    });
};

export const getReviewOFTheLabour = (email) => {
    return axiosAuthInstance.get(`${REST_API_BASE_URL_REVIEW}/getLabourReviews/${email}`)
}