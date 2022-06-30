import React, { useEffect } from "react";
import "./tasks.scss";
import Spinner from "../../components/spinner/spinner";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../../features/task/taskSlice.js";
import Task from "../../components/task/task.jsx";
import { ImSad } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function Tasks() {
  const store = useSelector((store) => store.tasks);
  const { isLoading } = store;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTasks());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <motion.div
      exit={{ x: "-100vw" }}
      transition={{ ease: "easeInOut" }}
      className="app__tasks--container"
    >
      {isLoading && <Spinner />}
      {!isLoading && store.tasks.length === 0 && (
        <div className="app__tasks-none">
          <ImSad />
          <p>
            You don't have any tasks. Add some by clicking{" "}
            <span
              onClick={() => navigate("/add-task")}
              style={{
                color: "navy",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              here
            </span>{" "}
            👈
          </p>
        </div>
      )}
      {store.tasks.map((task, i) => {
        return (
          <motion.div
            key={`frame-task${i}`}
            className="task-motion"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", delay: i * 0.5 }}
          >
            <Task key={task._id} task={task} />;
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default Tasks;
