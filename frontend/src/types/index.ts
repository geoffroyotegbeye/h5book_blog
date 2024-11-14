// types/index.ts

// Type pour les articles
export interface Article {
  id: string;
  title: string;
  author: string;
  source: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  image: string;
}

// Type pour un commentaire
export interface CommentType {
  id: string;
  author: string;
  content: string;
  time: string;
  replies: ReplyType[];
}

// Type pour une réponse à un commentaire
export interface ReplyType {
  id: string;
  author: string;
  content: string;
  time: string;
}

export interface Notification {
  id: number;
  title: string;
  time: string;
  isUnread: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  joinedDate: string;
  avatar: string;
}

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: () => void;
}