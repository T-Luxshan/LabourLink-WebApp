import axios from "axios";

export const findNotifications = (email) => {
  return axios.get(`http://localhost:8080/api/notifications/user/${email}`);
};


export const saveNotifications = (notification) => {
    return axios.post(`http://localhost:8080/api/notifications/send`, notification);
};

export const updateNotificationReadStatus = (id) => {
  return axios.patch(`http://localhost:8080/api/notifications/${id}/read`);
};
