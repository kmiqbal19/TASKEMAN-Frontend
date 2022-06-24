import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.jsx";
import LogIn from "./containers/login/login.jsx";
import SignUp from "./containers/signup/signup.jsx";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
