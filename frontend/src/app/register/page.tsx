"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      if (!response.ok) throw new Error("Failed to register");

      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      alert(error.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Register
        </h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <button
          onClick={handleRegister}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700
                     transition-colors duration-200 mb-4 dark:bg-green-700 dark:hover:bg-green-800"
        >
          Register
        </button>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}