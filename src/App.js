import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.jsx";
import LogIn from "./containers/login/login.jsx";
import SignUp from "./containers/signup/signup.jsx";
import Home from "./containers/home/home.jsx";
import { useSelector } from "react-redux";
function App() {
  const userData = useSelector((store) => store.auth.userData);
  const user = userData ? userData.user : null;
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <LogIn />} />
        <Route path="/signup" element={user ? <Home /> : <SignUp />} />
      </Routes>
    </>
  );
}

export default App;
