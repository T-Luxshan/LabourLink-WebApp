import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import UpdateAccount from "./Components/UpdateAccount";
import ChatApplication from "./Pages/ChatApplication";
import ChatRoom from "./Pages/ChatRoom2";

import SignInSide from "./Pages/Authentication/SignInSide";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import VerifyOTP from "./Pages/Authentication/VerifyOTP";
import ChangePassword from "./Pages/Authentication/ChangePassword";
import { EmailProvider } from "./Service/EmailContext";

import Notification from "./Pages/Notification";
import Review from "./Components/Review";
import JoinAs from "./Pages/Authentication/JoinAs";


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
              path="/signup"
              element={
                <>
                  <SignUp /> 
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
                  <Profile />
                </>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <EmailProvider>
                  <ForgotPassword />
                </EmailProvider>
              }
            />
            <Route
              path="/verifyotp"
              element={
                <EmailProvider>
                  <VerifyOTP />
                </EmailProvider>
              }
            />
            <Route
              path="/changepassword"
              element={
                <EmailProvider>
                  <ChangePassword />
                </EmailProvider>
              }
            />
            <Route path="/update-account" element={<UpdateAccount />} />
            <Route path="/chat" element={<ChatApplication />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route
              path="/notification"
              element={
                <>
                  <NavigationBar />
                  <Notification />
                </>
              }
            />
            <Route
              path="/review"
              element={
                <>
                  <NavigationBar />
                  <Review />
                </>
              }
            />
            <Route
              path="/joinas"
              element={
                <>
                  <JoinAs />
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
