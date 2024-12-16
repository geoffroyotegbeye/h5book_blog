"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    username: "",
    createdAt: "",
    updatedAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      setUser(data);
      setEditedUser(data);
    } catch {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();
      setUser(data);
      setIsEditing(false);
    } catch (error) {
      alert("An error occurred while updating the profile.");
    }
  };

  const handleCancelEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  if (!user.name) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="border rounded px-4 py-2"
            />
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="border rounded px-4 py-2"
            />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.username}</p>
            <p className="text-gray-400">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-400">
              Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {isEditing ? (
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleSaveChanges}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
