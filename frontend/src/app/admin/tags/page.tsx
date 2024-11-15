"use client"
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const TagManagementPage = () => {
    const [tags, setTags] = useState([
        { id: 1, name: 'Développement' },
        { id: 2, name: 'Design' }
      ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTag, setNewTag] = useState({ name: '' });

  useEffect(() => {
    // Fetch the list of tags from the server
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  const handleCreateTag = () => {
    setShowCreateModal(true);
  };

  const handleEditTag = (tag) => {
    setSelectedTag(tag);
    setNewTag(tag); // Populate fields with the selected tag data
    setShowEditModal(true);
  };

  const handleDeleteTag = (tag) => {
    setSelectedTag(tag);
    setShowDeleteModal(true);
  };

  const handleSaveTag = async () => {
    try {
      await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTag),
      });
      setShowCreateModal(false);
      // Refetch the list of tags
      fetchTags();
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  const handleUpdateTag = async () => {
    try {
      await fetch(`/api/tags/${selectedTag.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTag),
      });
      setShowEditModal(false);
      // Refetch the list of tags
      fetchTags();
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  const handleDeleteTagRequest = async () => {
    try {
      await fetch(`/api/tags/${selectedTag.id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      // Refetch the list of tags
      fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <div className="p-8 border shadow-md rounded-lg bg-white dark:bg-gray-800">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Mots Clés (Tags)</h1>
          <button 
            onClick={handleCreateTag} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Ajouter un mot clé
          </button>
        </div>
        <table className="w-full border-collapse dark:text-white">
          <thead>
            <tr>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Nom</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">{tag.name}</td>
                <td className="p-2 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTag(tag)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                    >
                      <FiEdit2 className="mr-2" /> Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteTag(tag)}
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

      {/* Create Tag Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau mot clé</h2>
            <input
              type="text"
              placeholder="Nom du mot clé"
              value={newTag.name}
              onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowCreateModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleSaveTag} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tag Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Modifier le mot clé</h2>
            <input
              type="text"
              placeholder="Nom du mot clé"
              value={newTag.name}
              onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowEditModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleUpdateTag} className="py-2 px-4 bg-yellow-500 text-white rounded-lg">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Tag Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Supprimer ce mot clé</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce mot clé ?</p>
            <div className="flex justify-between">
              <button onClick={() => setShowDeleteModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleDeleteTagRequest} className="py-2 px-4 bg-red-600 text-white rounded-lg">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagManagementPage;
