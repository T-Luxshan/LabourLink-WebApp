import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  getUserByEmail,
  findConnectedUsers,
  updateUserStatus,
} from "../Service/UserService";
import {
  findChatMessages,
  markAsRead,
  unreadMessageCount,
} from "../Service/ChatService";
import NavigationBarCustomer from "../Components/NavigationBar";
import NavigationBarLabour from "../Components/NavigationBarLabour";
import { MarkAsUnread } from "@mui/icons-material";
var stompClient = null;

const ChatApplication = () => {
  const [senderEmail, SetSenderEmail] = useState(
    localStorage.getItem("userEmail")
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const { receiverEmail } = useParams();
  const [user, setUser] = useState({
    email: senderEmail,
    receiverEmail: receiverEmail || "",
    status: "OFFLINE",
    message: "",
  });

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setselectedUser] = useState(receiverEmail);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [receivedMessagesCount, setReceivedMessagesCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedUserName, setSelectedUserName] = useState();

  const chatAreaRef = useRef(null); // Create a reference to the chat area
  const navigate = useNavigate();

  useEffect(() => {
    if (senderEmail !== null) {
      console.log(user);
    } else {
      navigate("/login");
    }
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
    registerUser(user);
  }, [user.email]); // Use `email` as the dependency here when email changes refreshes

  const connect = (event) => {
    if (user.email) {
      // Create a SockJS instance and connect with STOMP over WebSocket
      let socket = new SockJS("http://localhost:8080/ws");
      stompClient = over(socket);
      stompClient.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    if (!user || !user.email) {
      console.error("User information is incomplete.");
      return;
    }

    // Check connection state before subscribing and sending
    if (stompClient.connected) {
      stompClient.subscribe(
        "/user/" + user.email + "/queue/messages",
        onMessageReceived
      );
      stompClient.subscribe("/user/public", onMessageReceived);

      // Call findAndDisplayConnectedUsers only after connection
      findAndDisplayConnectedUsers();

      // Call userJoin after establishing the connection
      userJoin();
    } else {
      console.log("Waiting for connection to be established...");
    }
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
    if (userRole == "CUSTOMER") {
      try {
        const connectedUserResponse = await findConnectedUsers(senderEmail); // Call the function
        const connectedUsersData = await connectedUserResponse.data; // Access data property of response
        const filteredUsers = connectedUsersData.filter(
          (u) => u.email !== user.email
        );
        setConnectedUsers(filteredUsers);
      } catch (error) {
        console.log("Error fetching connected users:", error);
      }
    } else {
      try {
        const connectedUserResponse = await findConnectedUsers(senderEmail); // Call the function
        const connectedUsersData = await connectedUserResponse.data; // Access data property of response
        const filteredUsers = connectedUsersData.filter(
          (u) => u.email !== user.email
        );
        setConnectedUsers(filteredUsers);
      } catch (error) {
        console.log("Error fetching connected users:", error);
      }
    }
  }

  //update connected users and display in realtime at every time message is sent and received
  useEffect(() => {
    // Call fetchAndDisplayUserChat when component mounts
    findAndDisplayConnectedUsers();

    // Optionally return a cleanup function if needed
    return () => {};
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

  useEffect(() => {
    if (selectedUser) {
      handleUserClick(selectedUser);
    }
  }, [selectedUser]); // Runs whenever `selectedUser` changes

  const registerUser = (user) => {
    setUser({ ...user, status: "ONLINE" });
    updateUserStatusToDB(user);
    connect();
  };

  const handleUserClick = (selectedUser) => {
    setselectedUser(selectedUser);
    console.log(selectedUser);
    fetchAndDisplayUserChat(selectedUser);
    handleMarkAsRead(senderEmail, selectedUser);
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
    return () => {};
  }, [messages]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

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

  const handleUserSelection = (email, name) => {
    handleUserClick(email);
    setSelectedUserName(name);
    console.log(name);
  };

  async function handleMarkAsRead(senderEmail, receiverEmail) {
    try {
      await markAsRead(senderEmail, receiverEmail);
      console.log("Messages marked as read successfully.");
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  }

  async function getUnreadCount(senderEmail, receiverEmail) {
    try {
      const count = await unreadMessageCount(senderEmail, receiverEmail);
      // console.log('Unread Messages: '+ count.data);
      setReceivedMessagesCount(count.data);
    } catch (error) {
      console.error("Failed to get unread messages count", error);
    }
  }

  useEffect(() => {
    getUnreadCount(senderEmail, receiverEmail);
  }, [messages]);

  return (
    <Container sx={{ mt: 10 }}>
      {userRole === "CUSTOMER" ? (
        <NavigationBarCustomer />
      ) : (
        <NavigationBarLabour />
      )}
      {user.status === "ONLINE" ? (
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: "#34495e",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "20px",
              marginTop: "5px",
            }}
          >
            {selectedUserName ? `Chat with ${selectedUserName}` : "Start Chat"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                height: { xs: "auto", md: "460px" },
                margin: "20px",
                border: "1px solid #bdc3c7",
                backgroundColor: "#ecf0f1",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                component="nav"
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ marginLeft: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  variant="temporary"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: 240,
                      backgroundColor: "#34495e",
                      color: "#fff",
                    },
                  }}
                >
                  <Box
                    sx={{ padding: "20px", height: "100%", overflowY: "auto" }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Connected Users
                    </Typography>
                    <List>
                      {connectedUsers.map((user) => (
                        <ListItem
                          button
                          key={user.email}
                          onClick={() =>
                            handleUserSelection(user.email, user.name)
                          }
                          sx={{
                            backgroundColor:
                              selectedUser === user.email
                                ? "rgba(41, 128, 185, 0.2)"
                                : "transparent",
                            marginBottom: "5px",
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "rgba(41, 128, 185, 0.1)",
                            },
                          }}
                        >
                          <Avatar sx={{ marginRight: "10px" }} />
                          <ListItemText
                            primary={`${user.name}, ${receivedMessagesCount}`}
                            primaryTypographyProps={{ color: "#fff" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </Box>

              <Box
                sx={{
                  flex: { xs: "none", md: 1 },
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  padding: "20px",
                  backgroundColor: "#34495e",
                  color: "#fff",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: { xs: "8px", md: 0 },
                  borderBottomLeftRadius: { xs: 0, md: "8px" },
                  overflowY: "auto",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Connected Users
                </Typography>
                <List sx={{ flex: 1, overflowY: "auto" }}>
                  {connectedUsers.map((user) => (
                    <ListItem
                      button
                      key={user.email}
                      onClick={() => handleUserSelection(user.email, user.name)}
                      sx={{
                        backgroundColor:
                          selectedUser === user.email
                            ? "rgba(41, 128, 185, 0.2)"
                            : "transparent",
                        marginBottom: "5px",
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: "rgba(41, 128, 185, 0.1)",
                        },
                      }}
                    >
                      <Avatar sx={{ marginRight: "10px" }} />
                      <ListItemText
                        primary={`${user.name}`}
                        secondary={
                          receivedMessagesCount !== 0
                            ? `${receivedMessagesCount}`
                            : null
                        }
                        primaryTypographyProps={{ color: "#fff" }}
                        secondaryTypographyProps={{
                          style: { color: "#ff0000" },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box
                sx={{
                  flex: 3,
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  boxSizing: "border-box",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: { md: "8px" },
                  borderBottomLeftRadius: { xs: "8px", md: 0 },
                }}
              >
                <Box
                  sx={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}
                  ref={chatAreaRef}
                >
                  {messages.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent:
                          message.senderId === user.email
                            ? "flex-end"
                            : "flex-start",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          backgroundColor:
                            message.senderId === user.email
                              ? "#3498db"
                              : "#ecf0f1",
                          color:
                            message.senderId === user.email
                              ? "#fff"
                              : "#34495e",
                          padding: "10px",
                          borderRadius: "8px",
                          maxWidth: "75%",
                          wordWrap: "break-word",
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  component="form"
                  sx={{ display: "flex" }}
                  onSubmit={sendMessage}
                >
                  <TextField
                    id="message"
                    label="Type your message..."
                    variant="outlined"
                    sx={{ flex: 1, marginRight: "10px" }}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ my: 4, textAlign: "center" }}>
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
