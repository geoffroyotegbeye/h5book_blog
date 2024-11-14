// components/card/ArticleCard.tsx
"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaBookmark, FaHeart, FaCommentAlt, FaShare, FaBookOpen } from 'react-icons/fa';
import Comment from '../posts/Comment';
import CommentForm from '../posts/CommentForm';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  onOpenArticle: (article: Article) => void;
  liked: boolean;
  bookmarked: boolean;
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBookmark: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpenArticle, liked, bookmarked, onLike, onBookmark }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice Martin",
      content: "Super article ! Très instructif.",
      time: "Il y a 1h",
      replies: [
        {
          id: 2,
          author: "Bob Wilson",
          content: "Tout à fait d'accord avec toi Alice !",
          time: "Il y a 30min"
        }
      ]
    }
  ]);

  const handleAddComment = (content: any) => {
    const newComment = {
      id: comments.length + 1,
      author: "Utilisateur",
      content: content,
      time: "À l'instant",
      replies: []
    };
    setComments([...comments, newComment]);
  };

  const handleAddReply = (commentId: number, content: any) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: "Utilisateur",
              content: content,
              time: "À l'instant"
            }
          ]
        };
      }
      return comment;
    }));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 hover:shadow-lg transition-shadow">
      {/* Zone cliquable du titre et de l'image */}
      <div 
        className="border-b pb-4 mb-4 cursor-pointer group"
        onClick={() => onOpenArticle(article)}
      >
        <div className="flex items-start justify-between relative">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Par {article.author}</span>
              <span>•</span>
              <span>{article.time}</span>
            </div>
          </div>
          <Image
            className="rounded ml-4 object-cover"
            src={article.image}
            alt={article.title}
            width={80}
            height={80}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity rounded-lg"></div>
        </div>
      </div>

      <div className="text-gray-700">
        <p className="text-gray-600">{article.summary}</p>
        <div className="flex items-center gap-2 mt-2">
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-100 px-2 py-1 text-sm rounded">
            {article.category}
          </button>
          <button 
            onClick={() => onOpenArticle(article)}
            className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-100 px-3 py-1 text-sm rounded"
          >
            <FaBookOpen className="h-4 w-4" />
            Lire l'article
          </button>
        </div>
      </div>

      <div className="flex justify-between border-t pt-4 mt-4">
        <div className="flex gap-4">
          <button
            className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
              liked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onLike(e);
            }}
          >
            <FaHeart className="h-4 w-4 mr-1" />
            {article.likes + (liked ? 1 : 0)}
          </button>
          <button
            className="inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            onClick={() => setShowComments(!showComments)}
          >
            <FaCommentAlt className="h-4 w-4 mr-1" />
            {comments.length}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
              bookmarked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(e);
            }}
          >
            <FaBookmark className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
            <FaShare className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Section commentaires */}
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <CommentForm onSubmit={handleAddComment} />
          
          <div className="mt-6">
            {comments.map(comment => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleAddReply}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;