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
import Notification from "./Pages/Notification";

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
                  <Profile />
                </>
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
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
