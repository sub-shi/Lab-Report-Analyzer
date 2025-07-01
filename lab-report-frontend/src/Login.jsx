import React, { useState } from "react";
import { login } from "./Api";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");   // State for username input
  const [password, setPassword] = useState("");   // State for password input

  const handleLogin = async () => {                           // Function to handle login
    try {
      const token = await login(username, password);
      setToken(token);                                          // Set the token in the parent component
      localStorage.setItem("authToken", token);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
