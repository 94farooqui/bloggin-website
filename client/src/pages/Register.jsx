import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SignupIcon from './../assets/signup.svg'



const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", formData);
      alert("Registration successful!");
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex w-[800px] h-[400px] border rounded-lg overflow-hidden shadow-md">
        <div className="flex-1 flex items-center justify-center bg-zinc-900 text-white w-full h-full">
          <img src={SignupIcon} className="w-72" />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold mx-8 mt-4">Register</h2>
          <form
            onSubmit={handleSubmit}
            className=" flex w-full flex-col items-center px-8 py-2 gap-4"
          >
            <input
              className="w-full p-2 border border-zinc-400 rounded-md"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              className="w-full p-2 border border-zinc-400 rounded-md"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              className="w-full p-2 border border-zinc-400 rounded-md"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full bg-zinc-900 text-zinc-100 p-2 rounded-md"
            >
              Register
            </button>
          </form>
          <div className="mx-8 mt-2 text-blue-300 hover:text-blue-500 group">
            <Link to="/login">
              <p>
                Already an account? <span className="group-hover:font-bold">Login</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
