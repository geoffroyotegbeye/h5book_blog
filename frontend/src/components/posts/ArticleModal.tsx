import React from 'react';
import Image from 'next/image';
import { FaBookmark, FaHeart, FaCommentAlt, FaShare, FaTimes } from 'react-icons/fa';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { Article, CommentType } from '@/types';

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
  comments: CommentType[];
  onAddComment: (content: string) => void;
  onAddReply: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  liked: boolean;
  onLike: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
}



const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose, comments, onAddComment, onAddReply, onDeleteComment, liked, onLike, bookmarked, onBookmark }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-white  max-w-4xl  shadow-2xl relative overflow-y-auto h-[55em] ">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Article content */}
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-medium">{article.author}</p>
                    <p className="text-sm">{article.time}</p>
                  </div>
                </div>
                <span>•</span>
                <span>{article.source}</span>
              </div>

              <div className="relative w-full h-64 mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Article full content */}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {article.summary}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                {/* Add more paragraphs as needed */}
              </div>

              {/* Article actions */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <div className="flex gap-4">
                  <button
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                      liked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={onLike}
                  >
                    <FaHeart />
                    <span>{article.likes + (liked ? 1 : 0)}</span>
                  </button>
                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    <FaCommentAlt />
                    <span>{comments.length}</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`p-2 rounded-lg ${
                      bookmarked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={onBookmark}
                  >
                    <FaBookmark />
                  </button>
                  <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Commentaires ({comments.length})</h2>
              <CommentForm onSubmit={onAddComment} />
              
              <div className="mt-6 space-y-6">
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={onAddReply}
                    onDelete={onDeleteComment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;