import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navbar/navbar.jsx";
import LogIn from "./containers/login/login.jsx";
import SignUp from "./containers/signup/signup.jsx";
import Home from "./containers/home/home.jsx";
import { useSelector } from "react-redux";
import UserSettings from "./containers/userSettings/userSettings.jsx";
import Tasks from "./containers/tasks/tasks.jsx";
import AddTask from "./containers/addTask/addTask.jsx";
import SinglePageTask from "./containers/singlePageTask/singlePageTask.jsx";
import ChangePassword from "./containers/changePassword/changePassword.jsx";
import { AnimatePresence } from "framer-motion";
function App() {
  const location = useLocation();

  const userData = useSelector((store) => store.auth.userData);
  const user = userData ? userData.user : null;
  return (
    <>
      <NavBar />
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <LogIn />} />
          <Route path="/signup" element={user ? <Home /> : <SignUp />} />
          <Route
            path="/user-settings"
            element={user ? <UserSettings /> : <LogIn />}
          />
          <Route
            path="/change-password"
            element={user ? <ChangePassword /> : <Home />}
          />
          <Route path="/tasks" element={user ? <Tasks /> : <Home />} />
          <Route
            path="/tasks/:id"
            element={user ? <SinglePageTask /> : <LogIn />}
          />
          <Route path="/add-task" element={user ? <AddTask /> : <LogIn />} />
        </Routes>
        <ToastContainer />
      </AnimatePresence>
    </>
  );
}

export default App;
