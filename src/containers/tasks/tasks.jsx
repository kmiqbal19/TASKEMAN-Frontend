import React, { useState, useEffect } from "react";
import "./tasks.scss";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../features/task/taskSlice.js";
import Task from "../../components/task/task.jsx";
function Tasks() {
  const store = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <div className="app__tasks--container">
      {store.tasks.map((task, i) => {
        return <Task key={`task${i}`} task={task} />;
      })}
    </div>
  );
}

export default Tasks;
