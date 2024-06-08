import axiosAuthInstance from "./AuthServeice";

export const findNotifications = (email) => {
  return axiosAuthInstance.get(`http://localhost:8080/api/notifications/user/${email}`);
};


export const saveNotifications = (notification) => {
    return axiosAuthInstance.post(`http://localhost:8080/api/notifications/send`, notification);
};

export const updateNotificationReadStatus = (id, read) => {
  return axiosAuthInstance.patch(`http://localhost:8080/api/notifications/${id}/read`, read);
};

export const deleteNotification = (id) => {
  return axiosAuthInstance.delete(`http://localhost:8080/api/notifications/${id}`);
};