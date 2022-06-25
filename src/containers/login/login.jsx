import React, { useState } from "react";
import "./login.scss";
import { login } from "../../features/auth/authSlice.js";
import { useDispatch } from "react-redux";
function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email,
        password,
      })
    );
  };
  return (
    <div className="app__login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password..."
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
