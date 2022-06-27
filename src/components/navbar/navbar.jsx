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
function NavBar() {
  const userData = useSelector((store) => store.auth.userData);
  const user = userData ? userData.user : null;
  const username = user ? user.name.split(" ")[0] : "Username";
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
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
              <img
                src={`http://localhost:5000/users/${user.photo}`}
                alt="user"
              />
              <span>
                {username.charAt(0).toUpperCase() +
                  username.slice(1).toLowerCase()}
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
                      src="https://i.ibb.co/fQMrMN1/286386589-562588748572129-2361478305613804820-n.jpg"
                      alt="user"
                    />
                  </NavLink>
                  <span>User Name</span>
                  <NavLink to="/" onClick={() => setToggle(false)}>
                    Home
                  </NavLink>
                  <NavLink to="/tasks" onClick={() => setToggle(false)}>
                    Tasks
                  </NavLink>
                  <NavLink to="/" onClick={() => setToggle(false)}>
                    Add task
                  </NavLink>
                  <NavLink to="/" onClick={() => setToggle(false)}>
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
