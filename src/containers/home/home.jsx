import React from "react";
import Slider from "../../components/slider/slider";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      // delay: 1.5,
      duration: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};
function Home() {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.auth.userData);
  const user = userData?.user;
  return (
    <motion.div variants={containerVariants} exit="exit" className="app__home">
      <motion.h1
        animate={{ y: [-100, 0], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 1, delay: 0.3 }}
      >
        {user ? (
          <span>
            Hi{" "}
            <span style={{ color: "#4169e1" }}>{`${
              user.name.charAt(0).toUpperCase() + user.name.slice(1)
            }`}</span>{" "}
            ,{" "}
          </span>
        ) : (
          ""
        )}
        Welcome to TASKEMAN!
      </motion.h1>
      <motion.p
        animate={{ scale: [2, 1], opacity: [0, 1] }}
        transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
      >
        Now you will never forget your tasks! 😎
      </motion.p>
      <Slider />
      {user ? (
        <motion.p
          whileInView={{ opacity: [0, 1], y: [100, 0] }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="app__home-msg"
        >
          Go to your <span onClick={() => navigate("/tasks")}>Tasks</span>, and{" "}
          <span onClick={() => navigate("/add-task")}>Add</span> some tasks with
          photos and enjoy! 😉
        </motion.p>
      ) : (
        <motion.p
          whileInView={{ opacity: [0, 1], y: [100, 0] }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="app__home-msg"
        >
          So what are you waiting for!{" "}
          <span onClick={() => navigate("/login")}>Login</span> now!
        </motion.p>
      )}
      <footer>
        <p>
          &copy; 2022 All rights reserved. Developed by {">_~"}{" "}
          <a
            href="https://kmiqbal.com/"
            style={{
              color: "white",
              // fontSize: "1.1rem",
              letterSpacing: "1px",
              textShadow: "2px 2px 8px cyan",
            }}
          >
            Iqbal
          </a>
        </p>
      </footer>
    </motion.div>
  );
}

export default Home;
