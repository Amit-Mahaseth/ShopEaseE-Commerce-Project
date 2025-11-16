import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { AxiosRegisterUser } from '../store/actions/UserAction';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const RegisterHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    dispatch(AxiosRegisterUser(user));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-blue-200">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-500">
          Create a New Account 🚀
        </h2>

        <form
          onSubmit={handleSubmit(RegisterHandler)}
          className="flex flex-col gap-5"
        >
          {/* Username */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Username
            </label>
            <input
              {...register("userName")}
              type="text"
              placeholder="Enter your username"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm transition-all duration-200"
            />
          </div>

          {/* Profile URL */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Profile URL
            </label>
            <input
              {...register("image")}
              type="url"
              placeholder="Paste your profile image URL"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Email
            </label>
            <input
              {...register("Email")}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Password
            </label>
            <input
              {...register("Password")}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm transition-all duration-200"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-blue-500 text-white py-3 rounded-lg mt-4 font-medium hover:bg-blue-600 active:scale-95 transition-all duration-200 shadow-md"
          >
            <i className="fa-solid fa-address-card"></i>
            Register
          </button>

          {/* Already have account */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
