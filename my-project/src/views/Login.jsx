import React, { useState } from "react";
import { Link} from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authUser = await signInWithEmailAndPassword(email, password);
      console.log("balle balle");
      console.log(authUser.user.uid);
      sessionStorage.setItem("user", authUser.user.uid);
      console.log("balle balle");
      console.log(sessionStorage.getItem("user"));
      Navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen bg-red-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />

          <label className="text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="bg-red text-white p-2 rounded hover:bg-blue-600 transition-all"
          >
            Login
          </button>
          <div className="text-red-500">{error}</div>
        </form>
        <div className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
