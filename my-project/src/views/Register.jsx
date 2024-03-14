
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import React, { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link, redirect} from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      // Create user in Firebase authentication
      const authUser = await createUserWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", authUser.user.uid);

      // Store user data in Firestore
      await setDoc(doc(db, "users", authUser.user.uid), {
        _id: authUser.user.uid,
        name,
        email,
        role: 0,
        address: "",
        city: "",
        state: "",
        pincode: "",
        latitude: null,
        longitude: null,
        profilepic: "/user.png",
        dob: "",
        phone: "",
      });

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");

      redirect("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen bg-red-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-gray-600">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
          />

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
