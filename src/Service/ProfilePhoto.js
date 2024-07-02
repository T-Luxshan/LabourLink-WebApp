import axiosAuthInstance from "./AuthService";
import { URL } from "./BaseUrl";
const BASE_URL=`${URL}/api/profilePhoto/`

export const displayProfilePhoto = (email) => {
  return axiosAuthInstance.get(BASE_URL+ "display/" + email);
};