// app/page.tsx
"use client";
import React, { useState } from 'react';
import Nav from '@/components/layout/Nav';
import ArticleCard from '@/components/card/ArticleCard';
import { AiOutlineCode, AiOutlineMobile, AiOutlineRobot, AiOutlineCloud, AiFillFire } from 'react-icons/ai';
import { BiBookOpen, BiBriefcase, BiGroup, BiHome } from 'react-icons/bi';
import Sidebar from '@/components/layout/Sidebar';
import { Article, CommentType, ReplyType } from '@/types';
import ArticleModal from '@/components/posts/ArticleModal';

// Mock articles data augmenté avec plus de contenu
const articles: Article[] = [
  {
    id: "azertyuiop",
    title: "Les nouveautés de React 19 expliquées simplement",
    author: "Jean Dupont",
    source: "DevActu.fr",
    category: "Développement Web",
    summary: "Découvrez les nouvelles fonctionnalités qui vont révolutionner le développement React...",
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
    summary: "Un tutoriel pas à pas pour maîtriser Docker dans vos projets...",
    content: `Docker est devenu un outil incontournable dans le développement moderne...`,
    likes: 38,
    comments: 8,
    time: "Il y a 5h",
    image: "https://cdn.leonardo.ai/users/83a0a692-8a58-450e-8f43-3630710f9e9a/generations/7193be61-f386-4cf8-a987-6c91c91b4ba6/Leonardo_Lightning_XL_watercolor_art_two_little_cartoon_hearts_1.jpg?w=512"
  }
];

const navigationItems = [
  { id: 1, label: "Accueil", icon: BiHome },
  { id: 2, label: "Feed", icon: BiBookOpen },
  { id: 3, label: "Communauté", icon: BiGroup },
  { id: 4, label: "Espace Pro", icon: BiBriefcase },
];

const categories = [
  { id: 1, label: "Tendances", icon: AiFillFire },
  { id: 2, label: "Développement Web", icon: AiOutlineCode },
  { id: 3, label: "Mobile", icon: AiOutlineMobile },
  { id: 4, label: "Intelligence Artificielle", icon: AiOutlineRobot },
  { id: 5, label: "Cloud", icon: AiOutlineCloud },
];

const formations = [
  { id: 1, title: "Formation DevOps - Maîtrisez Docker et Kubernetes" },
  { id: 2, title: "Introduction à l'Intelligence Artificielle" },
  { id: 3, title: "Développement Mobile avec React Native" },
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedNav, setSelectedNav] = useState<string>("Accueil");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [articleStates, setArticleStates] = useState<Record<string, { liked: boolean; bookmarked: boolean }>>(
    articles.reduce((acc, article) => ({
      ...acc,
      [article.id]: { liked: false, bookmarked: false }
    }), {})
  );

  // État et fonctions pour gérer les commentaires
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: "hkjhljh",
      author: "Alice Martin",
      content: "Super article ! Très instructif.",
      time: "Il y a 1h",
      replies: [
        {
          id: "jmlkjmlkjmkl",
          author: "Bob Wilson",
          content: "Tout à fait d'accord avec toi Alice !",
          time: "Il y a 30min"
        }
      ]
    }
  ]);

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
  
  const handleDeleteComment = (commentId: string) => { // Changez `number` en `string`
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
        liked: !prev[articleId].liked
      }
    }));
  };

  const handleBookmark = (articleId: string) => {
    setArticleStates(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        bookmarked: !prev[articleId].bookmarked
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation principale */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <Sidebar title="Menu">
              <div className="space-y-6">
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedNav(item.label)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          selectedNav === item.label
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Sidebar>
          </div>

          {/* Main Content - Feed d'articles */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div className="space-y-4">
              {articles.map(article => (
                <div 
                  key={article.id}
                >
                  <ArticleCard 
                    article={article}
                    liked={articleStates[article.id]?.liked}
                    bookmarked={articleStates[article.id]?.bookmarked}
                    onLike={(e) => {
                      e.stopPropagation();
                      handleLike(article.id);
                    }}
                    onBookmark={(e) => {
                      e.stopPropagation();
                      handleBookmark(article.id);
                    }}
                    onOpenArticle={handleOpenArticle}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Catégories et Formations */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <div className="space-y-6">
              {/* Catégories */}
              <Sidebar title="Explorer">
                <div className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.label)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.label
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Sidebar>

              {/* Formations */}
              <Sidebar title="Formations">
                <div className="space-y-2">
                  {formations.map(formation => (
                    <div
                      key={formation.id}
                      className="p-3 rounded-lg bg-white border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                    >
                      <h3 className="text-sm font-medium">{formation.title}</h3>
                    </div>
                  ))}
                  <button className="w-full text-blue-600 text-sm font-medium mt-2 hover:underline">
                    Voir plus
                  </button>
                </div>
              </Sidebar>
            </div>
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
        liked={selectedArticle ? articleStates[selectedArticle.id]?.liked : false}
        onLike={() => selectedArticle && handleLike(selectedArticle.id)}
        bookmarked={selectedArticle ? articleStates[selectedArticle.id]?.bookmarked : false}
        onBookmark={() => selectedArticle && handleBookmark(selectedArticle.id)}
      />

    </div>
  );
};

export default Home;
