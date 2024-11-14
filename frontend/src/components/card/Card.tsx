// components/ui/card/Card.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageSquare, Bookmark, Share2 } from 'lucide-react';

interface CardProps {
  article: {
    title: string;
    author: string;
    time: string;
    image: string;
    summary: string;
    category: string;
    likes: number;
    comments: number;
  };
}

const Card: React.FC<CardProps> = ({ article }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 hover:shadow-lg transition-shadow">
      <div className="border-b pb-4 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Par {article.author}</span>
              <span>•</span>
              <span>{article.time}</span>
            </div>
          </div>
          <Image
            className="h-20 w-20 rounded ml-4"
            src={article.image}
            alt={article.title}
            width={80}
            height={80}
          />
        </div>
      </div>
      
      <div className="text-gray-700">
        <p className="text-gray-600">{article.summary}</p>
        <button className="border border-blue-600 text-blue-600 hover:bg-blue-100 px-2 py-1 text-sm mt-2 rounded">
          {article.category}
        </button>
      </div>

      <div className="flex justify-between border-t pt-4 mt-4">
        <div className="flex gap-4">
          <button
            className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
              liked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className="h-4 w-4 mr-1" />
            {article.likes + (liked ? 1 : 0)}
          </button>
          <button className="inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
            <MessageSquare className="h-4 w-4 mr-1" />
            {article.comments}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
              bookmarked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
