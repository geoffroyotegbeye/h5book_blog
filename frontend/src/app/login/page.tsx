// frontend\src\app\login\page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      if (data.error) {
        toast.error(data.message);
      } else {
        // Store tokens in cookies
        Cookies.set('accessToken', data.accessToken, { secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', data.refreshToken, { secure: true, sameSite: 'strict' });
        Cookies.set('user', JSON.stringify(data.user), { secure: true, sameSite: 'strict' });

        toast.success(data.message);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <ToastContainer />
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Se connexion
        </h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700
                     transition-colors duration-200 mb-4 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Connexion
        </button>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Pas encore inscrit?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            S'inscrire ici
          </Link>
        </p>
      </div>
    </div>
  );
}
