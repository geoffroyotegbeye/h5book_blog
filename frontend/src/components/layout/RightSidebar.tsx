// src/components/layout/RightSidebar.tsx
"use client";
import { AiFillFire, AiOutlineCode, AiOutlineMobile, AiOutlineRobot, AiOutlineCloud } from 'react-icons/ai';
import { useState } from 'react';

const categories = [
  { id: 1, label: 'Tendances', icon: AiFillFire },
  { id: 2, label: 'Développement Web', icon: AiOutlineCode },
  { id: 3, label: 'Mobile', icon: AiOutlineMobile },
  { id: 4, label: 'Intelligence Artificielle', icon: AiOutlineRobot },
  { id: 5, label: 'Cloud', icon: AiOutlineCloud },
];

const formations = [
  { id: 1, title: 'Formation DevOps - Maîtrisez Docker et Kubernetes' },
  { id: 2, title: "Introduction à l'Intelligence Artificielle" },
  { id: 3, title: 'Développement Mobile avec React Native' },
];

export default function RightSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tendances');

  return (
    <aside className="p-4 bg-white shadow-md rounded-lg space-y-6 sticky top-24">
      <div>
        <h2 className="text-lg font-semibold mb-4">Explorer</h2>
        <div className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.label)}
                className={`flex items-center gap-3 p-2 rounded-lg transition-color w-full ${
                  selectedCategory === category.label ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Formations</h2>
        <div className="space-y-2">
          {formations.map((formation) => (
            <div
              key={formation.id}
              className="p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
            >
              <h3 className="text-sm font-medium">{formation.title}</h3>
            </div>
          ))}
          <button className="w-full text-blue-600 text-sm font-medium mt-2 hover:underline">Voir plus</button>
        </div>
      </div>
    </aside>
  );
}
