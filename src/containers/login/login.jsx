import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Spinner from "../../components/spinner/spinner";
function LogIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((store) => store.auth);
  useEffect(() => {
    if (isError) {
      toast.error("Wrong Data! ⚠️");
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password,
      })
    );
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <motion.div
      exit={{ x: "-100vw" }}
      transition={{ ease: "easeOut" }}
      className="app__login"
    >
      {isLoading && <Spinner />}
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password..."
        />
        <button
          type="submit"
          disabled={isLoading || isError || !email || !password}
        >
          {isLoading ? "Logging..." : "Log In"}
        </button>
        {isError && (
          <p style={{ color: "red", margin: "1rem 0.5rem" }}>
            Wrong Credentials!
          </p>
        )}
        <p style={{ marginTop: "1rem" }}>
          Don't have account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </motion.div>
  );
}

export default LogIn;
