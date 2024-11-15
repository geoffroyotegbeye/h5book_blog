"use client"
import { useState } from 'react';
import { FaUser, FaEdit, FaSignOutAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    username: '@johndoe',
    joinedDate: 'June 2021',
    avatar: '',
    bio: 'I am a passionate web developer with experience in front-end and back-end technologies. I love solving complex problems and creating user-friendly applications.',
    socialLinks: {
      facebook: 'https://facebook.com',
      twitter: 'https://x.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden mr-6">
            <img src={editedUser.avatar || 'https://i.pinimg.com/736x/6a/f9/ca/6af9ca755d4d1850c97e89a38a288f24.jpg'} alt="Profile" className="w-full h-full object-cover" />
          </div>
          {isEditing ? (
            <div className='flex justify-between gap-5'>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="text-3xl font-bold text-gray-900 dark:text-white  dark:bg-gray-800 dark:border-gray-600 dark:border h-10 pl-5 rounded-md"
              />
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
                className="text-lg text-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:border h-10 pl-5 rounded-md"
              />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">{user.username}</p>
            </div>
          )}
        </div>
        <button
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit className="w-5 h-5" />
        </button>
      </div>

      {/* Bio */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">About Me</h2>
        {isEditing ? (
          <textarea
            name="bio"
            value={editedUser.bio}
            onChange={handleInputChange}
            className="mt-2 text-lg text-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:border overflow-y-auto h-32 pl-2 w-full rounded-md"
          />
        ) : (
          <p className="mt-2 text-gray-600 dark:text-gray-400">{user.bio}</p>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Connect with me</h2>
        <div className="mt-4">
          {isEditing ? (
            Object.keys(editedUser.socialLinks).map((platform) => (
              <div key={platform} className="flex items-center mb-2">
                <label htmlFor={platform} className="w-24 text-gray-800 dark:text-white">{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                <input
                  type="text"
                  name={`socialLinks.${platform}`}
                  value={editedUser.socialLinks[platform]}
                  onChange={handleInputChange}
                  className="text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:border h-10 pl-5 rounded-md"
                />
              </div>
            ))
          ) : (
            <div className="flex gap-4 mt-4">
              {Object.keys(user.socialLinks).map((platform) => (
                <a
                  key={platform}
                  href={user.socialLinks[platform]}
                  className={`hover:text-${platform === 'twitter' ? 'blue-500' : `${platform}-700`} dark:hover:text-${
                    platform === 'twitter' ? 'blue-400' : `${platform}-600`} transition`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform === 'twitter' ? (
                    <FaXTwitter className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  ) : platform === 'facebook' ? (
                    <FaFacebook className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  ) : platform === 'instagram' ? (
                    <FaInstagram className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  ) : platform === 'linkedin' ? (
                    <FaLinkedin className="w-6 h-6 text-blue-700 dark:text-blue-500" />
                  ) : (
                    <FaUser className="w-6 h-6" />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-between">
        {isEditing ? (
          <div className="space-x-4">
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={handleSaveChanges}
            >
              Enrégistrer modifications
            </button>
            <button
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              onClick={handleCancelEdit}
            >
              Annulé
            </button>
          </div>
        ) : (
          <div className="flex justify-between space-x-4">
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={() => setIsEditing(true)}
            >
              Editer Profil
            </button>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
              <FaSignOutAlt className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
