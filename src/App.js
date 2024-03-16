import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import { getCustomersByEmail } from "./Service/CustomerService";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  // const [customer, setCustomer] = useState([]);

  // useEffect(() => {
  //   const fetchCustomerData = async (email) => {
  //     try {
  //       const response = await getCustomersByEmail(email);
  //       setCustomer(response.data); // Update state with fetched customer data
  //     } catch (error) {
  //       console.error("Error fetching customer data:", error);
  //       throw error;
  //     }
  //   };
  
  //   fetchCustomerData();
  // }, []);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <NavigationBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Categories />
                  <Footer />
                </>
              }
            />
            <Route
              path="/labourcategories"
              element={
                <>
                  <Categories />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <NavigationBar />
                  {/* {customer.map((customerItem) => (
                    <Profile key={customerItem.email} customer={customerItem} />
                  ))} */}

                  <Profile/>
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
