import React, { useEffect, useState } from "react";
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
import { getUserByEmail } from "../Service/UserService"; 

const ChatApplication = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const email = "customer@example.com";
    const fetchUserData = async () => {
      try {
        const response = await getUserByEmail(email);
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching customer data:", error);
        throw error;
      }
    };
    fetchUserData();
  }, []);

  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  var stompClient = null;

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe()
  };

  const onError = () => {
    
  };


  return (
    <Container sx={{ marginTop: "70px" }}>
      {userData.connected ? (
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Chat with your labour
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
              {/* Users List */}
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
                  <Typography variant="h2" gutterBottom>
                    Online Users
                  </Typography>
                  <List>
                    {/* Online Users List */}
                    {/* Replace the static user list with dynamic user data */}
                    <ListItem button>
                      <Avatar />
                      <ListItemText primary="User 1" />
                    </ListItem>
                    <ListItem button>
                      <Avatar />
                      <ListItemText primary="User 2" />
                    </ListItem>
                    {/* End of Online Users List */}
                  </List>
                </Box>
                <Box>
                  <Typography variant="body1" id="connected-user-fullname">
                    {/* Connected user's full name */}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    href="javascript:void(0)"
                    id="logout"
                  >
                    Logout
                  </Button>
                </Box>
              </Box>

              {/* Chat Area */}
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
                <Box sx={{ flex: 1, overflowY: "scroll" }}>
                  {/* Chat Messages */}
                  {/* Replace the static chat messages with dynamic messages */}
                  <div>
                    <div>
                      <Typography
                        variant="body1"
                        sx={{
                          backgroundColor: "#3498db",
                          color: "#fff",
                          padding: "8px",
                          borderRadius: "5px",
                          alignSelf: "flex-end",
                        }}
                      >
                        Sender's message
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="body1"
                        sx={{
                          backgroundColor: "#ecf0f1",
                          color: "#333",
                          padding: "8px",
                          borderRadius: "5px",
                          alignSelf: "flex-start",
                        }}
                      >
                        Receiver's message
                      </Typography>
                    </div>
                  </div>
                  {/* End of Chat Messages */}
                </Box>

                {/* Message Input */}
                <form id="messageForm" name="messageForm" className="hidden">
                  <Box sx={{ display: "flex", marginTop: "auto" }}>
                    <TextField
                      id="message"
                      label="Type your message..."
                      variant="outlined"
                      sx={{ flex: 1, marginRight: "10px" }}
                    />
                    <Button variant="contained" color="primary">
                      Send
                    </Button>
                  </Box>
                </form>
                {/* End of Message Input */}
              </Box>
              {/* End of Chat Area */}
            </Box>
          </Box>
        </Box>
      ) : (
        // Render something meaningful here when connected is false
        // For example, you could display a loading spinner or a message
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Connecting...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ChatApplication;
