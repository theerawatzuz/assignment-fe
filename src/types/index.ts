export interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: User;
  comments?: Comment[];
  _count?: {
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  author: User;
  createdAt: string;
  updatedAt: string;
}
