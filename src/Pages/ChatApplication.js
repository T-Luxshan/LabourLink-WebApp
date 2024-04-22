import React, { useEffect, useState, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import {
  getUserByEmail,
  findConnectedUsers,
  updateUserStatus,
  findChatMessages,
} from "../Service/UserService";
var stompClient = null;

const ChatApplication = () => {
  const [user, setUser] = useState({
    email: "",
    receiverEmail: "",
    status: "OFFLINE",
    message: "",
  });

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [receivedMessagesCount, setReceivedMessagesCount] = useState(0);

  const chatAreaRef = useRef(null); // Create a reference to the chat area

  useEffect(() => {
    console.log(user);
  }, [user]);

  //Getting User details with email
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserByEmail(user.email);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching customer data:", error);
      }
    };
    fetchUserData();
  }, [user.email]); // Use `email` as the dependency here when email changes refreshes

  useEffect(() => {
    // Update received messages count whenever messages state changes
    setReceivedMessagesCount(messages.length);
  }, [messages]);

  console.log(user.email);
  console.log(user.name);

  const connect = (event) => {
    if (user.email) {
      // Create a SockJS instance and connect with STOMP over WebSocket
      let socket = new SockJS("http://localhost:8080/ws");
      stompClient = over(socket);
      stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    if (!user || !user.email || !user.name) {
      console.error("User information is incomplete.");
      return;
    }

    stompClient.subscribe(
      "/user/" + user.email + "/queue/messages",
      onMessageReceived
    );
    stompClient.subscribe("/user/public", onMessageReceived);

    //find and display connected users
    findAndDisplayConnectedUsers();

    // Call userJoin after establishing the connection
    userJoin();
  };

  const userJoin = () => {
    // Ensure that user.email is present and accurate
    if (!user || !user.email) {
      console.error("User email is missing or invalid.");
      return;
    }

    var chatMessage = {
      senderName: user.name,
      status: "ONLINE",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  async function findAndDisplayConnectedUsers() {
    try {
      const connectedUserResponse = await findConnectedUsers(); // Call the function
      const connectedUsersData = await connectedUserResponse.data; // Access data property of response
      const filteredUsers = connectedUsersData.filter(
        (u) => u.email !== user.email
      );
      setConnectedUsers(filteredUsers);
    } catch (error) {
      console.log("Error fetching connected users:", error);
    }
  }

  //update connected users and display in realtime at every time message is sent and received
  useEffect(() => {
    // Call fetchAndDisplayUserChat when component mounts
    findAndDisplayConnectedUsers();

    // Optionally return a cleanup function if needed
    return () => {
    };
  }, [messages]);

  const onError = () => {
    console.log("Error connecting to WebSocket server.");
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (messageInput.trim() && selectedUser) {
      const chatMessage = {
        senderId: user.email,
        recipientId: selectedUser,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
      };
      console.log(chatMessage);

      // Sending the chat message to the backend
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      console.log("Message Sent");

      setMessageInput("");
    }
  };

  const handleUserClick = (selectedUser) => {
    setselectedUser(selectedUser);
    fetchAndDisplayUserChat(selectedUser);
  };

  const fetchAndDisplayUserChat = async (selectedUser) => {
    try {
      const UserChatResponse = await findChatMessages(user.email, selectedUser);
      const chatHistory = UserChatResponse.data; // Access 'data' directly from the Axios response
      setMessages(chatHistory);
    } catch (error) {
      console.log("Error fetching chat history:", error);
    }
  };


  //update chat history and display in realtime at every time message is sent and received
  useEffect(() => {
    // Call fetchAndDisplayUserChat when component mounts
    fetchAndDisplayUserChat(selectedUser);

    // Optionally return a cleanup function if needed
    return () => {
    };
  }, [messages]);

  

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleEmail = (event) => {
    const { value } = event.target;
    setUser({ ...user, email: value });
  };

  const updateUserStatusToDB = async (user) => {
    console.log(user);

    try {
      const response = await updateUserStatus(user.email, { status: "ONLINE" });
      console.log(response);
      console.log("User status changed successfully");
      // Optionally, you can reset the form or show a success message to the user
    } catch (error) {
      console.error("Error updating user status:", error);
      // Handle errors such as displaying an error message to the user
    }
  };

  const registerUser = (user, setUser) => {
    setUser({ ...user, status: "ONLINE" });
    updateUserStatusToDB(user);
    connect();
  };

  return (
    <Container sx={{ marginTop: "70px" }}>
      {user.status === "ONLINE" ? (
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Chat with Labour
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: "800px",
                height: "600px",
                margin: "20px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  borderRight: "1px solid #ccc",
                  padding: "20px",
                  boxSizing: "border-box",
                  backgroundColor: "#3498db",
                  color: "#fff",
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Online Users
                  </Typography>
                  <List>
                    {connectedUsers.map((user, index) => (
                      <ListItem
                        button
                        key={user.email}
                        onClick={() => handleUserClick(user.email)}
                        style={{
                          backgroundColor:
                            selectedUser === user.email ? "red" : "lightblue",
                        }}
                      >
                        <Avatar />
                        <ListItemText
                          primary={`${user.name} (${receivedMessagesCount})`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body1" id="connected-user-fullname">
                    {/* Connected user's full name */}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  flex: 3,
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  boxSizing: "border-box",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                <Box sx={{ flex: 1, overflowY: "scroll" }} ref={chatAreaRef}>
                  {messages.map((message, index) => (
                    <div key={index}>
                      <Typography
                        variant="body1"
                        sx={{
                          backgroundColor:
                            message.senderId === user.email
                              ? "#3498db"
                              : "#ecf0f1",
                          color:
                            message.senderId === user.email ? "#fff" : "#333",
                          padding: "8px",
                          borderRadius: "5px",
                          alignSelf:
                            message.senderId === user.email
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        {message.content}
                      </Typography>
                    </div>
                  ))}
                </Box>

                <form id="messageForm" name="messageForm" className="hidden">
                  <Box sx={{ display: "flex", marginTop: "auto" }}>
                    <TextField
                      id="message"
                      label="Type your message..."
                      variant="outlined"
                      sx={{ flex: 1, marginRight: "10px" }}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={sendMessage}
                    >
                      Send
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ my: 4 }}>
          <TextField
            placeholder="Enter your email"
            value={user.email}
            onChange={handleEmail}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => registerUser(user, setUser)}
          >
            Connect
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ChatApplication;
