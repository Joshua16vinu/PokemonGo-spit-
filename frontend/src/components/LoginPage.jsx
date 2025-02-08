import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (response.data.success) {
        alert("Login successful!");
        navigate("/report"); // Redirect to report page
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="flex w-full max-w-5xl shadow-lg rounded-lg">
        
        {/* Left side - Info Section */}
        <div className="w-1/2 bg-gray-700 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-center">Welcome to PokemonGo!</h2>
          <p className="text-lg mb-4">
            Our system helps you report store issues quickly and efficiently. 
            With automatic location tracking, timestamps, and image uploads, 
            it's never been easier to keep things running smoothly.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Submit reports in seconds.</li>
            <li>Track the status of your issues.</li>
            <li>Enhance service quality for everyone.</li>
          </ul>
          <p className="text-center mt-6 text-sm text-gray-400">
            Join us to make store reporting easier and faster!
          </p>
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 bg-gray-800 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
