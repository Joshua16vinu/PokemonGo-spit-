import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "./AuthContext"; // Import AuthContext hook

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign up successful!");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      login(email); // Update auth state globally
      navigate("/home");
    } catch (error) {
      console.error("Authentication error:", error);
      alert(isSignUp ? "Sign up failed." : "Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      login(googleUser.email); // Update auth state globally
      alert("Google Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Google Login error:", error.code, error.message);
      alert(`Google Login failed: ${error.message}`);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex w-full max-w-5xl shadow-lg rounded-lg">
        <div className="w-1/2 bg-gray-700 p-8 flex flex-col justify-center text-white">
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

        <div className="w-1/2 bg-gray-800 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">{isSignUp ? "Sign Up" : "Login"}</h2>
          
          {/* Google login button */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-white text-black font-semibold h-12 py-2 rounded-md mb-4 hover:bg-gray-200"
          >
            <FcGoogle className="text-2xl mr-2" />
            <span className="ml-2 text-lg font-medium text-black">Login with Google</span>
          </button>

          {/* Toggle between Sign Up and Login */}
          <p
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-center text-sm cursor-pointer text-blue-500 mt-2 hover:underline"
          >
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </p>

          <form onSubmit={handleLogin} className="space-y-6 mt-4">
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
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
