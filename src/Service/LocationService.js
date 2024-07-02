import axiosAuthInstance from "./AuthService";
import axios from "axios";
import { URL } from "./BaseUrl";

const REST_API_BASE_URL = `${URL}/api/labour-locations`;

export const getAllLabourLocations = ()=>{
    return axiosAuthInstance.get(REST_API_BASE_URL);
}

export const getLocationsByJobRole = (jobRole) =>{
    return axiosAuthInstance.get(REST_API_BASE_URL+ "/labours/"+ jobRole + "/locations")
}

export const addLabourLocation = (latitude, longitude, labourId) => {
    return axiosAuthInstance.post(`${REST_API_BASE_URL}`,{
        latitude, longitude, labourId
    })
}