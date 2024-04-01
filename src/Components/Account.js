// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import CreateIcon from "@mui/icons-material/Create";
// import Avatar from "@mui/material/Avatar"; // Import Avatar component
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { getCustomersByEmail } from "../Service/CustomerService"; //importing the API to get all customers
// import UpdateAccount from "./UpdateAccount";


// const Account = () => {
//   const [customer, setCustomer] = useState({}); //customer is used to store an object initially empty object is passed


//   useEffect(() => {
//     const email = "customer@example.com"; // as it is done before doing login function here email is hardcoded

//     // Define an asynchronous function to fetch customer data from some external source, like an API.
//     //The await keyword is used to wait for the promise returned by getCustomersByEmail to resolve, and the result is stored in the response variable.
//     const fetchCustomerData = async () => {
//       try {
//         const response = await getCustomersByEmail(email); // Send a request to the server to retrieve customer data based on email
//         console.log(response.data.address); // Log the fetched customer's address to the console // checking wheather it is receiving address
//         setCustomer(response.data); // Update state with fetched customer data
//       } catch (error) {
//         console.error("Error fetching customer data:", error); // Handle any errors that occur during the data fetching process
//         throw error;
//       }
//     };

//     fetchCustomerData(); // Invoke the function to fetch customer data when the component mounts
//   }, []);
//   console.log(customer);

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <Typography
//         variant="h5"
//         style={{ fontWeight: "bold", marginBottom: "20px" }}
//       >
//         Personal Info
//       </Typography>
//       <Paper
//         style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
//         elevation={3}
//       >
//         <Avatar
//           style={{
//             margin: "0 auto",
//             marginBottom: "20px",
//             backgroundColor: "orange",
//           }}
//         >
//           <AccountCircleIcon />
//         </Avatar>

//         <Typography variant="body1">{`Name: ${customer.name}`}</Typography>
//         <Typography variant="body1">{`Email: ${customer.email}`}</Typography>
//         <Typography variant="body1">{`Mobile Number: ${customer.mobileNumber}`}</Typography>
//         <Typography variant="body1">{`Password: ${customer.password}`}</Typography>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             marginTop: "20px",
//           }}
//         >
//           <Button size="small" color="primary" onClick={<UpdateAccount/>}>
//             <CreateIcon />
//             Edit
//           </Button>
//         </div>
//       </Paper>
//     </div>
//   );
// };

// export default Account;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getCustomersByEmail } from "../Service/CustomerService";

const Account = () => {
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const email = "customer@example.com";
    const fetchCustomerData = async () => {
      try {
        const response = await getCustomersByEmail(email);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        throw error;
      }
    };

    fetchCustomerData();
  }, []);

  // Function to handle the edit button click
  const handleEditClick = () => {
    navigate("/update-account"); // Navigate to the UpdateAccount component
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Customer Personal Info
      </Typography>
      <Paper
        style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
        elevation={3}
      >
        <Avatar
          style={{
            margin: "0 auto",
            marginBottom: "20px",
            backgroundColor: "orange",
          }}
        >
          <AccountCircleIcon />
        </Avatar>

        <Typography variant="body1">{`Name: ${customer.name}`}</Typography>
        <Typography variant="body1">{`Email: ${customer.email}`}</Typography>
        <Typography variant="body1">{`Mobile Number: ${customer.mobileNumber}`}</Typography>
        <Typography variant="body1">{`Password: ${customer.password}`}</Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button size="small" color="primary" onClick={handleEditClick}>
            <CreateIcon />
            Edit
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Account;
