import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, reset } from "./features/auth/authSlice";
function App() {
  const state = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(reset());
    dispatch(login({ email: "mou@example.com", password: "12345678" }));
    // dispatch(logout());
    console.log(state);
  }, []);
  return <div className="App">App</div>;
}

export default App;
