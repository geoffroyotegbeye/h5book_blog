"use client";

import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const BlogManagementPage = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    author: '',
    source: '',
    category: '',
    summary: '',
    content: '',
    tags: [],
    time: '',
    image: '',
    favorite: false
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
          console.error("Token d'authentification manquant.");
          return;
        }

        const response = await axios.get('http://localhost:4000/articles', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;

        if (data.error) {
          console.error(data.message);
        } else {
          setArticles(data.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleCreateArticle = () => {
    setShowCreateModal(true);
  };

  const handleEditArticle = (article) => {
    setSelectedArticle(article);
    setNewArticle(article); // Populate fields with the selected article data
    setShowEditModal(true);
  };

  const handleDeleteArticle = (article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  };

  const handleSaveArticle = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        console.error("Token d'authentification manquant.");
        return;
      }

      await axios.post('http://localhost:4000/articles', newArticle, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setShowCreateModal(false);
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleUpdateArticle = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        console.error("Token d'authentification manquant.");
        return;
      }

      await axios.put(`http://localhost:4000/articles/${selectedArticle.uuid}`, newArticle, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setShowEditModal(false);
      fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDeleteArticleRequest = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        console.error("Token d'authentification manquant.");
        return;
      }

      await axios.delete(`http://localhost:4000/articles/${selectedArticle.uuid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setShowDeleteModal(false);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        console.error("Token d'authentification manquant.");
        return;
      }

      const response = await axios.get('http://localhost:4000/articles', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;

      if (data.error) {
        console.error(data.message);
      } else {
        setArticles(data.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  return (
    <div className="p-8 border shadow-md rounded-lg bg-white dark:bg-gray-800">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Articles du Blog</h1>
          <button
            onClick={handleCreateArticle}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Ajouter un article
          </button>
        </div>
        <table className="w-full border-collapse dark:text-white">
          <thead>
            <tr>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Titre</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Auteur</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Date</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.uuid} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">{article.title}</td>
                <td className="p-2 border-b">{article.author}</td>
                <td className="p-2 border-b">{article.time}</td>
                <td className="p-2 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditArticle(article)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                    >
                      <FiEdit2 className="mr-2" /> Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                    >
                      <FiTrash2 className="mr-2" /> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Article Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel article</h2>
            <input
              type="text"
              placeholder="Titre"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Auteur"
              value={newArticle.author}
              onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Source"
              value={newArticle.source}
              onChange={(e) => setNewArticle({ ...newArticle, source: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={newArticle.category}
              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Résumé"
              value={newArticle.summary}
              onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Contenu"
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Tags (séparés par des virgules)"
              value={newArticle.tags.join(', ')}
              onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="datetime-local"
              value={newArticle.time}
              onChange={(e) => setNewArticle({ ...newArticle, time: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newArticle.image}
              onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowCreateModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleSaveArticle} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Modifier l'article</h2>
            <input
              type="text"
              placeholder="Titre"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Auteur"
              value={newArticle.author}
              onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Source"
              value={newArticle.source}
              onChange={(e) => setNewArticle({ ...newArticle, source: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={newArticle.category}
              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Résumé"
              value={newArticle.summary}
              onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Contenu"
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Tags (séparés par des virgules)"
              value={newArticle.tags.join(', ')}
              onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="datetime-local"
              value={newArticle.time}
              onChange={(e) => setNewArticle({ ...newArticle, time: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newArticle.image}
              onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowEditModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleUpdateArticle} className="py-2 px-4 bg-yellow-500 text-white rounded-lg">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Article Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Supprimer cet article</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer cet article ?</p>
            <div className="flex justify-between">
              <button onClick={() => setShowDeleteModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleDeleteArticleRequest} className="py-2 px-4 bg-red-600 text-white rounded-lg">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagementPage;
