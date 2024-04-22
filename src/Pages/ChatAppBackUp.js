// import React, { useEffect, useState } from "react";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";
// import {
//   Container,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Button,
//   Avatar,
// } from "@mui/material";
// import { getUserByEmail } from "../Service/UserService";

// const ChatApplication = () => {
//   const [user, setUser] = useState({});
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");

//   useEffect(() => {
//     const email = "customer@example.com";
//     const fetchUserData = async () => {
//       try {
//         const response = await getUserByEmail(email);
//         setUser(response.data);
//       } catch (error) {
//         console.log("Error fetching customer data:", error);
//         throw error;
//       }
//     };
//     fetchUserData();
//   }, [user.email]);

//   console.log(user.email);
//   console.log(user.name);

//   const [userData, setUserData] = useState({
//     username: "",
//     receivername: "",
//     connected: true,
//     message: "",
//   });

//   var stompClient = null;

//   const connect = (event) => {
//     let Sock = new SockJS("http://localhost:8080/ws");
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//     event.preventDefault();
//   };

//   const onConnected = () => {
//     stompClient.subscribe(
//       "/user/" + user.email + "queue/messages",
//       onMessageReceived
//     );
//     stompClient.subscribe("/user/public", onMessageReceived);

//     userJoin();

//     //register the connected user
//     stompClient.send(
//       "/app/user.add",
//       {},
//       JSON.stringify({ name: user.name, status: "ONLINE" })
//     );

//     //find and display connected users
//   };

//   const userJoin = () => {
//     var chatMessage = {
//       senderName: user.email,
//       status: "ONLINE",
//     };
//     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   };

//   async function findAndDisplayConnectedUsers() {
//     const connectedUserResponse = await fetch("/users");
//     const connectedUsers = await connectedUserResponse.json();
//     connectedUsers = connectedUsers.filter((user) => user.email !== user.email);
//     console.log(connectedUsers); // You can display connectedUsers in the console or process it further
//   }

//   const onError = () => {
//     // Handle connection errors
//     console.log("Error connecting to WebSocket server.");
//   };

//   const onMessageReceived = (payload) => {
//     // Handle received messages
//     const message = JSON.parse(payload.body);
//     // Update messages state with new message
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const sendMessage = () => {
//     // Send message to selected user
//     if (messageInput.trim() && selectedUserId) {
//       const chatMessage = {
//         senderId: user.email,
//         recipientId: selectedUserId,
//         content: messageInput.trim(),
//         timestamp: new Date().toISOString(),
//       };
//       stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
//       setMessageInput("");
//     }
//   };

//   const handleUserClick = (selectedUserId) => {
//     // Handle user selection from user list
//     setSelectedUserId(selectedUserId);
//     // Fetch and display chat history with selected user
//     fetchAndDisplayUserChat(selectedUserId);
//   };

//   const fetchAndDisplayUserChat = async (selectedUserId) => {
//     // Fetch chat history with selected user
//     try {
//       const UserChatResponse = await fetch(
//         `/messages/${user.email}/${selectedUserId}`
//       );
//       const chatHistory = await UserChatResponse.json();
//       // Update messages state with chat history
//       setMessages(chatHistory);
//     } catch (error) {
//       console.log("Error fetching chat history:", error);
//     }
//   };

//   return (
//     <Container sx={{ marginTop: "70px" }}>
//       {userData.connected ? (
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h2" align="center" gutterBottom>
//             Chat with labour
//           </Typography>

//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <Box
//               sx={{
//                 width: "800px",
//                 height: "600px",
//                 margin: "20px",
//                 border: "1px solid #ccc",
//                 backgroundColor: "#fff",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//                 display: "flex",
//               }}
//             >
//               {/* Users List */}
//               <Box
//                 sx={{
//                   flex: 1,
//                   borderRight: "1px solid #ccc",
//                   padding: "20px",
//                   boxSizing: "border-box",
//                   backgroundColor: "#3498db",
//                   color: "#fff",
//                   borderTopLeftRadius: "8px",
//                   borderBottomLeftRadius: "8px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h2" gutterBottom>
//                     Online Users
//                   </Typography>
//                   <List>
//                     {/* Online Users List */}
//                     {/* Replace the static user list with dynamic user data */}
//                     {connectedUsers.map((user, index) => (
//                       <ListItem button key={index}>
//                         <Avatar />
//                         <ListItemText primary={user.name} />
//                       </ListItem>
//                     ))}
//                     {/* End of Online Users List */}
//                   </List>
//                 </Box>
//                 <Box>
//                   <Typography variant="body1" id="connected-user-fullname">
//                     {/* Connected user's full name */}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     href="javascript:void(0)"
//                     id="logout"
//                   >
//                     Logout
//                   </Button>
//                 </Box>
//               </Box>

//               {/* Chat Area */}
//               <Box
//                 sx={{
//                   flex: 3,
//                   display: "flex",
//                   flexDirection: "column",
//                   padding: "20px",
//                   boxSizing: "border-box",
//                   borderTopRightRadius: "8px",
//                   borderBottomRightRadius: "8px",
//                 }}
//               >
//                 <Box sx={{ flex: 1, overflowY: "scroll" }}>
//                   {/* Chat Messages */}
//                   {messages.map((message, index) => (
//                     <div key={index}>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           backgroundColor:
//                             message.senderId === user.email
//                               ? "#3498db"
//                               : "#ecf0f1",
//                           color:
//                             message.senderId === user.email ? "#fff" : "#333",
//                           padding: "8px",
//                           borderRadius: "5px",
//                           alignSelf:
//                             message.senderId === user.email
//                               ? "flex-end"
//                               : "flex-start",
//                         }}
//                       >
//                         {message.content}
//                       </Typography>
//                     </div>
//                   ))}
//                   {/* End of Chat Messages */}
//                 </Box>

//                 {/* Message Input */}
//                 <form id="messageForm" name="messageForm" className="hidden">
//                   <Box sx={{ display: "flex", marginTop: "auto" }}>
//                     <TextField
//                       id="message"
//                       label="Type your message..."
//                       variant="outlined"
//                       sx={{ flex: 1, marginRight: "10px" }}
//                     />
//                     <Button variant="contained" color="primary">
//                       Send
//                     </Button>
//                   </Box>
//                 </form>
//                 {/* End of Message Input */}
//               </Box>
//               {/* End of Chat Area */}
//             </Box>
//           </Box>
//         </Box>
//       ) : (
//         // Render something meaningful here when connected is false
//         // For example, you could display a loading spinner or a message
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h2" align="center" gutterBottom>
//             Connecting...
//           </Typography>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default ChatApplication;

// import React, { useEffect, useState } from "react";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";
// import {
//   Container,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Button,
//   Avatar,
// } from "@mui/material";
// import { getUserByEmail } from "../Service/UserService";

// const ChatApplication = () => {
//   const [user, setUser] = useState({});
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");

//   useEffect(() => {
//     const email = "customer@example.com";
//     const fetchUserData = async () => {
//       try {
//         const response = await getUserByEmail(email);
//         setUser(response.data);
//       } catch (error) {
//         console.log("Error fetching customer data:", error);
//         throw error;
//       }
//     };
//     fetchUserData();
//   }, [user.email]); // Use `email` as the dependency here

//   console.log(user.email);
//   console.log(user.name);

//   const [userData, setUserData] = useState({
//     username: "",
//     receivername: "",
//     connected: true,
//     message: "",
//   });

//   var stompClient = null;

//   const connect = (event) => {
//     let Sock = new SockJS("http://localhost:8080/ws");
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//     event.preventDefault();
//   };

//   const onConnected = () => {
//     stompClient.subscribe(
//       "/user/" + user.email + "queue/messages",
//       onMessageReceived
//     );
//     stompClient.subscribe("/user/public", onMessageReceived);

//     // You can remove this line if `userJoin()` is not defined or necessary
//     // userJoin();

//     //register the connected user
//     stompClient.send(
//       "/app/user.add",
//       {},
//       JSON.stringify({ name: user.name, status: "ONLINE" })
//     );

//     //find and display connected users
//     findAndDisplayConnectedUsers();
//   };

//   // Define userJoin() function if necessary
//   const userJoin = () => {
//     var chatMessage = {
//       senderName: user.email,
//       status: "ONLINE",
//     };
//     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   };

//   async function findAndDisplayConnectedUsers() {
//     const connectedUserResponse = await fetch("/users");
//     const connectedUsers = await connectedUserResponse.json();
//     connectedUsers = connectedUsers.filter((user) => user.email !== user.email);
//     console.log(connectedUsers); // You can display connectedUsers in the console or process it further
//   }

//   const onError = () => {
//     // Handle connection errors
//     console.log("Error connecting to WebSocket server.");
//   };

//   const onMessageReceived = (payload) => {
//     // Handle received messages
//     const message = JSON.parse(payload.body);
//     // Update messages state with new message
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const sendMessage = () => {
//     // Send message to selected user
//     if (messageInput.trim() && selectedUserId) {
//       const chatMessage = {
//         senderId: user.email,
//         recipientId: selectedUserId,
//         content: messageInput.trim(),
//         timestamp: new Date().toISOString(),
//       };
//       stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
//       setMessageInput("");
//     }
//   };

//   const handleUserClick = (selectedUserId) => {
//     // Handle user selection from user list
//     setSelectedUserId(selectedUserId);
//     // Fetch and display chat history with selected user
//     fetchAndDisplayUserChat(selectedUserId);
//   };

//   const fetchAndDisplayUserChat = async (selectedUserId) => {
//     // Fetch chat history with selected user
//     try {
//       const UserChatResponse = await fetch(
//         `/messages/${user.email}/${selectedUserId}`
//       );
//       const chatHistory = await UserChatResponse.json();
//       // Update messages state with chat history
//       setMessages(chatHistory);
//     } catch (error) {
//       console.log("Error fetching chat history:", error);
//     }
//   };

//   return (
//     <Container sx={{ marginTop: "70px" }}>
//       {userData.connected ? (
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h2" align="center" gutterBottom>
//             Chat with labour
//           </Typography>

//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <Box
//               sx={{
//                 width: "800px",
//                 height: "600px",
//                 margin: "20px",
//                 border: "1px solid #ccc",
//                 backgroundColor: "#fff",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//                 display: "flex",
//               }}
//             >
//               {/* Users List */}
//               <Box
//                 sx={{
//                   flex: 1,
//                   borderRight: "1px solid #ccc",
//                   padding: "20px",
//                   boxSizing: "border-box",
//                   backgroundColor: "#3498db",
//                   color: "#fff",
//                   borderTopLeftRadius: "8px",
//                   borderBottomLeftRadius: "8px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h4" gutterBottom>
//                     Online Users
//                   </Typography>
//                   <List>
//                     {/* Online Users List */}
//                     {/* Replace the static user list with dynamic user data */}
//                     {connectedUsers.map((user, index) => (
//                       <ListItem button key={index} onClick={() => handleUserClick(user.id)}>
//                         <Avatar />
//                         <ListItemText primary={user.name} />
//                       </ListItem>
//                     ))}
//                     {/* End of Online Users List */}
//                   </List>
//                 </Box>
//                 <Box>
//                   <Typography variant="body1" id="connected-user-fullname">
//                     {/* Connected user's full name */}
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Chat Area */}
//               <Box
//                 sx={{
//                   flex: 3,
//                   display: "flex",
//                   flexDirection: "column",
//                   padding: "20px",
//                   boxSizing: "border-box",
//                   borderTopRightRadius: "8px",
//                   borderBottomRightRadius: "8px",
//                 }}
//               >
//                 <Box sx={{ flex: 1, overflowY: "scroll" }}>
//                   {/* Chat Messages */}
//                   {messages.map((message, index) => (
//                     <div key={index}>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           backgroundColor:
//                             message.senderId === user.email
//                               ? "#3498db"
//                               : "#ecf0f1",
//                           color:
//                             message.senderId === user.email ? "#fff" : "#333",
//                           padding: "8px",
//                           borderRadius: "5px",
//                           alignSelf:
//                             message.senderId === user.email
//                               ? "flex-end"
//                               : "flex-start",
//                         }}
//                       >
//                         {message.content}
//                       </Typography>
//                     </div>
//                   ))}
//                   {/* End of Chat Messages */}
//                 </Box>

//                 {/* Message Input */}
//                 <form id="messageForm" name="messageForm" className="hidden">
//                   <Box sx={{ display: "flex", marginTop: "auto" }}>
//                     <TextField
//                       id="message"
//                       label="Type your message..."
//                       variant="outlined"
//                       sx={{ flex: 1, marginRight: "10px" }}
//                     />
//                     <Button variant="contained" color="primary" onClick={sendMessage}>
//                       Send
//                     </Button>
//                   </Box>
//                 </form>
//                 {/* End of Message Input */}
//               </Box>
//               {/* End of Chat Area */}
//             </Box>
//           </Box>
//         </Box>
//       ) : (
//         // Render something meaningful here when connected is false
//         // For example, you could display a loading spinner or a message
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h2" align="center" gutterBottom>
//             Connecting...
//           </Typography>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default ChatApplication;

// import React, { useEffect, useState } from "react";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";
// import {
//   Container,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Button,
//   Avatar,
// } from "@mui/material";
// import { getUserByEmail } from "../Service/UserService";

// const ChatApplication = () => {
//   const [user, setUser] = useState({});
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await getUserByEmail(email);
//         setUser(response.data);
//       } catch (error) {
//         console.log("Error fetching customer data:", error);
//       }
//     };
//     fetchUserData();
//   }, [email]); // Use `email` as the dependency here

//   console.log(user.email);
//   console.log(user.name);

//   var stompClient = null;

//   const connect = (event) => {
//     let Sock = new SockJS("http://localhost:8080/ws");
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//     event.preventDefault();
//   };

//   const onConnected = () => {
//     stompClient.subscribe(
//       "/user/" + user.email + "queue/messages",
//       onMessageReceived
//     );
//     stompClient.subscribe("/user/public", onMessageReceived);

//     stompClient.send(
//       "/app/user.add",
//       {},
//       JSON.stringify({ name: user.name, status: "ONLINE" })
//     );

//     findAndDisplayConnectedUsers();
//   };

//   const userJoin = () => {
//     var chatMessage = {
//       senderName: user.email,
//       status: "ONLINE",
//     };
//     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   };

//   async function findAndDisplayConnectedUsers() {
//     try {
//       const connectedUserResponse = await fetch("/users");
//       const connectedUsersData = await connectedUserResponse.json();
//       const filteredUsers = connectedUsersData.filter(
//         (u) => u.email !== user.email
//       );
//       setConnectedUsers(filteredUsers);
//     } catch (error) {
//       console.log("Error fetching connected users:", error);
//     }
//   }

//   const onError = () => {
//     console.log("Error connecting to WebSocket server.");
//   };

//   const onMessageReceived = (payload) => {
//     const message = JSON.parse(payload.body);
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const sendMessage = () => {
//     if (messageInput.trim() && selectedUserId) {
//       const chatMessage = {
//         senderId: user.email,
//         recipientId: selectedUserId,
//         content: messageInput.trim(),
//         timestamp: new Date().toISOString(),
//       };
//       stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
//       setMessageInput("");
//     }
//   };

//   const handleUserClick = (selectedUserId) => {
//     setSelectedUserId(selectedUserId);
//     fetchAndDisplayUserChat(selectedUserId);
//   };

//   const fetchAndDisplayUserChat = async (selectedUserId) => {
//     try {
//       const UserChatResponse = await fetch(
//         `/messages/${user.email}/${selectedUserId}`
//       );
//       const chatHistory = await UserChatResponse.json();
//       setMessages(chatHistory);
//     } catch (error) {
//       console.log("Error fetching chat history:", error);
//     }
//   };

//   return (
//     <Container sx={{ marginTop: "70px" }}>
//       {user.email ? (
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h2" align="center" gutterBottom>
//             Chat with {user.name}
//           </Typography>

//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <Box
//               sx={{
//                 width: "800px",
//                 height: "600px",
//                 margin: "20px",
//                 border: "1px solid #ccc",
//                 backgroundColor: "#fff",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//                 display: "flex",
//               }}
//             >
//               <Box
//                 sx={{
//                   flex: 1,
//                   borderRight: "1px solid #ccc",
//                   padding: "20px",
//                   boxSizing: "border-box",
//                   backgroundColor: "#3498db",
//                   color: "#fff",
//                   borderTopLeftRadius: "8px",
//                   borderBottomLeftRadius: "8px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h4" gutterBottom>
//                     Online Users
//                   </Typography>
//                   <List>
//                     {connectedUsers.map((user, index) => (
//                       <ListItem
//                         button
//                         key={user.id}
//                         onClick={() => handleUserClick(user.id)}
//                       >
//                         <Avatar />
//                         <ListItemText primary={user.name} />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Box>
//                 <Box>
//                   <Typography variant="body1" id="connected-user-fullname">
//                     {/* Connected user's full name */}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   flex: 3,
//                   display: "flex",
//                   flexDirection: "column",
//                   padding: "20px",
//                   boxSizing: "border-box",
//                   borderTopRightRadius: "8px",
//                   borderBottomRightRadius: "8px",
//                 }}
//               >
//                 <Box sx={{ flex: 1, overflowY: "scroll" }}>
//                   {messages.map((message, index) => (
//                     <div key={index}>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           backgroundColor:
//                             message.senderId === user.email
//                               ? "#3498db"
//                               : "#ecf0f1",
//                           color:
//                             message.senderId === user.email ? "#fff" : "#333",
//                           padding: "8px",
//                           borderRadius: "5px",
//                           alignSelf:
//                             message.senderId === user.email
//                               ? "flex-end"
//                               : "flex-start",
//                         }}
//                       >
//                         {message.content}
//                       </Typography>
//                     </div>
//                   ))}
//                 </Box>

//                 <form id="messageForm" name="messageForm" className="hidden">
//                   <Box sx={{ display: "flex", marginTop: "auto" }}>
//                     <TextField
//                       id="message"
//                       label="Type your message..."
//                       variant="outlined"
//                       sx={{ flex: 1, marginRight: "10px" }}
//                       value={messageInput}
//                       onChange={(e) => setMessageInput(e.target.value)}
//                     />
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={sendMessage}
//                     >
//                       Send
//                     </Button>
//                   </Box>
//                 </form>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       ) : (
//         <Box sx={{ my: 4 }}>
//           <TextField
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={connect}>
//             Connect
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default ChatApplication;