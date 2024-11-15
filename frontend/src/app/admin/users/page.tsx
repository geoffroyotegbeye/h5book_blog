"use client"
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const UserManagementPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([
    {
      id: "user123",
      username: "johndoe",
      email: "johndoe@example.com",
      role: "Admin",
      status: "Active",
      created_at: "2024-01-15",
      avatar: "https://example.com/avatar.jpg"
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '', status: '', avatar: '' });

  useEffect(() => {
    // Fetch the list of users from the server
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setShowCreateModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser(user); // Populate fields with the selected user data
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveUser = async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      setShowCreateModal(false);
      // Refetch the list of users
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      setShowEditModal(false);
      // Refetch the list of users
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUserRequest = async () => {
    try {
      await fetch(`/api/users/${selectedUser.id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      // Refetch the list of users
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 border shadow-md rounded-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Utilisateurs</h1>
          <button 
            onClick={handleCreateUser} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Ajouter un utilisateur
          </button>
        </div>
        <table className="w-full border-collapse dark:text-white">
          <thead>
            <tr>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Nom d'utilisateur</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Email</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Rôle</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Statut</th>
              <th className="p-2 border-b bg-gray-200 dark:bg-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-2 border-b">{user.username}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.role}</td>
                <td className="p-2 border-b">{user.status}</td>
                <td className="p-2 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
                    >
                      <FiEdit2 className="mr-2" /> Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
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

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel utilisateur</h2>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Rôle"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Statut"
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowCreateModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleSaveUser} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Modifier l'utilisateur</h2>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Rôle"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Statut"
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowEditModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleUpdateUser} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Supprimer l'utilisateur</h2>
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="py-2 px-4 bg-gray-300 rounded-lg">
                Annuler
              </button>
              <button onClick={handleDeleteUserRequest} className="py-2 px-4 bg-red-600 text-white rounded-lg">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
