// frontend/src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { signIn } from 'next-auth/react';

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      const data = response.data;

      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
    }
  };

  const handleGoogleSignIn = () => {
    // signIn('google');
  };

  const handleGitHubSignIn = () => {
    // signIn('github');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <ToastContainer />
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          S'inscrire
        </h1>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          onClick={handleRegister}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700
                     transition-colors duration-200 mb-4 dark:bg-green-700 dark:hover:bg-green-800"
        >
          Inscription
        </button>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
          >
            <FaGoogle className="mr-2" />
            Inscription avec Google
          </button>
          <button
            onClick={handleGitHubSignIn}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-200"
          >
            <FaGithub className="mr-2" />
            Inscription avec GitHub
          </button>
        </div>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Avez-vous déjà un compte?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Se connecter ici
          </Link>
        </p>
      </div>
    </div>
  );
}
