import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile";
import userData from "./Components/User.json";
// import { ThemeProvider } from '../src/Context/ThemeContext';

import {  createContext, useState } from "react";

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
            {/* <Route path="/notification" element={<Notification />} /> */}
            <Route
              path="/profile"
              element={
                <>
                  <NavigationBar />
                  <Profile user={userData} /> {/* Pass user data as a prop */}
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
