import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { AiOutlineUserAdd, AiOutlineFileAdd } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import "./navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import logo from "../../assets/TASKEMAN-logo.png";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
function NavBar() {
  const userData = useSelector((store) => store.auth.userData);
  const user = userData ? userData.user : null;
  // const username = user
  //   ? user.name.charAt(0).toUpperCase() + user.name.slice(1, 7)
  //   : "Username";
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    toast.dark("⚠️ You have been logged out! ");
    setToggle(false);
    // setTimeout(() => {
    //   window.location.replace("/");
    // }, 1200);
  };
  return (
    <nav className="app__nav">
      <div className="app__nav--logo">
        <NavLink to="/">
          <img src={logo} alt="nav-logo" />
        </NavLink>
      </div>
      {/* DESKTOP */}
      <ul className="app__nav--menubar">
        {user ? (
          <div className="app__nav--menubar-user">
            <NavLink
              to="/tasks"
              className={({ isActive }) => (isActive ? "activeNav" : undefined)}
            >
              <BsListTask /> Tasks
            </NavLink>
            <NavLink
              to="/add-task"
              className={({ isActive }) => (isActive ? "activeNav" : undefined)}
            >
              <AiOutlineFileAdd /> Add Task
            </NavLink>
            <li onClick={handleLogout}>
              <IoIosLogOut /> Log Out
            </li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "app__nav--menubar-user--link activeNav"
                  : "app__nav--menubar-user--link"
              }
              to="user-settings"
            >
              {user.photo ? (
                <img src={user.photo} alt="user" />
              ) : (
                <img src={defaultAvatar} alt="user" />
              )}
              <span>
                {user.name
                  ? user.name.charAt(0).toUpperCase() + user.name.slice(1, 7)
                  : "User"}
              </span>
            </NavLink>
          </div>
        ) : (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? "activeNav" : undefined)}
              to="/login"
            >
              <IoIosLogIn /> Login
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "activeNav" : undefined)}
              to="/signup"
            >
              <AiOutlineUserAdd /> Sign Up
            </NavLink>
          </>
        )}
      </ul>

      {/* MOBILE */}
      <div className="app__nav--hamburder">
        <RiMenu3Fill onClick={() => setToggle(true)} />
        {toggle && (
          <div className="hamburger__menu">
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {user ? (
                <div>
                  <NavLink to="user-settings" onClick={() => setToggle(false)}>
                    <img
                      src={user.photo ? user.photo : defaultAvatar}
                      alt="user"
                    />
                  </NavLink>
                  <span>{user.name ? user.name : "USER"}</span>
                  <NavLink to="/" onClick={() => setToggle(false)}>
                    Home
                  </NavLink>
                  <NavLink to="/tasks" onClick={() => setToggle(false)}>
                    Tasks
                  </NavLink>
                  <NavLink to="/add-task" onClick={() => setToggle(false)}>
                    Add task
                  </NavLink>
                  <NavLink to="/" onClick={handleLogout}>
                    Log Out
                  </NavLink>
                </div>
              ) : (
                <div>
                  <NavLink to="/" onClick={() => setToggle(false)}>
                    Home
                  </NavLink>
                  <NavLink to="/login" onClick={() => setToggle(false)}>
                    Login
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setToggle(false)}>
                    SignUp
                  </NavLink>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
