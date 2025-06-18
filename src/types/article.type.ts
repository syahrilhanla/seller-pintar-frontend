import { User } from "./user.type";

export type ArticleCategory = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticleUser = {
  id: string;
  username: string;
};

export type Article = {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  category: ArticleCategory;
  user: ArticleUser;
};

export type ArticlePreview = {
  title: string;
  category: string;
  content: string;
  thumbnail: string;
  user: User | null;
} | null
