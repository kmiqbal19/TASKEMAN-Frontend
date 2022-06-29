import React, { useEffect, useState } from "react";
import "./addTask.scss";
import { BiImageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import addImage from "../../assets/add-img.png";
import { motion } from "framer-motion";
import axiosInstance from "../../axiosConfig";
import Spinner from "../../components/spinner/spinner.js";
function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const userData = useSelector((store) => store.auth.userData);

  useEffect(() => {
    if (error) {
      toast.error("⚠️🥵 Something went wrong!");
    } else if (success) {
      toast.dark("✨🎉 Your task has been added!");
      setTimeout(() => {
        window.location.replace("/tasks");
      }, 1500);
    }

    return () => {
      setSuccess(false);
      setLoading(false);
      setError(false);
    };
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if (file) {
      data.append("photo", file);
    }
    // dispatch(createTask(data));
    const token = userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axiosInstance.post("/tasks", data, config);
      if (res) {
        setLoading(false);
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
      setSuccess(false);
    }
  };
  return (
    <motion.div
      exit={{ x: "100vw" }}
      transition={{ ease: "easeOut" }}
      className="app__add-task"
    >
      {loading && <Spinner />}
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
          disabled={loading || !title || !description || success}
          type="submit"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </motion.form>
    </motion.div>
  );
}

export default AddTask;
