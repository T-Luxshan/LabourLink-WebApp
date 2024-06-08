import axiosAuthInstance from "./AuthServeice";

const REST_API_BASE_URL = "http://localhost:8080/api/labour-locations";

export const getAllLabourLocations = ()=>{
    return axiosAuthInstance.get(REST_API_BASE_URL);
}

export const getLocationsByJobRole = (jobRole) =>{
    return axiosAuthInstance.get(REST_API_BASE_URL+ "/labours/"+ jobRole + "/locations")
}