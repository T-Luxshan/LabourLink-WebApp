import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import { getCustomersByEmail } from "./Service/CustomerService";
import UpdateAccount from "./Components/UpdateAccount";
import ChatApplication from "./Pages/ChatApplication";
import ChatRoom from "./Pages/ChatRoom2";
import SignInSide from "./Pages/Authentication/SignInSide";


export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          {/* <NavigationBar /> */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavigationBar />
                  <Home />
                  <Categories />
                  <Footer />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <SignInSide />
                  
                </>
              }
            />
            <Route
              path="/labourcategories"
              element={
                <>
                  <NavigationBar />
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
                  <Profile/>
                </>
              }
            />
            <Route path="/update-account" element={<UpdateAccount />} />
            <Route path="/chat" element={<ChatApplication />} />
            <Route path="/chatroom" element={<ChatRoom />} />

          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
