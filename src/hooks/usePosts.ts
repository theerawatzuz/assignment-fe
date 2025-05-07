"use client";

import { useState, useEffect } from "react";
import { useApi } from "./useApi";

// กำหนดประเภทข้อมูลโพสต์
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  authorName: string;
  category: string;
  commentCount: number;
  createdAt: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { get, isLoading, error } = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await get<Post[]>("/api/posts");
      if (response.data) {
        setPosts(response.data);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ฟังก์ชันสำหรับสร้าง excerpt จากเนื้อหาโพสต์
  const getExcerpt = (content: string): string => {
    return content.length > 150 ? `${content.substring(0, 150)}...` : content;
  };

  return {
    posts,
    isLoading,
    error,
    getExcerpt,
  };
}
