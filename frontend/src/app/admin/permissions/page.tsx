"use client"
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const PermissionManagementPage = () => {
  const router = useRouter();
  const [permissions, setPermissions] = useState([
    {
      id: "permission123",
      name: "View Reports",
      description: "Allows the user to view reports",
      created_at: "2024-01-10",
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [newPermission, setNewPermission] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch the list of permissions from the server
    const fetchPermissions = async () => {
      try {
        const response = await fetch('/api/permissions');
        const data = await response.json();
        setPermissions(data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };
    fetchPermissions();
  }, []);

  const handleCreatePermission = () => {
    setShowCreateModal(true);
  };

  const handleEditPermission = (permission: React.SetStateAction<null> | React.SetStateAction<{ name: string; description: string; }>) => {
    setSelectedPermission(permission);
    setNewPermission(permission); // Populate fields with the selected permission data
    setShowEditModal(true);
  };

  const handleDeletePermission = (permission: React.SetStateAction<null>) => {
    setSelectedPermission(permission);
    setShowDeleteModal(true);
  };

  const handleSavePermission = async () => {
    try {
      await fetch('/api/permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPermission),
      });
      setShowCreateModal(false);
      // Refetch the list of permissions
      fetchPermissions();
    } catch (error) {
      console.error('Error saving permission:', error);
    }
  };

  const handleUpdatePermission = async () => {
    try {
      await fetch(`/api/permissions/${selectedPermission.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPermission),
      });
      setShowEditModal(false);
      // Refetch the list of permissions
      fetchPermissions();
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };

  const handleDeletePermissionRequest = async () => {
    try {
      await fetch(`/api/permissions/${selectedPermission.id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      // Refetch the list of permissions
      fetchPermissions();
    } catch (error) {
      console.error('Error deleting permission:', error);
    }
  };

  return (
    <div className="p-8 border shadow-md rounded-lg bg-white dark:bg-gray-800">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Permissions</h1>
          <button 
            onClick={handleCreatePermission} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Ajouter une permission
          </button>
        </div>
        <table className="w-full border-collapse dark:text-white">
          <thead>
            <tr>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Nom de la Permission</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Description</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Date de création</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">{permission.name}</td>
                <td className="p-2 border-b">{permission.description}</td>
                <td className="p-2 border-b">{permission.created_at}</td>
                <td className="p-2 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditPermission(permission)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                    >
                      <FiEdit2 className="mr-2" /> Modifier
                    </button>
                    <button
                      onClick={() => handleDeletePermission(permission)}
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

      {/* Create Permission Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle permission</h2>
            <input
              type="text"
              placeholder="Nom de la permission"
              value={newPermission.name}
              onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={newPermission.description}
              onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowCreateModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleSavePermission} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Permission Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Modifier la permission</h2>
            <input
              type="text"
              placeholder="Nom de la permission"
              value={newPermission.name}
              onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={newPermission.description}
              onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowEditModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleUpdatePermission} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Permission Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Supprimer la permission</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette permission ?</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleDeletePermissionRequest} className="py-2 px-4 bg-red-600 text-white rounded-lg">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionManagementPage;
