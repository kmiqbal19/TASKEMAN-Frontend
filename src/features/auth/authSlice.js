import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Get user from local storage
const userData = JSON.parse(localStorage.getItem("userData"));
const initialState = {
  userData: userData || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Sign Up User
export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", signupData);
      if (response.data) {
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      }
      return response.data.data;
    } catch (err) {
      const message = err.respose.data.message || err.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);
// Log In User
export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", loginData);
      if (response.data) {
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      }
      return response.data.data;
    } catch (err) {
      const message = err.respose.data.message || err.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);
// Log Out
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("userData");
});
// Update user
export const updateUser = createAsyncThunk(
  "user/Update",
  async (updateData, thunkAPI) => {
    const token = thunkAPI.getState().auth.userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        "/users/updateUserData",
        updateData,
        config
      );
      console.log(response);
      return response.data.data.user;
    } catch (err) {
      const message = err.response.data.message || err.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);
// Update Password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (updatePasswordData, thunkAPI) => {
    const token = thunkAPI.getState().auth.userData.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.patch(
        "/users/changePassword",
        updatePasswordData,
        config
      );
      console.log(response);
      return response.data.data;
    } catch (err) {
      const message = err.response.data.message || err.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

// Main Slice

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.userData = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.userData = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.user = action.payload;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
