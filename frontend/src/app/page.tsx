// app/page.tsx
"use client";
import React, { useState } from 'react';
import ArticleCard from '@/components/card/ArticleCard';
import RightSidebar from '@/components/layout/RightSidebar';
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
    tags: ["React", "JavaScript", "Frontend", "Web Dev"],
    summary: "Découvrez les nouvelles fonctionnalités qui vont révolutionner le développement React, avec des exemples pratiques et des conseils pour tirer parti de cette nouvelle version.",
    content: `React 19 apporte des améliorations significatives en termes de performance et de fonctionnalités. Parmi les nouveautés, nous retrouvons le rendu concurrentiel, des hooks améliorés et une gestion d'état plus performante. Ces mises à jour permettent aux développeurs de créer des applications plus réactives et fluides. Par exemple, le nouvel API Concurrent Mode permet un rendu en douceur des composants tout en évitant les blocages...`,
    likes: 42,
    comments: 12,
    time: "Il y a 2h",
    image: "https://cdn.leonardo.ai/users/75be81c6-02b9-4765-9902-3940da5d8f94/generations/825fa874-6cdc-4cdb-9a77-1d5f875a9a73/Leonardo_Phoenix_Description_A_darkened_scene_where_the_Deputy_0.jpg?w=512",
    favorite: true
  },
  {
    id: "azertyup",
    title: "Guide complet : Déploiement avec Docker",
    author: "Marie Martin",
    source: "DevActu.fr",
    category: "DevOps",
    tags: ["Docker", "DevOps", "CI/CD", "Containers"],
    summary: "Un tutoriel pas à pas pour maîtriser Docker dans vos projets, de la création d'images au déploiement dans un environnement de production.",
    content: `Docker est devenu un outil incontournable dans le développement moderne pour isoler les applications dans des conteneurs. Ce guide vous accompagnera dans la création d'une image Docker personnalisée, l'exécution de conteneurs et la mise en place de pipelines CI/CD avec Docker. Nous verrons aussi comment gérer les réseaux, les volumes et configurer des services Docker-Compose pour un environnement de développement robuste et reproductible...`,
    likes: 38,
    comments: 8,
    time: "Il y a 5h",
    image: "https://cdn.leonardo.ai/users/83a0a692-8a58-450e-8f43-3630710f9e9a/generations/7193be61-f386-4cf8-a987-6c91c91b4ba6/Leonardo_Lightning_XL_watercolor_art_two_little_cartoon_hearts_1.jpg?w=512",
    favorite: true
  },
  {
    id: "qwertyuio",
    title: "Introduction aux Algorithmes de Machine Learning",
    author: "Sophie Lefevre",
    source: "AI-Today",
    category: "Intelligence Artificielle",
    tags: ["Machine Learning", "IA", "Algorithmes", "Big Data"],
    summary: "Découvrez les concepts de base du Machine Learning, les types d'algorithmes et comment les utiliser dans vos projets.",
    content: `Le Machine Learning est au cœur de l'Intelligence Artificielle moderne, avec des algorithmes comme la régression linéaire, les forêts aléatoires, et les réseaux neuronaux. Ce guide explore les différences entre apprentissage supervisé et non supervisé, ainsi que des applications pratiques dans des domaines comme la reconnaissance d'image et le traitement du langage naturel. Vous découvrirez aussi comment choisir le bon algorithme pour vos données et optimiser ses performances...`,
    likes: 58,
    comments: 23,
    time: "Il y a 3 jours",
    image: "https://cdn.leonardo.ai/users/844f14c0-aedf-4573-822c-198ab2d3bcbf/generations/02964e94-2d3b-42ac-af09-09cf68a037f8/Leonardo_Phoenix_Create_a_stunning_futuristic_visualization_th_0.jpg?w=512",
    favorite: false
  },
  {
    id: "qsdfghjk",
    title: "Construire une API RESTful avec Node.js et Express",
    author: "Léo Girard",
    source: "WebDevPro",
    category: "Backend",
    tags: ["Node.js", "API", "Express", "REST"],
    summary: "Apprenez à créer une API RESTful en utilisant Node.js et Express pour gérer les données d'une application.",
    content: `Les API RESTful permettent une communication standardisée entre les clients et les serveurs. Dans ce tutoriel, vous allez découvrir comment configurer une API avec Node.js et Express, incluant des méthodes CRUD, l'authentification et la validation des données. Nous verrons aussi comment tester et sécuriser l'API pour la production...`,
    likes: 92,
    comments: 47,
    time: "Il y a 1 semaine",
    image: "https://cdn.leonardo.ai/users/dee1e8a1-eb86-4508-9555-d9e9befb9275/generations/329cb053-012e-4d7b-a5cc-c5c11522a6ef/variations/alchemyrefiner_alchemymagic_0_329cb053-012e-4d7b-a5cc-c5c11522a6ef_0.jpg?w=512",
    favorite: true
  },
  {
    id: "zxcvbnmq",
    title: "Les bases de Git et GitHub pour les développeurs",
    author: "Isabelle Durant",
    source: "CodeMaster",
    category: "Versioning",
    tags: ["Git", "GitHub", "Version Control", "Collaboration"],
    summary: "Découvrez comment gérer vos versions de code avec Git et GitHub, des commandes de base aux workflows collaboratifs.",
    content: `Git est un outil de contrôle de version essentiel pour les développeurs modernes. Ce guide couvre les commandes de base de Git comme init, add, commit et push, ainsi que les pratiques recommandées pour travailler en équipe avec GitHub. Vous apprendrez également comment gérer les conflits, créer des branches et organiser vos projets de manière collaborative et efficace...`,
    likes: 74,
    comments: 35,
    time: "Il y a 2 semaines",
    image: "https://cdn.leonardo.ai/users/8fca176b-019f-4858-9163-586ebfe096ac/generations/2cfd0a7c-0888-44a3-84a1-456289df3227/variations/alchemyrefiner_alchemymagic_1_2cfd0a7c-0888-44a3-84a1-456289df3227_0.jpg?w=512",
    favorite: false
  }
];

const Home: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [articleStates, setArticleStates] = useState<Record<string, { liked: boolean; bookmarked: boolean; favorited: boolean }>>(
    articles.reduce((acc, article) => ({
      ...acc,
      [article.id]: { liked: false, bookmarked: false, favorited: article.favorite }
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

  const handleFavorite = (articleId: string) => {
    setArticleStates(prev => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        favorited: !prev[articleId].favorited
      }
    }));
  };

  return (
    <div className=" bg-gray-50">
        <main className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-9 gap-6">
              {/* Main Content - Feed d'articles */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div>
              {articles.map(article => (
                <div 
                  key={article.id}
                >
                  <ArticleCard 
                     article={article}
                     liked={articleStates[article.id]?.liked}
                     bookmarked={articleStates[article.id]?.bookmarked}
                     favorited={articleStates[article.id]?.favorited}
                     onLike={(e) => {
                       e.stopPropagation();
                       handleLike(article.id);
                     }}
                     onBookmark={(e) => {
                       e.stopPropagation();
                       handleBookmark(article.id);
                     }}
                     onFavorite={(e) => {
                       e.stopPropagation();
                       handleFavorite(article.id);
                     }}
                     onOpenArticle={handleOpenArticle}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-9 md:col-span-3 lg:col-span-3 sticky top-20">
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
        liked={selectedArticle ? articleStates[selectedArticle.id]?.liked : false}
        onLike={() => selectedArticle && handleLike(selectedArticle.id)}
        bookmarked={selectedArticle ? articleStates[selectedArticle.id]?.bookmarked : false}
        onBookmark={() => selectedArticle && handleBookmark(selectedArticle.id)}
        favorited={ selectedArticle ? articleStates[selectedArticle.id]?.favorited : false}
        onFavorite={() => selectedArticle && handleFavorite(selectedArticle.id)}
      />

    </div>
  );
};

export default Home;
