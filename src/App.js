import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  logout,
  reset,
  updatePassword,
  updateUser,
} from "./features/auth/authSlice";
import { createTask } from "./features/task/taskSlice";
function App() {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(reset());
    // dispatch(login({ email: "mou@example.com", password: "12345678" }));
    // dispatch(logout());
    // dispatch(createTask({ title: "new", description: "new desc" }));
    // dispatch(
    //   updateUser({ name: "mouUpdated1", email: "mouUpdated1@gmail.com" })
    // );
    dispatch(
      updatePassword({
        currentPassword: "12345678",
        password: "123456789",
        passwordConfirm: "123456789",
      })
    );
    console.log(state);
  }, []);
  return <div className="App">{state.auth.userData.user && "App"}</div>;
}

export default App;
