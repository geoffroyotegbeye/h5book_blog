"use client"
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const BlogManagementPage = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([
    {
      id: "azertyuiop",
      title: "Les nouveautés de React 19 expliquées simplement",
      author: "Jean Dupont",
      source: "DevActu.fr",
      category: "Développement Web",
      tags: ["React", "JavaScript", "Frontend", "Web Dev"],
      summary: "Découvrez les nouvelles fonctionnalités qui vont révolutionner le développement React, avec des exemples pratiques et des conseils pour tirer parti de cette nouvelle version.",
      content: `React 19 apporte des améliorations significatives en termes de performance et de fonctionnalités. Parmi les nouveautés, nous retrouvons le rendu concurrentiel, des hooks améliorés et une gestion d'état plus performante. Ces mises à jour permettent aux développeurs de créer des applications plus réactives et fluides. Par exemple, le nouvel API Concurrent Mode permet un rendu en douceur des composants tout en évitant les blocages...`,
      likes: 42,
      comments: 12,
      time: "Il y a 2h",
      image: "https://cdn.leonardo.ai/users/75be81c6-02b9-4765-9902-3940da5d8f94/generations/825fa874-6cdc-4cdb-9a77-1d5f875a9a73/Leonardo_Phoenix_Description_A_darkened_scene_where_the_Deputy_0.jpg?w=512",
      favorite: true
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({ title: '', author: '', date: '', content: '' });
  
  useEffect(() => {
    // Fetch the list of articles from the server
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
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
      await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
      setShowCreateModal(false);
      // Refetch the list of articles
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleUpdateArticle = async () => {
    try {
      await fetch(`/api/articles/${selectedArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
      setShowEditModal(false);
      // Refetch the list of articles
      fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDeleteArticleRequest = async () => {
    try {
      await fetch(`/api/articles/${selectedArticle.id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      // Refetch the list of articles
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
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
              <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">{article.title}</td>
                <td className="p-2 border-b">{article.author}</td>
                <td className="p-2 border-b">{article.date}</td>
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
              type="date"
              value={newArticle.date}
              onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Contenu"
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
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
              type="date"
              value={newArticle.date}
              onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Contenu"
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
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
