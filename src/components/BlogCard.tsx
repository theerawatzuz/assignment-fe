"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorImage?: string;
  category: string;
  commentCount: number;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  authorName,
  authorImage,
  category,
  commentCount,
}: BlogCardProps) {
  return (
    <div className="p-6 border-b border-gray-100 last:border-none">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
          <Image
            src={authorImage || "/images/profile-placeholder.png"}
            alt={authorName}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-medium">{authorName}</p>
          <p className="text-xs text-gray-500">{category}</p>
        </div>
      </div>

      <Link href={`/blog/${id}`} className="block group">
        <h3 className="text-xl font-bold mb-2 group-hover:text-green-500">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
      </Link>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <Link
          href={`/blog/${id}#comments`}
          className="flex items-center hover:text-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mr-1"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
          </svg>
          {commentCount} ความคิดเห็น
        </Link>

        <Link href={`/blog/${id}`} className="text-green-500 hover:underline">
          อ่านเพิ่มเติม →
        </Link>
      </div>
    </div>
  );
}
