"use client";
import React, { useState, useEffect } from 'react';
import { FaUsers, FaBook, FaCommentAlt, FaThumbsUp, FaHashtag } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';

type Stats = {
  users: number;
  posts: number;
  comments: number;
  likes: number;
  categories: number;
  tags: number;
};

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    posts: 0,
    comments: 0,
    likes: 0,
    categories: 0,
    tags: 0,
  });

  useEffect(() => {
    // Simuler la récupération des statistiques (vous pouvez remplacer avec votre API)
    setStats({
      users: 120,
      posts: 150,
      comments: 310,
      likes: 450,
      categories: 5,
      tags: 25,
    });
  }, []);

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4 text-black dark:text-white">Tableau de bord</h1>

      {/* Section des statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaUsers size={30} className="text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Utilisateurs</h2>
              <p className="text-xl font-bold text-black dark:text-white">{stats.users}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaBook size={30} className="text-green-600 dark:text-green-400" />
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Articles</h2>
              <p className="text-xl font-bold text-black dark:text-white">{stats.posts}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaCommentAlt size={30} className="text-yellow-600 dark:text-yellow-400" />
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Commentaires</h2>
              <p className="text-xl font-bold text-black dark:text-white">{stats.comments}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-purple-100 dark:bg-purple-900 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaThumbsUp size={30} className="text-purple-600 dark:text-purple-400" />
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Likes</h2>
              <p className="text-xl font-bold text-black dark:text-white">{stats.likes}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-orange-100 dark:bg-orange-900 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <BiCategory size={30} className="text-orange-600 dark:text-orange-400" />
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Catégories</h2>
              <p className="text-xl font-bold text-black dark:text-white">{stats.categories}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-teal-100 dark:bg-teal-900 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaHashtag size={30} className="text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Tags</h2>
              <p className="text-xl font-bold text-black dark:text-white">{stats.tags}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
