import "./Login.css";
import logo from "../../assets/images/logo.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom/dist";
import { AuthContext } from "../../contextApi/AuthContext";
import useFetch from "../../contextApi/useFetch";

import Modal from "react-modal";
import ForgotPass from "./forgotPassword/ForgotPass";

const customStylesForgotPass = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "20%",
    height: "35%",
    overflow: "hidden",
  },
};

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenForgotPass, setIsOpenForgotPass] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${credentials?.email}`
  );

  const toggleModalForgotPass = () => {
    setIsOpenForgotPass(!isOpenForgotPass);
  };

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(credentials);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  const handleLogin = async () => {
    setLoading(true);
    dispatch({ type: "LOGIN_START" });
    if (data?.userRole === "ROLE_ADMIN") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
          credentials
        );
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: credentials });
          setLoading(false);
          navigate("/", { replace: true });
        } else {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: { message: "You are not allowed!" },
          });
          setLoading(false);
          setErrorMessage("You are not allowed!");
        }
      } catch (err) {
        setLoading(false);
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "User not correct!" },
        });
        setErrorMessage("User not correct!");
      }
    } else {
      setLoading(false);
      setErrorMessage("You are not allowed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <p>Your ultimate relief for your dry skin.. glowing skin always in..</p>
        <h2>Beauty Avenue</h2>
      </div>
      <div className="login-right">
        <img className="login-logo" src={logo} />
        <h1>Hello Admin!</h1>
        <div>
          <section className="login-right-itemlist">
            <label>Email:</label>
            <input type="email" id="email" onChange={handleChangeLogin} />
          </section>
          <section className="login-right-itemlist">
            <label>Password:</label>
            <input type="password" id="password" onChange={handleChangeLogin} />
          </section>
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit" onClick={handleLogin}>
            {loading ? "Please wait...." : "Login"}
          </button>
        </div>
        <span style={{ cursor: "pointer" }} onClick={toggleModalForgotPass}>
          Forgot password?
        </span>
      </div>
      <Modal
        isOpen={isOpenForgotPass}
        onRequestClose={toggleModalForgotPass}
        contentLabel="My dialog"
        style={customStylesForgotPass}
      >
        <ForgotPass />
      </Modal>
    </div>
  );
};

export default Login;
