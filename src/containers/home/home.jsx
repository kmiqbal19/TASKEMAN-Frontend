import React from "react";
import Slider from "../../components/slider/slider";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.auth.userData);
  const user = userData?.user;
  return (
    <div className="app__home">
      <h1>
        {user ? (
          <span>
            Hi{" "}
            <span style={{ color: "navy" }}>{`${
              user.name.charAt(0).toUpperCase() + user.name.slice(1)
            }`}</span>{" "}
            ,{" "}
          </span>
        ) : (
          ""
        )}
        Welcome to TASKEMAN!
      </h1>
      <p>Now you will never forget your tasks! 😎</p>
      <Slider />
      {user ? (
        <p className="app__home-msg">
          Go to your <span onClick={() => navigate("/tasks")}>Tasks</span>, and{" "}
          <span onClick={() => navigate("/add-task")}>Add</span> some tasks with
          photos and enjoy! 😉
        </p>
      ) : (
        <p className="app__home-msg">
          So what are you waiting for!{" "}
          <span onClick={() => navigate("/login")}>Login</span> now!
        </p>
      )}
      <footer>
        <p>
          &copy; 2022 All rights reserved. Developed by {">_"}{" "}
          <a href="www.kmiqbal.com">Iqbal</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
