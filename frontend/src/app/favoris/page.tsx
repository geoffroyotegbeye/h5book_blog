// app/favoris/page.tsx
"use client";

import ArticleModal from '@/components/posts/ArticleModal';
import { Article } from '@/types';
import { useState, useEffect } from 'react';
import { FaHeart, FaCommentAlt, FaStar, FaBookmark, FaShare, FaBookOpen } from 'react-icons/fa';

const articles: Article[] = [
  {
    id: "azertyuiop",
    title: "Les nouveautés de React 19 expliquées simplement",
    author: "Jean Dupont",
    source: "DevActu.fr",
    category: "Développement Web",
    tags: ["React", "JavaScript", "Frontend", "Web Dev"],
    summary: "Découvrez les nouvelles fonctionnalités qui vont révolutionner le développement React, avec des exemples pratiques et des conseils pour tirer parti de cette nouvelle version.",
    content: `React 19 apporte des améliorations significatives en termes de performance et de fonctionnalités...`,
    likes: 42,
    comments: 12,
    time: "Il y a 2h",
    image: "https://cdn.leonardo.ai/users/75be81c6-02b9-4765-9902-3940da5d8f94/generations/825fa874-6cdc-4cdb-9a77-1d5f875a9a73/Leonardo_Phoenix_Description_A_darkened_scene_where_the_Deputy_0.jpg?w=512"
  },
  {
    id: "azertyup",
    title: "Guide complet : Déploiement avec Docker",
    author: "Marie Martin",
    source: "DevActu.fr",
    category: "DevOps",
    tags: ["Docker", "DevOps", "CI/CD", "Containers"],
    summary: "Un tutoriel pas à pas pour maîtriser Docker dans vos projets...",
    content: `Docker est devenu un outil incontournable dans le développement moderne pour isoler les applications dans des conteneurs...`,
    likes: 38,
    comments: 8,
    time: "Il y a 5h",
    image: "https://cdn.leonardo.ai/users/83a0a692-8a58-450e-8f43-3630710f9e9a/generations/7193be61-f386-4cf8-a987-6c91c91b4ba6/Leonardo_Lightning_XL_watercolor_art_two_little_cartoon_hearts_1.jpg?w=512"
  },
  {
    id: "qwertyuio",
    title: "Introduction aux Algorithmes de Machine Learning",
    author: "Sophie Lefevre",
    source: "AI-Today",
    category: "Intelligence Artificielle",
    tags: ["Machine Learning", "IA", "Algorithmes", "Big Data"],
    summary: "Découvrez les concepts de base du Machine Learning, les types d'algorithmes et comment les utiliser...",
    content: `Le Machine Learning est au cœur de l'Intelligence Artificielle moderne, avec des algorithmes comme la régression linéaire...`,
    likes: 58,
    comments: 23,
    time: "Il y a 3 jours",
    image: "https://cdn.leonardo.ai/users/844f14c0-aedf-4573-822c-198ab2d3bcbf/generations/02964e94-2d3b-42ac-af09-09cf68a037f8/Leonardo_Phoenix_Create_a_stunning_futuristic_visualization_th_0.jpg?w=512"
  }
];

const Favoris = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<{ [key: string]: string[] }>({});
  const [articleStates, setArticleStates] = useState<{ [key: string]: { liked: boolean, bookmarked: boolean, favorited: boolean } }>({});

  useEffect(() => {
    // Charger les articles favoris (cela pourrait provenir du localStorage ou autre)
  }, []);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setModalIsOpen(true);
  };

  const handleCloseArticle = () => {
    setModalIsOpen(false);
    setSelectedArticle(null);
  };

  const handleAddComment = (articleId: string, comment: string) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      if (!updatedComments[articleId]) {
        updatedComments[articleId] = [];
      }
      updatedComments[articleId].push(comment);
      return updatedComments;
    });
  };

  const handleAddReply = (articleId: string, commentIndex: number, reply: string) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      if (updatedComments[articleId]) {
        updatedComments[articleId][commentIndex] = `${updatedComments[articleId][commentIndex]} - Reply: ${reply}`;
      }
      return updatedComments;
    });
  };

  const handleLike = (articleId: string) => {
    setArticleStates((prevState) => ({
      ...prevState,
      [articleId]: {
        ...prevState[articleId],
        liked: !prevState[articleId]?.liked,
      }
    }));
  };

  const handleBookmark = (articleId: string) => {
    setArticleStates((prevState) => ({
      ...prevState,
      [articleId]: {
        ...prevState[articleId],
        bookmarked: !prevState[articleId]?.bookmarked,
      }
    }));
  };

  const handleFavorite = (articleId: string) => {
    setArticleStates((prevState) => ({
      ...prevState,
      [articleId]: {
        ...prevState[articleId],
        favorited: !prevState[articleId]?.favorited,
      }
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Articles en Favoris</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="relative bg-white rounded-lg shadow-md p-4 h-[30rem] cursor-pointer">
            <div onClick={() => handleOpenArticle(article)}>
              <div className="text-sm text-white bg-blue-600 px-2 py-1 rounded mb-2 inline-block">
                {article.category}
              </div>
              <img src={article.image} alt={article.title} className="w-full h-56 object-cover rounded-t-lg" />
              <h3 className="text-xl font-bold mt-2">{article.title}</h3>
              <p>{article.summary}</p>
            </div>

            <div className="flex justify-between border-t pt-4 mt-5 absolute bottom-2 w-[90%] px-5">
              <div className="flex gap-4">
                <button
                  className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
                    articleStates[article.id]?.liked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(article.id);
                  }}
                >
                  <FaHeart className="h-4 w-4 mr-1" />
                  {article.likes + (articleStates[article.id]?.liked ? 1 : 0)}
                </button>
                <button
                  className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
                    articleStates[article.id]?.favorited ? 'text-yellow-500' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(article.id);
                  }}
                >
                  <FaStar className={`h-4 w-4 ${articleStates[article.id]?.favorited ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  className={`inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm ${
                    articleStates[article.id]?.bookmarked ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmark(article.id);
                  }}
                >
                  <FaBookmark className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center font-medium rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
                  <FaShare className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleOpenArticle(article)}
                  className="inline-flex items-center justify-center font-medium rounded px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
                >
                  <FaBookOpen className="h-4 w-4 mr-1" />
                  Lire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour afficher l'article sélectionné */}
      {modalIsOpen && selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={modalIsOpen}
          onClose={handleCloseArticle}
          comments={comments[selectedArticle.id] || []}
          onAddComment={(comment) => handleAddComment(selectedArticle.id, comment)}
          onAddReply={handleAddReply}
          onDeleteComment={(index) => {
            const updatedComments = [...comments[selectedArticle.id]];
            updatedComments.splice(index, 1);
            setComments({
              ...comments,
              [selectedArticle.id]: updatedComments,
            });
          }}
          liked={articleStates[selectedArticle.id]?.liked || false}
          onLike={() => handleLike(selectedArticle.id)}
          bookmarked={articleStates[selectedArticle.id]?.bookmarked || false}
          onBookmark={() => handleBookmark(selectedArticle.id)}
        />
      )}
    </div>
  );
};

export default Favoris;
