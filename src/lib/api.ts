import axios from "axios";

const API_URL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User APIs
export const loginUser = async (username: string) => {
  const response = await apiClient.post("/users/login", { username });
  return response.data;
};

// Post APIs
export const getPosts = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const getPost = async (id: number) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: {
  title: string;
  content: string;
  authorId: number;
}) => {
  const response = await apiClient.post("/posts", post);
  return response.data;
};

export const updatePost = async (
  id: number,
  post: { title?: string; content?: string },
  userId: number
) => {
  const response = await apiClient.patch(`/posts/${id}`, { ...post, userId });
  return response.data;
};

export const deletePost = async (id: number, userId: number) => {
  const response = await apiClient.delete(`/posts/${id}`, { data: { userId } });
  return response.data;
};

// Comment APIs
export const getComments = async (postId: number) => {
  const response = await apiClient.get(`/comments?postId=${postId}`);
  return response.data;
};

export const createComment = async (comment: {
  content: string;
  postId: number;
  authorId: number;
}) => {
  const response = await apiClient.post("/comments", comment);
  return response.data;
};

export const updateComment = async (
  id: number,
  comment: { content: string },
  userId: number
) => {
  const response = await apiClient.patch(`/comments/${id}`, {
    ...comment,
    userId,
  });
  return response.data;
};

export const deleteComment = async (id: number, userId: number) => {
  const response = await apiClient.delete(`/comments/${id}`, {
    data: { userId },
  });
  return response.data;
};
