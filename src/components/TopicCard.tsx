"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface TopicCardProps {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorImage?: string;
  category: string;
  commentCount: number;
  createdAt: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function TopicCard({
  id,
  title,
  content,
  authorName,
  authorImage,
  category,
  commentCount,
  createdAt,
  onDelete,
  onEdit,
}: TopicCardProps) {
  const { user, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated() && user?.name === authorName;

  // ตัดเนื้อหาให้สั้นลงถ้ายาวเกินไป
  const truncatedContent =
    content.length > 150 ? `${content.substring(0, 150)}...` : content;

  // แปลงวันที่ให้อ่านง่ายขึ้น
  const formattedDate = new Date(createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>

        {/* ปุ่มแก้ไข/ลบสำหรับเจ้าของกระทู้ */}
        {isOwner && (
          <div className="ml-auto flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(id)}
                className="text-blue-500 hover:text-blue-700"
              >
                แก้ไข
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => {
                  if (window.confirm("คุณต้องการลบหัวข้อนี้ใช่หรือไม่?")) {
                    onDelete(id);
                  }
                }}
                className="text-red-500 hover:text-red-700"
              >
                ลบ
              </button>
            )}
          </div>
        )}
      </div>

      <Link href={`/community/${id}`} className="block group">
        <h3 className="text-xl font-bold mb-2 group-hover:text-green-500">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{truncatedContent}</p>
      </Link>

      <div className="flex justify-between items-center text-sm">
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
          {category}
        </span>

        <Link
          href={`/community/${id}#comments`}
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
      </div>
    </div>
  );
}
