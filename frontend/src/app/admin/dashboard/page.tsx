// app/admin/dashboard/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { FaUsers, FaBook, FaCommentAlt, FaThumbsUp, FaCog, FaHashtag } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import Link from 'next/link';

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
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Tableau de bord</h1>

      {/* Section des statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-blue-100 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaUsers size={30} className="text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Utilisateurs</h2>
              <p className="text-xl font-bold">{stats.users}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-green-100 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaBook size={30} className="text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Articles</h2>
              <p className="text-xl font-bold">{stats.posts}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaCommentAlt size={30} className="text-yellow-600" />
            <div>
              <h2 className="text-lg font-semibold">Commentaires</h2>
              <p className="text-xl font-bold">{stats.comments}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-purple-100 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaThumbsUp size={30} className="text-purple-600" />
            <div>
              <h2 className="text-lg font-semibold">Likes</h2>
              <p className="text-xl font-bold">{stats.likes}</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-orange-100 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <BiCategory size={30} className="text-orange-600" />
            <div>
              <h2 className="text-lg font-semibold">Catégories</h2>
              <p className="text-xl font-bold">{stats.categories}</p>
            </div>
          </div>
        </div>
         <div className="p-6 bg-teal-100 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <FaHashtag size={30} className="text-teal-600" />
            <div>
              <h2 className="text-lg font-semibold">Tags</h2>
              <p className="text-xl font-bold">{stats.tags}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
