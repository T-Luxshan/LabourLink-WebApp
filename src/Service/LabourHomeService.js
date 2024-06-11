import { Email } from "@mui/icons-material";
import axiosAuthInstance from "./AuthService";

const REST_API_BASE_URL_LABOUR_PROFILE = "http://localhost:8080/api/labour-profiles";

export const getLabourProfileById = (email) => {
    return axiosAuthInstance.get(`${REST_API_BASE_URL_LABOUR_PROFILE}/getLabourProfileById/${email}`)
}


