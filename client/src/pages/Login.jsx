import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import LoginIcon from "./../assets/login.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if(res.data.token){
        login(res.data.token);
         navigate("/");
      }
           
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex w-[800px] h-[400px] border rounded-lg overflow-hidden shadow-md">
        <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-zinc-700 to-zinc-900 text-white w-full h-full">
          <img src={LoginIcon} className="w-72" />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold mx-8 mt-8">Login</h2>
          <form
            onSubmit={handleSubmit}
            className=" flex w-full flex-col items-center px-8 py-2 gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-zinc-400 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-zinc-400 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-zinc-900 text-zinc-100 p-2 rounded-md"
            >
              Login
            </button>
          </form>
          <div className="mx-8 mt-4 text-blue-300 hover:text-blue-500">
            <Link to="/register">
              <p>Don't have an account? Register</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
