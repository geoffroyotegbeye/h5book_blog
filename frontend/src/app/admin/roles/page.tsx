"use client"
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const RoleManagementPage = () => {
  const router = useRouter();
  const [roles, setRoles] = useState([
    {
      id: "role123",
      name: "Admin",
      description: "Administrators with full access",
      created_at: "2024-01-10",
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch the list of roles from the server
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleCreateRole = () => {
    setShowCreateModal(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setNewRole(role); // Populate fields with the selected role data
    setShowEditModal(true);
  };

  const handleDeleteRole = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const handleSaveRole = async () => {
    try {
      await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });
      setShowCreateModal(false);
      // Refetch the list of roles
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleUpdateRole = async () => {
    try {
      await fetch(`/api/roles/${selectedRole.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });
      setShowEditModal(false);
      // Refetch the list of roles
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteRoleRequest = async () => {
    try {
      await fetch(`/api/roles/${selectedRole.id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      // Refetch the list of roles
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div className="p-8 border shadow-md rounded-lg bg-white dark:bg-gray-800">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Rôles</h1>
          <button 
            onClick={handleCreateRole} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Ajouter un rôle
          </button>
        </div>
        <table className="w-full border-collapse dark:text-white">
          <thead>
            <tr>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Nom du Rôle</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Description</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Date de création</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">{role.name}</td>
                <td className="p-2 border-b">{role.description}</td>
                <td className="p-2 border-b">{role.created_at}</td>
                <td className="p-2 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditRole(role)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                    >
                      <FiEdit2 className="mr-2" /> Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role)}
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

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau rôle</h2>
            <input
              type="text"
              placeholder="Nom du rôle"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowCreateModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleSaveRole} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Modifier le rôle</h2>
            <input
              type="text"
              placeholder="Nom du rôle"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowEditModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleUpdateRole} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Role Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Supprimer le rôle</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce rôle ?</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleDeleteRoleRequest} className="py-2 px-4 bg-red-600 text-white rounded-lg">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagementPage;
