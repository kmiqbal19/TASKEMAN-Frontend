import React, { useState } from "react";
import "./login.scss";
import { login } from "../../features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((store) => store.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email,
        password,
      })
    );
    if (isSuccess) window.location.replace("/");
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default LogIn;
