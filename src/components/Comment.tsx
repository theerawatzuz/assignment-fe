"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

interface CommentProps {
  id: string;
  content: string;
  authorName: string;
  authorImage?: string;
  createdAt: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
}

export default function Comment({
  id,
  content,
  authorName,
  authorImage,
  createdAt,
  onDelete,
  onEdit,
}: CommentProps) {
  const { user, isAuthenticated } = useAuth();
  const isOwner = isAuthenticated() && user?.name === authorName;

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  // แปลงวันที่ให้อ่านง่ายขึ้น
  const formattedDate = new Date(createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSaveEdit = () => {
    if (editedContent.trim() && onEdit) {
      onEdit(id, editedContent);
      setIsEditing(false);
    }
  };

  return (
    <div className="border-b border-gray-100 py-4 last:border-none">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden flex-shrink-0">
          <Image
            src={authorImage || "/images/profile-placeholder.png"}
            alt={authorName}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <div>
              <span className="font-medium">{authorName}</span>
              <span className="text-xs text-gray-500 ml-2">
                {formattedDate}
              </span>
            </div>

            {/* ปุ่มแก้ไข/ลบสำหรับเจ้าของความคิดเห็น */}
            {isOwner && !isEditing && (
              <div className="flex space-x-2 text-sm">
                {onEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    แก้ไข
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => {
                      if (
                        window.confirm("คุณต้องการลบความคิดเห็นนี้ใช่หรือไม่?")
                      ) {
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

          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-2"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                >
                  บันทึก
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-700 whitespace-pre-wrap">{content}</div>
          )}
        </div>
      </div>
    </div>
  );
}
