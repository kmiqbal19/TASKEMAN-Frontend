import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create new task
export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, thunkAPI) => {
    const token = thunkAPI.getState().auth.userData.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("/tasks", taskData, config);
      return response.data.data.task;
    } catch (err) {
      const message = err.response.data.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
