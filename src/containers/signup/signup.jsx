import React, { useState } from "react";
import "./signup.scss";
import { signup } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((store) => store.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signup({
        name,
        email,
        password,
        passwordConfirm,
      })
    );
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <div className="app__signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name..."
        />
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
        {password.length > 1 && password.length < 8 && (
          <p style={{ color: "#f93b55" }}>
            Password must be atleast 8 characters!
          </p>
        )}
        <label>Confirm Password</label>
        <input
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Confirm your password..."
        />
        {passwordConfirm.length > 1 && password !== passwordConfirm && (
          <p style={{ color: "#f93b55" }}>Passwords are not equal!</p>
        )}
        <button
          type="submit"
          disabled={
            isLoading ||
            !name ||
            !email ||
            !password ||
            password.length < 8 ||
            password !== passwordConfirm ||
            !passwordConfirm
          }
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
