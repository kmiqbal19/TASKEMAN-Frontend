import React, { useState, useEffect } from "react";
import "./singlePageTask.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import axios from "axios";
import axiosInstance from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAddPhotoAlternate } from "react-icons/md";
import defaultPic from "../../assets/add-img.png";
import Spinner from "../../components/spinner/spinner";

function SinglePageTask() {
  const [task, setTask] = useState({});
  const [shouldFetch, setShouldFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const token = useSelector((store) => store.auth.userData.token);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axiosInstance.get(`/tasks/${path}`, config);
        setTask(res.data.data.task);
        setTitle(res.data.data.task.taskTitle);
        setDescription(res.data.data.task.taskDescription);
      } catch (err) {
        console.log(err);
        // toast.error("⚠️ Couldn't find the task");
      }
    };
    if (shouldFetch) {
      fetchTask();
    }
    return () => {
      setTask({});
      setShouldFetch(false);
    };
  }, [path, shouldFetch, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("taskTitle", title);
    data.append("taskDescription", description);
    if (file) {
      data.append("photo", file);
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axiosInstance.patch(`/tasks/${path}`, data, config);
      if (res) {
        setTask(res.data.data.task);
        setUpdateMode(false);
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! ⚠️");
    }
  };
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axiosInstance.delete(`/tasks/${path}`, config);

      toast.error("🚮 Item has been deleted!");
      setTimeout(() => {
        window.location.replace("/tasks");
      }, 1500);
    } catch (error) {
      toast.error("⚠️ Couldn't delete.Something went wrong!");
    }
  };
  const handleImageClick = (e) => {
    e.target.classList.toggle("containImg");
    console.log(e.target.classList);
  };
  return (
    <div className="app__single-task">
      {loading && <Spinner />}
      {!task.photo && <img src={defaultPic} alt="default-pic" />}
      {!updateMode && task.photo && (
        <img onClick={handleImageClick} src={task.photo} alt="task-img" />
      )}
      {updateMode && !file && task.photo && (
        <img onClick={handleImageClick} src={task.photo} alt="task-img" />
      )}
      {updateMode && file && file.type.startsWith("image") && (
        <img
          onClick={handleImageClick}
          src={URL.createObjectURL(file)}
          alt="task-img"
        />
      )}
      {updateMode && file && !file.type.startsWith("image") && (
        <h1>⚠️ Please upload image only! It will cause an error...</h1>
      )}
      <form onSubmit={handleSubmit} className="single-task__description">
        <div className="single-task__description--edit-icons">
          <span onClick={() => setUpdateMode(true)}>
            <FiEdit /> Edit
          </span>
          <span onClick={handleDelete}>
            <AiOutlineDelete /> Delete
          </span>
        </div>
        {updateMode && (
          <>
            <label htmlFor="file-update">
              <MdAddPhotoAlternate />
              Click here to add photo...
            </label>
            <input
              id="file-update"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </>
        )}
        <p>Created On: </p>
        <p>{new Date(task.createdAt).toLocaleString("en-US")}</p>
        <p>Task Title: </p>
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <p style={{ textTransform: "uppercase" }}>{task.taskTitle}</p>
        )}
        <p>Task Description: </p>
        {updateMode ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p>{task.taskDescription}</p>
        )}
        {updateMode && (
          <div className="single-task__description--buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button onClick={() => setUpdateMode(false)}>Cancel</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SinglePageTask;
