import React, { useEffect } from "react";
import "./tasks.scss";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../../features/task/taskSlice.js";
import Task from "../../components/task/task.jsx";
function Tasks() {
  const store = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
    return () => {
      dispatch(reset());
    };
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
