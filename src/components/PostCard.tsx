"use client";

import Link from "next/link";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-5">
        <Link href={`/posts/${post.id}`}>
          <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400 hover:underline">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.content}
        </p>
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            โดย <span className="font-medium">{post.author.username}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 dark:text-gray-400">
              {formatDate(post.createdAt)}
            </span>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
              {post._count?.comments || 0} ความคิดเห็น
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
