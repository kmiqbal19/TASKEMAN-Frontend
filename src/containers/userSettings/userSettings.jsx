import React, { useEffect, useState } from "react";
import "./userSettings.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, resetUser } from "../../features/auth/authSlice.js";
function UserSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const store = useSelector((store) => store.auth);
  const user = store.userData.user;
  const { isLoading, isSuccess, isError } = store;
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
    window.location.reload();
  };
  return (
    <div className="app__user-settings">
      <div className="user-settings__img">
        <img
          src="https://i.ibb.co/vvZs571/Pngtree-image-upload-icon-photo-upload-5279794.png"
          alt="user-setting-img"
        />
      </div>
      <form onSubmit={handleSubmit} className="user-settings__wrapper">
        <img
          src={
            file && file.type.startsWith("image")
              ? URL.createObjectURL(file)
              : `http://localhost:5000/users/${user.photo}`
          }
          alt="user-img"
        />
        <label htmlFor="user-img-add">Add user image </label>
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
      </form>
    </div>
  );
}

export default UserSettings;
