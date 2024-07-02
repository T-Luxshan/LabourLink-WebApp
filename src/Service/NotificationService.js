import axiosAuthInstance from "./AuthService";
import { URL } from "./BaseUrl";
export const findNotifications = (email) => {
  return axiosAuthInstance.get(`${URL}/api/notifications/user/${email}`);
};


export const saveNotifications = (notification) => {
    return axiosAuthInstance.post(`${URL}/api/notifications/send`, notification);
};

export const updateNotificationReadStatus = (id, read) => {
  return axiosAuthInstance.patch(`${URL}/api/notifications/${id}/read`, read);
};

export const deleteNotification = (id) => {
  return axiosAuthInstance.delete(`${URL}/api/notifications/${id}`);
};