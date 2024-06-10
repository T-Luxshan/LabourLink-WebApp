import axiosAuthInstance from "./AuthServeice";

const REST_API_BASE_URL_REPORT = "http://localhost:8080/api/v1/report";

// API for add report.
export const reportUser = (title, description, reportedTo) => {
    return axiosAuthInstance.post(`${REST_API_BASE_URL_REPORT}/user`,{
        title, description, reportedTo
    });
};

//API for edit report.
export const editUserReport = (id, title, description, reportedTo) => {
    return axiosAuthInstance.put(`${REST_API_BASE_URL_REPORT}/edit/${id}`,{
        title, description, reportedTo
    });
};