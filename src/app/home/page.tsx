"use client";

import React from "react";
import BlogCard from "@/components/BlogCard";
import { usePosts } from "@/hooks/usePosts";

// ประเภทข้อมูลโพสต์
interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  authorName: string;
  category: string;
  commentCount: number;
  createdAt: string;
}

export default function HomePage() {
  const { posts, isLoading, error, getExcerpt } = usePosts();

  return (
    <div className="p-6">
      <h1 className="sr-only">หน้าแรก</h1>

      <div className="flex">
        <div className="flex-1 max-w-3xl">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-red-500">เกิดข้อผิดพลาด: {error}</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt || getExcerpt(post.content)}
                  authorName={post.authorName}
                  category={post.category}
                  commentCount={post.commentCount}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">ไม่พบโพสต์</p>
            </div>
          )}
        </div>

        {/* Right sidebar/community section (only visible on large screens) */}
        <div className="hidden lg:block w-64 ml-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-4">ชุมชน</h2>

            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                พูดคุยทั่วไป
              </li>
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                คำถามและคำตอบ
              </li>
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                ชมรมหนังสือ
              </li>
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                เวิร์คช็อปนักเขียน
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
