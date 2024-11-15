"use client"
import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CommentManagementPage = () => {
  const router = useRouter();
  const [comments, setComments] = useState([
    {
      id: "comment123",
      content: "This is a comment on the article.",
      created_at: "2024-01-10",
      article_slug: "article-slug-example",
      article_title: "Example Article Title",
    }
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    // Fetch the list of comments from the server
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, []);

  const handleDeleteComment = (comment) => {
    setSelectedComment(comment);
    setShowDeleteModal(true);
  };

  const handleDeleteCommentRequest = async () => {
    try {
      await fetch(`/api/comments/${selectedComment.id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      // Refetch the list of comments
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="p-8 border shadow-md rounded-lg bg-white dark:bg-gray-800">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Commentaires</h1>
        </div>
        <table className="w-full border-collapse dark:text-white">
          <thead>
            <tr>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Article</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Commentaire</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Date de création</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">
                  <a href={`/article/${comment.article_slug}`} className="text-blue-600 hover:underline">{comment.article_title}</a>
                </td>
                <td className="p-2 border-b">{comment.content}</td>
                <td className="p-2 border-b">{comment.created_at}</td>
                <td className="p-2 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteComment(comment)}
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

      {/* Delete Comment Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Supprimer le commentaire</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce commentaire ?</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleDeleteCommentRequest} className="py-2 px-4 bg-red-600 text-white rounded-lg">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentManagementPage;
