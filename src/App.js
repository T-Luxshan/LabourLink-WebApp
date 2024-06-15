import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import UpdateAccount from "./Components/UpdateAccount";
import ChatApplication from "./Pages/ChatApplication";
import SignInSide from "./Pages/Authentication/SignInSide";
import CustomerSignUp from "./Pages/Authentication/CustomerSignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import VerifyOTP from "./Pages/Authentication/VerifyOTP";
import ChangePassword from "./Pages/Authentication/ChangePassword";
import { EmailProvider } from "./Service/EmailContext";
import Notification from "./Pages/Notification";
import MapView from "./Pages/MapView";
import HiredHistory from "./Pages/HiredHistory";
import Review from "./Components/Review";
import JoinAs from "./Pages/Authentication/JoinAs";
import LabourSignUp from "./Pages/Authentication/LabourSignUp";
import WaitingPage from "./Pages/Authentication/WaitingPage";
import LabourHome from "./Pages/Labour/LabourHome";
import NavigationBarLabour from "./Components/NavigationBarLabour";
import Report from "./Components/Report";
import NewAppointments from "./Pages/Labour/NewAppointments";
import LabourProfile from "./Pages/Labour/LabourProfile"
import UpdateLabourAccount from "./Components/UpdateLabourAccount";
import LabourPerfomance from "./Pages/LabourPerfomance";


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
              path="/signup/customer"
              element={
                <>

                  <CustomerSignUp /> 
                </>
              }
            />
            <Route
              path="/signup/labour"
              element={
                <>
                  <LabourSignUp /> 
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
                  <Footer />
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
            <Route
              path="/hire/:jobRole"
              element={
                <>
                  <NavigationBar />
                  <MapView />
                  <Footer />
                </>
              }
            />

            <Route path="/update-account" element={<UpdateAccount />} />
            <Route
              path="/chat"
              element={
                <>
                  <NavigationBar />
                  <ChatApplication />
                  <Footer />
                </>
              }
            />
            <Route
              path="/chat/:receiverEmail"
              element={
                <>
                  <NavigationBar />
                  <ChatApplication />
                  <Footer />
                </>
              }
            />
            <Route
              path="/notification"
              element={
                <>
                  <NavigationBar />
                  <Notification />
                  <Footer />
                </>
              }
            />
            <Route
              path="/history"
              element={
                <>
                  <NavigationBar />
                  <HiredHistory />
                  <Footer />
                </>
              }
            />
            <Route
              path="/review"
              element={
                <>
                  {/* <NavigationBar /> */}
                  <Review />
                </>
              }
            />
            <Route
              path="/report"
              element={
                <>
                  {/* <NavigationBar /> */}
                  <Report />
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
            <Route
              path="/wait"
              element={
                <>
                  <WaitingPage />
                </>
              }
            />
            {/* Labour pages */}
            <Route
              path="/labour/home"
              element={
                <>
                  <NavigationBarLabour/>
                  <LabourHome />
                  <Footer />
                </>
              }
            />
            <Route
              path="/labour/newappointments"
              element={
                <>
                  <NavigationBarLabour/>
                  <NewAppointments />
                  <Footer />
                </>
              }
            />
            <Route
              path="/labour/profile"
              element={
                <>
                  <NavigationBarLabour />
                  <LabourProfile />
                  <Footer />
                </>
              }
            />
            <Route path="/update-account-labour" element={<UpdateLabourAccount />} />
            <Route
              path="/labour-pefermance"
              element={
                <>
                  <LabourPerfomance />
                  <Footer />
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
