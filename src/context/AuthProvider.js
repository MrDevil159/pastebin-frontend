import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value);
    document.cookie = `${name}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
  }

  function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(cookie.substring(cookieName.length));
      }
    }

    return "";
  }

  function handleLogout() {
    document.cookie = `pasteCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    checkToken();
    return true;
  }

  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [_id, setId] = useState();

  const checkToken = () => {
    const cookieData = getCookie("pasteCookie");
    if (cookieData) {
      const { token, role, username, email, _id } = JSON.parse(cookieData);
      setToken(token);
      setRole(role);
      setLoggedIn(true);
      setUsername(username);
      setEmail(email);
      setId(_id);
      return true;
    }
  };

  useEffect(() => {
    if (token != undefined) {
      setCookie(
        "pasteCookie",
        JSON.stringify({ token, role, username, email, _id }),
        1
      );
    }
  }, [token]);
  const all = {
    token: [token, setToken],
    role: [role, setRole],
    loggedIn: [loggedIn, setLoggedIn],
    username: [username, setUsername],
    email: [email, setEmail],
    _id: [_id, setId],
    checkToken: checkToken,
    handleLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ all }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
