import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [_id, setId] = useState();

  useEffect(() => {
    console.log(token, role, username, email, _id, loggedIn);
  }, [loggedIn]);
  const all = {
    token: [token, setToken],
    role: [role, setRole],
    loggedIn: [loggedIn, setLoggedIn],
    username: [username, setUsername],
    email: [email, setEmail],
    _id: [_id, setId],
  };

  return (
    <AuthContext.Provider value={{ all }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
