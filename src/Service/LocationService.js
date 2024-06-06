import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/labour-locations";

export const getAllLabourLocations = ()=>{
    return axios.get(REST_API_BASE_URL);
}

export const getLocationsByJobRole = (jobRole) =>{
    return axios.get(REST_API_BASE_URL+ "/labours/"+ jobRole + "/locations")
}