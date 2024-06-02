import axios from "axios";

export const findNotifications = (email) => {
  return axios.get(`http://localhost:8080/api/notifications/user/${email}`);
};


export const saveNotifications = (notification) => {
    return axios.post(`http://localhost:8080/api/notifications/send`, notification);
};

export const updateNotificationReadStatus = (id, read) => {
  return axios.patch(`http://localhost:8080/api/notifications/${id}/read`, read);
};

export const deleteNotification = (id) => {
  return axios.delete(`http://localhost:8080/api/notifications/${id}`);
};