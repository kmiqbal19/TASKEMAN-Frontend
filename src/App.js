import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, reset } from "./features/auth/authSlice";
import { createTask } from "./features/task/taskSlice";
function App() {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(reset());
  //   dispatch(login({ email: "mou@example.com", password: "12345678" }));
  //   // dispatch(logout());
  //   dispatch(createTask({ title: "new", description: "new desc" }));
  //   console.log(state);
  // }, []);
  return <div className="App">App</div>;
}

export default App;
