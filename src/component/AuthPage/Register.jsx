import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    RegisterHandle(data);
  };
  const RegisterHandle = async (regData) => {
    if (regData) {
      console.log("Register Process for: ", regData);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/auth/register`,
          regData
        );
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error(error.response.data);
        navigate("/Register");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="bg-dark text-white p-5 shadow-lg rounded"
        style={{ width: "400px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="username"
            {...register("username")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
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
            {...register("password")}
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <Link to="/" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
