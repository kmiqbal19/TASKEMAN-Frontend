import React, { useState, useEffect } from "react";
import "./changePassword.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset, updatePassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import changePasswordImg from "../../assets/change-password.png";
import passImg from "../../assets/pass.png";
import { motion } from "framer-motion";
function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.dark("✨🎉Password changed successfully!🎉");
      toast("⚠️ Please login again!");
      setTimeout(() => {
        dispatch(logout());
        navigate("/");
      }, 2000);
    }
    if (isError) {
      toast.error("⚠️ Something went wrong!");
    }
    return () => {
      dispatch(reset);
    };
  }, [dispatch, isError, isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { currentPassword, password, passwordConfirm };
    dispatch(updatePassword(data));
  };
  return (
    <motion.div
      exit={{ x: "100vw" }}
      transition={{ ease: "easeInOut" }}
      className="app__change-password"
    >
      <div className="app__change-password--img">
        <img src={changePasswordImg} alt="change-password-img" />
      </div>
      <motion.form
        animate={{ x: [100, 0] }}
        transition={{ ease: "easeOut" }}
        onSubmit={handleSubmit}
      >
        <img src={passImg} alt="security-img" />
        <label>Current Password</label>
        <input
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <label>New Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        {password.length > 1 && password.length < 8 && (
          <p style={{ color: "red" }}>
            Password must be at least 8 characters!
          </p>
        )}
        <label>Confirm New Password</label>
        <input
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {password !== passwordConfirm && (
          <p style={{ color: "red" }}>Passwords are not equal!</p>
        )}
        <button
          type="submit"
          disabled={
            !password ||
            !passwordConfirm ||
            !currentPassword ||
            password !== passwordConfirm ||
            password.length < 8
          }
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </motion.form>
    </motion.div>
  );
}

export default ChangePassword;
