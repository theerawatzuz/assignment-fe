"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface CommentFormProps {
  topicId: string;
  onCommentSubmitted: (comment: {
    id: string;
    topicId: string;
    content: string;
    authorName: string;
    createdAt: string;
  }) => void;
}

export default function CommentForm({
  topicId,
  onCommentSubmitted,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert("กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น");
      return;
    }

    if (!content.trim()) {
      alert("กรุณากรอกความคิดเห็น");
      return;
    }

    setIsSubmitting(true);

    try {
      // จำลองการส่งข้อมูลไปยังเซิร์ฟเวอร์
      await new Promise((resolve) => setTimeout(resolve, 500));

      // สร้าง ID แบบสุ่ม
      const newCommentId = `comment-${Date.now()}`;

      // สร้างความคิดเห็นใหม่
      const newComment = {
        id: newCommentId,
        topicId: topicId,
        content: content,
        authorName: user?.name || "Guest",
        createdAt: new Date().toISOString(),
      };

      // ส่งข้อมูลกลับไปยัง parent component
      onCommentSubmitted(newComment);

      // รีเซ็ตฟอร์ม
      setContent("");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งความคิดเห็น:", error);
      alert("เกิดข้อผิดพลาดในการส่งความคิดเห็น กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-medium mb-3">แสดงความคิดเห็น</h3>

      {isAuthenticated() ? (
        <p className="text-gray-600 mb-2">
          แสดงความคิดเห็นในฐานะ{" "}
          <span className="font-medium">{user?.name}</span>
        </p>
      ) : (
        <p className="text-yellow-600 mb-2">
          กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-2"
          rows={4}
          placeholder="แสดงความคิดเห็นของคุณที่นี่..."
          disabled={!isAuthenticated() || isSubmitting}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            disabled={!isAuthenticated() || isSubmitting}
          >
            {isSubmitting ? "กำลังส่ง..." : "ส่งความคิดเห็น"}
          </button>
        </div>
      </form>
    </div>
  );
}
