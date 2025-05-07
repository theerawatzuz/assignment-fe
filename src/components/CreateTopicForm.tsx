"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface CreateTopicFormProps {
  onTopicCreated: (topic: {
    id: string;
    title: string;
    content: string;
    authorName: string;
    category: string;
    commentCount: number;
    createdAt: string;
  }) => void;
}

export default function CreateTopicForm({
  onTopicCreated,
}: CreateTopicFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("ทั่วไป");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const categories = [
    "ทั่วไป",
    "คำถาม",
    "ประกาศ",
    "แนะนำ",
    "วิชาการ",
    "เทคโนโลยี",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert("กรุณาเข้าสู่ระบบก่อนสร้างหัวข้อใหม่");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);

    try {
      // จำลองการส่งข้อมูลไปยังเซิร์ฟเวอร์
      await new Promise((resolve) => setTimeout(resolve, 500));

      // สร้าง ID แบบสุ่ม
      const newTopicId = `topic-${Date.now()}`;

      // สร้างหัวข้อใหม่
      const newTopic = {
        id: newTopicId,
        title: title,
        content: content,
        authorName: user?.name || "Guest",
        category: category,
        commentCount: 0,
        createdAt: new Date().toISOString(),
      };

      // ส่งข้อมูลกลับไปยัง parent component
      onTopicCreated(newTopic);

      // รีเซ็ตฟอร์ม
      setTitle("");
      setContent("");
      setCategory("ทั่วไป");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างหัวข้อ:", error);
      alert("เกิดข้อผิดพลาดในการสร้างหัวข้อ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">สร้างหัวข้อใหม่</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-1">
            หัวข้อ
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="หัวข้อของคุณ"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 mb-1">
            เนื้อหา
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows={5}
            placeholder="เนื้อหาของคุณ"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 mb-1">
            หมวดหมู่
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังสร้าง..." : "สร้างหัวข้อ"}
          </button>
        </div>
      </form>
    </div>
  );
}
