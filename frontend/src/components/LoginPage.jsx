import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc"; // Google logo icon
import Ballpit from "./Ballpit"; // Ensure this import is correct

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleEmail, setGoogleEmail] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userEmail", email);
        alert("Login successful!");
        navigate("/report");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/google");
      if (response.data.success) {
        setGoogleEmail(response.data.email);
        localStorage.setItem("userEmail", response.data.email);
        alert("Google Login successful!");
        navigate("/report");
      }
    } catch (error) {
      console.error("Google Login error:", error);
      alert("Google Login failed.");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Ballpit Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Ballpit count={120} gravity={0.9} friction={0.9975} wallBounce={0.95} followCursor={true} colors={["#0000FF", "#000000", "#FFFFFF"]} minSize={0.5}  />
      </div>

      {/* Login Form (Foreground) */}
      <div className="relative z-10 w-full max-w-5xl shadow-lg  backdrop-blur-4xl bg-gray-900 bg-opacity-10">
        <div className="flex">
          {/* Left Panel */}
          <div className="w-1/2 p-8 flex flex-col justify-center text-white">
            <h2 className="text-3xl font-bold mb-4 text-center">Welcome to PokemonGo!</h2>
            <p className="text-lg mb-4">
              Our system helps you report store issues quickly and efficiently.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Submit reports in seconds.</li>
              <li>Track the status of your issues.</li>
              <li>Enhance service quality for everyone.</li>
            </ul>
          </div>

          {/* Right Panel - Login Form */}
          <div className="w-1/2 bg-gray-800 p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full bg-white text-black font-semibold h-12 py-2 rounded-md mb-4 hover:bg-gray-200"
            >
              <FcGoogle className="text-2xl mr-2" />
              <span className="ml-2 text-lg font-medium text-black">Login with Google</span>
            </button>

            {googleEmail && <p className="text-center text-sm mt-2">Logged in as: {googleEmail}</p>}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Password:</label>
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
    </div>
  );
}

export default LoginPage;
