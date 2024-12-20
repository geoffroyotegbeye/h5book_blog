"use client";

import React, { useState, useEffect } from 'react';

type Message = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
};

const Discussion = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [author, setAuthor] = useState<string>('Anonyme');

  // Simuler la récupération des messages (exemple statique)
  useEffect(() => {
    setMessages([
      { id: 1, author: 'Alice', content: 'Salut tout le monde !', timestamp: '2024-11-14 10:00' },
      { id: 2, author: 'Bob', content: 'Hello Alice !', timestamp: '2024-11-14 10:05' },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newEntry: Message = {
      id: messages.length + 1,
      author,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newEntry]);
    setNewMessage('');
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4 text-black dark:text-white">Discussion</h1>

      {/* Liste des messages */}
      <div className="space-y-4 mb-6">
        {messages.map((message) => (
          <div key={message.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>{message.author}</strong> - {new Date(message.timestamp).toLocaleString()}
            </p>
            <p className="text-md text-black dark:text-white">{message.content}</p>
          </div>
        ))}
      </div>

      {/* Formulaire pour envoyer un nouveau message */}
      <div className="space-y-3">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Votre nom (facultatif)"
          className="w-full p-2 border rounded-md mb-2 bg-white dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
        />
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
          className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
          rows={3}
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default Discussion;
