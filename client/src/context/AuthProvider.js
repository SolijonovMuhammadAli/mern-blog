import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("userData"))?.token || "");
  const navigate = useNavigate();

  const signIn = async (data) => {
    try {
      await axios
        .post("/api/auth/login", { ...data })
        .then((res) => {
          setUser(res.data);
          setToken(res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data));
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (data) => {
    try {
      await axios
        .post("/api/auth/register", { ...data })
        .then((res) => {
          console.log(res.data);
          navigate("/login");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return <AuthContext.Provider value={{ token, user, signUp, signIn, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
