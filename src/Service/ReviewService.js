import axiosAuthInstance from "./AuthService";

const REST_API_BASE_URL_REVIEW = "http://localhost:8080/api/v1/labourReview";

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