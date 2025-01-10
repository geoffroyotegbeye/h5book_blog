// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import ArticleCard from '@/components/card/ArticleCard';
import RightSidebar from '@/components/layout/RightSidebar';
import { Article, CommentType, ReplyType } from '@/types';
import ArticleModal from '@/components/posts/ArticleModal';
import axios from 'axios';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [articleStates, setArticleStates] = useState<Record<string, { liked: boolean; bookmarked: boolean; favorited: boolean }>>({});

  // État et fonctions pour gérer les commentaires
  const [comments, setComments] = useState<CommentType[]>([]);

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: "Utilisateur",
      content: content,
      time: "À l'instant",
      replies: [] as ReplyType[]
    };
    setComments([...comments, newComment]);
  };

  const handleAddReply = (commentId: string, content: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now().toString(),
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

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  // Gestionnaires d'événements pour l'article modal
  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setModalIsOpen(true);
  };

  const handleCloseArticle = () => {
    setModalIsOpen(false);
    setSelectedArticle(null);
  };

  const handleLike = (articleId: string) => {
    setArticleStates(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        liked: !prev[articleId]?.liked
      }
    }));
  };

  const handleBookmark = (articleId: string) => {
    setArticleStates(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        bookmarked: !prev[articleId]?.bookmarked
      }
    }));
  };

  const handleFavorite = (articleId: string) => {
    setArticleStates(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        favorited: !prev[articleId]?.favorited
      }
    }));
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/articles');
        const data = response.data;

        if (data.error) {
          console.error(data.message);
        } else {
          setArticles(data.data);
          setArticleStates(data.data.reduce((acc, article) => ({
            ...acc,
            [article.uuid]: { liked: false, bookmarked: false, favorited: article.favorite }
          }), {}));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-9 gap-6">
          {/* Main Content - Feed d'articles */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div className='w-fit'>
              {articles.length > 0 ? (
                articles.map(article => (
                  <div key={article.uuid}>
                    <ArticleCard
                      article={article}
                      liked={articleStates[article.uuid]?.liked}
                      bookmarked={articleStates[article.uuid]?.bookmarked}
                      favorited={articleStates[article.uuid]?.favorited}
                      onLike={(e) => {
                        e.stopPropagation();
                        handleLike(article.uuid);
                      }}
                      onBookmark={(e) => {
                        e.stopPropagation();
                        handleBookmark(article.uuid);
                      }}
                      onFavorite={(e) => {
                        e.stopPropagation();
                        handleFavorite(article.uuid);
                      }}
                      onOpenArticle={handleOpenArticle}
                    />
                  </div>
                ))
              ) : (
                <p>Il n'y a pas d'articles disponibles.</p>
              )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-3 sticky top-20">
            <RightSidebar />
          </div>
        </div>
      </main>

      <ArticleModal
        article={selectedArticle!}
        isOpen={modalIsOpen}
        onClose={handleCloseArticle}
        comments={comments}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
        onDeleteComment={handleDeleteComment}
        liked={selectedArticle ? articleStates[selectedArticle.uuid]?.liked : false}
        onLike={() => selectedArticle && handleLike(selectedArticle.uuid)}
        bookmarked={selectedArticle ? articleStates[selectedArticle.uuid]?.bookmarked : false}
        onBookmark={() => selectedArticle && handleBookmark(selectedArticle.uuid)}
        favorited={selectedArticle ? articleStates[selectedArticle.uuid]?.favorited : false}
        onFavorite={() => selectedArticle && handleFavorite(selectedArticle.uuid)}
      />
    </div>
  );
};

export default Home;
