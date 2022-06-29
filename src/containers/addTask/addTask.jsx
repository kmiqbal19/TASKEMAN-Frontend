import React, { useEffect, useState } from "react";
import "./addTask.scss";
import { BiImageAdd } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { createTask, reset } from "../../features/task/taskSlice";
import { toast } from "react-toastify";
import addImage from "../../assets/add-img.png";
import { motion } from "framer-motion";
function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const store = useSelector((store) => store.tasks);
  const { isLoading, isError, isSuccess } = store;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isError);
    if (isError) {
      toast.error("⚠️ Something went wrong!");
      setSuccess(false);
    }
    if (success) {
      toast.dark("✨💖 Your task has been added. 🎉");
      setTimeout(() => {
        window.location.replace("/tasks");
      }, 1500);
    }
    return () => {
      dispatch(reset());
      setSuccess(false);
    };
  }, [dispatch, isError, isSuccess, success]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("photo", file);
    dispatch(createTask(data));
    setTimeout(() => {
      setSuccess(true);
    }, 500);
  };
  return (
    <motion.div
      exit={{ x: "100vw" }}
      transition={{ ease: "easeOut" }}
      className="app__add-task"
    >
      {file && file.type.startsWith("image") ? (
        <img src={URL.createObjectURL(file)} alt="task-img" />
      ) : (
        <img src={addImage} alt="add-img-task" />
      )}
      <motion.form
        animate={{ y: [100, 0], opacity: [0, 1] }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="add-task__file">
          <BiImageAdd /> Click to add an image...
        </label>
        <input
          id="add-task__file"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label>Add task title:</label>
        <input
          type="text"
          placeholder="Add your task title here.."
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Add task description:</label>
        <textarea
          type="text"
          placeholder="Add your task description here.."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          disabled={isLoading || !title || !description || success}
          type="submit"
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </motion.form>
    </motion.div>
  );
}

export default AddTask;
