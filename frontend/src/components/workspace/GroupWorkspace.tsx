// components/GroupWorkspace.js
import { useState, useEffect } from 'react';
import { PlusCircle, Users } from 'lucide-react';

const GroupWorkspace = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  useEffect(() => {
    // Fetch existing groups from the server
    const fetchGroups = async () => {
      const response = await fetch('/api/groups');
      setGroups(await response.json());
    };
    fetchGroups();
  }, []);

  const createGroup = async () => {
    // Create a new group on the server
    const response = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newGroupName, description: newGroupDescription }),
    });
    const newGroup = await response.json();
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupDescription('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Groupes de travail</h3>
        <button className="flex items-center rounded-md bg-blue-600 text-white px-3 py-1 hover:bg-blue-700" onClick={createGroup}>
          <PlusCircle className="h-5 w-5 mr-2" />
          Nouveau groupe
        </button>
      </div>
      <div className="space-y-2">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-md shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">{group.name}</h4>
                <p className="text-gray-500">{group.description}</p>
              </div>
              <button className="flex items-center rounded-md bg-blue-600 text-white px-3 py-1 hover:bg-blue-700">
                <Users className="h-5 w-5 mr-2" />
                Rejoindre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupWorkspace;

