import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosLoginUser } from '../store/actions/UserAction';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const LoginHandler = (user) => {
    dispatch(AxiosLoginUser(user)).then((res) => {
      if (res) {
        navigate("/");
      } else {
        toast.error('User and password did not match');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-blue-200">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-500">
          Welcome Back 👋
        </h2>

        <form
          onSubmit={handleSubmit(LoginHandler)}
          className="flex flex-col gap-6"
        >
          <Toaster />
          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              {...register("Email")}
              type="email"
              placeholder="Enter your email"
              required
              className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm transition-all duration-200"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <input
              {...register("Password")}
              type="password"
              placeholder="Enter your password"
              required
              className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm transition-all duration-200"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-blue-500 text-white py-3 rounded-lg mt-4 font-medium hover:bg-blue-600 active:scale-95 transition-all duration-200 shadow-md"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
