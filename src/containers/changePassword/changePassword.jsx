import React, { useState } from "react";
import "./changePassword.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useSelector((store) => store.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { currentPassword, password, passwordConfirm };
    dispatch(updatePassword(data));
    if (isSuccess) {
      toast("Password changed successfully!");
    }
  };
  return (
    <div className="app__change-password">
      <form onSubmit={handleSubmit}>
        <label>Current Password</label>
        <input
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <label>New Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label>Confirm New Password</label>
        <input
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <div className="app__change-password--img">
        <img src="" alt="change-password-img" />
      </div>
    </div>
  );
}

export default ChangePassword;
