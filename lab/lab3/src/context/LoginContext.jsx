import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  // LẤY GIÁ TRỊ TỪ localStorage KHI APP KHỞI ĐỘNG
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isLoggedIn");
    return saved === "true"; // chuyển string -> boolean
  });

  // MỖI KHI isLoggedIn THAY ĐỔI → LƯU LẠI VÀO localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
