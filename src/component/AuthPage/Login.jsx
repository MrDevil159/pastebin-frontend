import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const { all } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  useEffect(() => {
    if (all.checkToken()) {
      navigate("/");
    }
  }, []);
  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedData = JSON.parse(window.atob(base64));
    return decodedData;
  };

  const onSubmit = (data) => {
    RegisterHandle(data);
  };
  const RegisterHandle = async (logInData) => {
    if (logInData) {
      console.log("Login Process Initiated");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/auth/login`,
          logInData
        );
        const decodedTokenData = decodeToken(response.data.token);
        console.log(decodedTokenData);
        all.token[1](response.data.token);
        all.role[1](decodedTokenData.role);
        all.username[1](decodedTokenData.username);
        all.email[1](decodedTokenData.email);
        all._id[1](decodedTokenData._id);
        all.loggedIn[1](true);
        navigate("/");
      } catch (error) {
        console.error(error.response.data);

        toast.error(error.response.data.message);

        navigate("/");
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <ToastContainer theme="dark" />
      <form
        className="bg-dark text-white p-5 shadow-lg rounded"
        style={{ width: "400px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            required
            {...register("email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            {...register("password")}
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <span className="text-center">Don't have an account? </span>

          <Link to="/Register" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
