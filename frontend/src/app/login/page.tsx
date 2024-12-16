"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("token", (await response.json()).access_token);
      router.push("/"); 
    } catch (error) {
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Login
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700
                     transition-colors duration-200 mb-4 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link 
            href="/register" 
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}