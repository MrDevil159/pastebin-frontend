import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import "./App.css";

import { AuthContext } from "./context/AuthProvider";

import Login from "./component/AuthPage/Login";
import Register from "./component/AuthPage/Register";
import UserHome from "./component/User/UserHome";
import NewPaste from "./component/Action/New-Paste";
import ReadPaste from "./component/Pastes/ReadPaste";

function App() {
  const { all } = useContext(AuthContext);
  useEffect(() => {
    all.checkToken();
  }, []);
  if (all.loggedIn[0] === false) {
    return (
      <Routes>
        <Route index path="/" element={<Login />}></Route>
        <Route path="Register" element={<Register />}></Route>
        <Route path="ReadPaste/:id" element={<ReadPaste />}></Route>
      </Routes>
    );
  } else if (all.loggedIn[0] === true) {
    if (all.role[0] == "USER") {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<UserHome />}></Route>
            <Route path="NewPaste" element={<NewPaste />}></Route>
            <Route path="ReadPaste/:id" element={<ReadPaste />}></Route>
          </Route>
        </Routes>
      );
    }
  }
}

export default App;
