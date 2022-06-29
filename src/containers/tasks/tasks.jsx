import React, { useEffect } from "react";
import "./tasks.scss";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../../features/task/taskSlice.js";
import Task from "../../components/task/task.jsx";
import { ImSad } from "react-icons/im";
import { useNavigate } from "react-router-dom";
function Tasks() {
  const store = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTasks());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <div className="app__tasks--container">
      {store.tasks.length === 0 && (
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
        return <Task key={`task${i}`} task={task} />;
      })}
    </div>
  );
}

export default Tasks;
