import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const ChatApplication = () => {
  const [nickname, setNickname] = useState("");
  const [fullname, setFullname] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (nickname && fullname) {
      const socket = new SockJS("/ws");
      const client = Stomp.over(socket);
      client.connect({}, onConnected, onError);
      setStompClient(client);
    }
  }, [nickname, fullname]);

  const onConnected = () => {
    stompClient.subscribe(
      `/user/${nickname}/queue/messages`,
      onMessageReceived
    );
    stompClient.subscribe(`/user/public`, onMessageReceived);
    stompClient.send(
      "/app/user.addUser",
      {},
      JSON.stringify({
        nickName: nickname,
        fullName: fullname,
        status: "ONLINE",
      })
    );
  };

  const onError = () => {
    console.log(
      "Could not connect to WebSocket server. Please refresh this page to try again!"
    );
  };

  const connect = (event) => {
    event.preventDefault();
    if (nickname && fullname) {
      const socket = new SockJS("/ws");
      const client = Stomp.over(socket);
      client.connect({}, onConnected, onError);
      setStompClient(client);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const messageContent = messageInput.trim();
    if (messageContent && stompClient) {
      const chatMessage = {
        senderId: nickname,
        recipientId: selectedUserId,
        content: messageContent,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
    }
  };

  const onLogout = () => {
    stompClient.send(
      "/app/user.disconnectUser",
      {},
      JSON.stringify({
        nickName: nickname,
        fullName: fullname,
        status: "OFFLINE",
      })
    );
    window.location.reload();
  };

  const handleUserItemClick = (userId) => {
    setSelectedUserId(userId);
    fetchAndDisplayUserChat();
  };

  const fetchAndDisplayUserChat = async () => {
    // Fetch and display user chat logic
  };

  const onMessageReceived = (message) => {
    // Handle incoming messages here
    console.log("Received message:", message);
  };

  return (
    <Container sx={{ marginTop: "150px" }}>
      <Typography variant="h3" gutterBottom>
        One to One Chat
      </Typography>
      <Box>
        {/* Display online users */}
        <List>
          {connectedUsers.map((user) => (
            <ListItem
              key={user.userId}
              button
              onClick={() => handleUserItemClick(user.userId)}
            >
              <ListItemAvatar>
                <Avatar>{user.fullName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.fullName} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        {/* Display chat messages */}
        <List>{/* Map through messages and display them */}</List>
        {/* Input field for typing messages */}
        <form onSubmit={sendMessage}>
          <TextField
            label="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Box>
      <Box>
        <Button onClick={onLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default ChatApplication;
