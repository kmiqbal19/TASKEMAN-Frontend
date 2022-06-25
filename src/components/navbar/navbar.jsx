import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { AiOutlineUserAdd, AiOutlineFileAdd } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import "./navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
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
        <Link to="/">
          <img src="https://i.ibb.co/ZHFdJhW/city.png" alt="nav-logo" />
        </Link>
      </div>
      {/* DESKTOP */}
      <ul className="app__nav--menubar">
        {user ? (
          <div className="app__nav--menubar-user">
            <Link to="/tasks">
              <BsListTask /> Tasks
            </Link>
            <Link to="/add-task">
              <AiOutlineFileAdd /> Add Task
            </Link>
            <li onClick={handleLogout}>
              <IoIosLogOut /> Log Out
            </li>
            <Link className="app__nav--menubar-user--link" to="user-settings">
              <img
                src={`http://localhost:5000/users/${user.photo}`}
                alt="user"
              />
              <span>
                {username.charAt(0).toUpperCase() +
                  username.slice(1).toLowerCase()}
              </span>
            </Link>
          </div>
        ) : (
          <>
            <Link className="app__nav--menubar-item" to="/login">
              <IoIosLogIn /> Login
            </Link>
            <Link className="app__nav--menubar-item" to="/signup">
              <AiOutlineUserAdd /> Sign Up
            </Link>
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
                  <Link to="user-settings" onClick={() => setToggle(false)}>
                    <img
                      src="https://i.ibb.co/fQMrMN1/286386589-562588748572129-2361478305613804820-n.jpg"
                      alt="user"
                    />
                  </Link>
                  <span>User Name</span>
                  <Link to="/" onClick={() => setToggle(false)}>
                    Home
                  </Link>
                  <Link to="/tasks" onClick={() => setToggle(false)}>
                    Tasks
                  </Link>
                  <Link to="/" onClick={() => setToggle(false)}>
                    Add task
                  </Link>
                  <Link to="/" onClick={() => setToggle(false)}>
                    Log Out
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/" onClick={() => setToggle(false)}>
                    Home
                  </Link>
                  <Link to="/login" onClick={() => setToggle(false)}>
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setToggle(false)}>
                    SignUp
                  </Link>
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
