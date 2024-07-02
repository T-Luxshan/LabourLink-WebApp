import axiosAuthInstance from './AuthService';
import { URL } from './BaseUrl';

const REST_API_BASE_URL_PROFILE = `${URL}/api/v1/profile`;

export const addProfilePicture = (profileUri) => {
    return axiosAuthInstance.post(`${REST_API_BASE_URL_PROFILE}`, {
        profileUri
    })
}

export const deleteProfilePicture = () => {
    return axiosAuthInstance.delete(`${REST_API_BASE_URL_PROFILE}`)
}

export const getProfilePicture = () => {
    return axiosAuthInstance.get(`${REST_API_BASE_URL_PROFILE}`)
}