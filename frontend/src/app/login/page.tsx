// frontend/src/app/login/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useAuth } from "@/context/AuthContext";
// import { signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateAuthStatus } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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

        // Mettre à jour le contexte d'authentification
        await updateAuthStatus();

        toast.success("Connexion réussie !");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast.error(error.response?.data?.message || "Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // signIn('google');
  };

  const handleGitHubLogin = () => {
    // signIn('github');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <ToastContainer />
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Se connecter
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mb-6 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700
                     transition-colors duration-200 mb-4 dark:bg-blue-700 dark:hover:bg-blue-800
                     ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Connexion en cours...' : 'Connexion'}
          </button>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            >
              <FaGoogle className="mr-2" />
              Connexion avec Google
            </button>
            <button
              onClick={handleGitHubLogin}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-200"
            >
              <FaGithub className="mr-2" />
              Connexion avec GitHub
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Pas encore inscrit ?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            S'inscrire ici
          </Link>
        </p>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
          Mot de passe oublié ?{" "}
          <Link
            href="/reset-password"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Réinitialiser ici
          </Link>
        </p>
      </div>
    </div>
  );
}
