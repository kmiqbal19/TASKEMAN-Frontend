import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  task: null,
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
// Get all tasks
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.userData.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/tasks", config);
      return response.data.data.tasks;
    } catch (err) {
      const message = err.response.data.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Delete task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, thunkAPI) => {
    const token = thunkAPI.getState().auth.userData.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/tasks/${taskId}`, config);
      return response.data.deletedTaskId;
    } catch (err) {
      const message = err.response.data.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update task
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (taskUpdateData, thunkAPI) => {
    const token = thunkAPI.getState().auth.userData.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `/tasks/${taskUpdateData.taskId}`,
        taskUpdateData.updateData,
        config
      );
      return response.data.data.task;
    } catch (err) {
      const message = err.response.data.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.task = null;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter((task) => {
          return task._id !== action.payload;
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
