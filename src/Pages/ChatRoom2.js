import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

var stompClient = null;

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");

  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = (event) => {
    let Sock = new SockJS("http://localhost:8081/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
    // Call the login endpoint to retrieve stored messages
    stompClient.send("/app/login", {}, userData.username);
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        setPublicChats((prevChats) => [...prevChats, payloadData]);
        break;
      default:
        console.log("Unknown message status:", payloadData.status);
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send(
        "/app/private-message",
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <Container maxWidth="lg">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <List>
              <ListItem
                button
                onClick={() => {
                  setTab("CHATROOM");
                }}
                selected={tab === "CHATROOM"}
              >
                <ListItemText primary="Chatroom" />
              </ListItem>
              {[...privateChats.keys()].map((name, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    setTab(name);
                  }}
                  selected={tab === name}
                >
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <List className="chat-messages">
                {publicChats.map((chat, index) => (
                  <ListItem
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <ListItemText primary={chat.message} />
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </ListItem>
                ))}
              </List>

              <div className="send-message">
                <TextField
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="send-button"
                  onClick={sendValue}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <List className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <ListItem
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <ListItemText primary={chat.message} />
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </ListItem>
                ))}
              </List>

              <div className="send-message">
                <TextField
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <TextField
            id="user-name"
            label="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
          />
          <Button variant="contained" color="primary" onClick={registerUser}>
            Connect
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ChatRoom;
