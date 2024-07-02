import axiosAuthInstance from "./AuthService";
import { URL } from "./BaseUrl";
const REST_API_BASE_URL = `${URL}`;

export const findChatMessages = (senderEmail, recipientEmail) => {
  return axiosAuthInstance.get(
    REST_API_BASE_URL + `/messages/${senderEmail}/${recipientEmail}`
  );
};

export const markAsRead = (senderEmail, recipientEmail) => {
  return axiosAuthInstance.post(
    `${REST_API_BASE_URL}/markAsRead/${senderEmail}/${recipientEmail}`
  );
};

export const unreadMessageCount = (senderEmail, recipientEmail) => {
  return axiosAuthInstance.get(
    REST_API_BASE_URL + `/unreadMessageCount/${senderEmail}/${recipientEmail}`
  );
};

export const totalUnreadMessageCount = (recipientEmail) => {
  return axiosAuthInstance.get(
    REST_API_BASE_URL + `/totalUnreadMessageCount/${recipientEmail}`
  );
};
