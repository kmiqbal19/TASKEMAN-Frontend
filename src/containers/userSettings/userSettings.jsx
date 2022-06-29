import React, { useEffect, useState } from "react";
import "./userSettings.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice.js";
import { toast } from "react-toastify";
import { BiImageAdd } from "react-icons/bi";
import userSettings from "../../assets/user-settings.png";
import { motion } from "framer-motion";
function UserSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const store = useSelector((store) => store.auth);
  const user = store.userData.user;
  const { isLoading } = store;
  const dispatch = useDispatch();
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user.email, user.name]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    if (file) {
      data.append("photo", file);
    }

    dispatch(updateUser(data));
    toast.dark("✨ Your profile has been updated!");
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
  };
  return (
    <motion.div
      exit={{ x: "-100vw" }}
      transition={{ ease: "easeOut" }}
      className="app__user-settings"
    >
      <div className="user-settings__img">
        <img src={userSettings} alt="user-setting-img" />
      </div>
      <motion.form
        animate={{ x: [100, 0], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        onSubmit={handleSubmit}
        className="user-settings__wrapper"
      >
        <img
          src={
            file && file.type.startsWith("image")
              ? URL.createObjectURL(file)
              : `http://localhost:5000/users/${user.photo}`
          }
          alt="user-img"
        />
        <label className="user-settings__label-img" htmlFor="user-img-add">
          <BiImageAdd /> Add user image{" "}
        </label>
        <input
          id="user-img-add"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{isLoading ? "Updating..." : "Update"}</button>
        <Link to="/change-password" style={{ marginTop: "1rem" }}>
          Change password
        </Link>
      </motion.form>
    </motion.div>
  );
}

export default UserSettings;
