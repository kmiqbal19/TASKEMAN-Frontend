import React from "react";
import Slider from "../../components/slider/slider";
import "./home.scss";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="app__home">
      <h1>Welcome to TASKEMAN!</h1>
      <p>Now you will never forget your tasks! 😎</p>
      <Slider />
      <p className="app__home-msg">
        So what are you waiting for!{" "}
        <span onClick={() => navigate("/login")}>Login</span> now!
      </p>
      <footer></footer>
    </div>
  );
}

export default Home;
