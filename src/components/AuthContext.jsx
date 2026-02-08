import { createContext, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("access")
  );

  const loginUser = async (username, password) => {
    const res = await axios.post("token/", {
      username,
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    setIsAuth(true);
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
