"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CommentForm from "@/components/CommentForm";
import Comment from "@/components/Comment";
import { useAuth } from "@/contexts/AuthContext";

// ข้อมูลตัวอย่าง - เป็นชุดเดียวกับในหน้า community/page.tsx ในโปรเจคจริงควรเก็บใน store หรือ context
const topicsData = [
  {
    id: "topic-1",
    title: "ความรู้สึกหลังเข้าร่วมงาน React Conference",
    content: `ผมเพิ่งกลับมาจากงาน React Conference และอยากแบ่งปันประสบการณ์ครับ 

ได้เรียนรู้เรื่อง Server Components และ React 19 มา ซึ่งมีความน่าสนใจมาก โดยเฉพาะเรื่อง Server Components ที่ช่วยให้เราสามารถรันโค้ด React บน Server ได้ ทำให้ลดขนาดของ JavaScript ที่ส่งไปยัง client

นอกจากนี้ยังมีเรื่อง React Compiler ที่กำลังพัฒนาอยู่ ซึ่งจะช่วยแปลงโค้ด React ให้มีประสิทธิภาพมากขึ้นโดยอัตโนมัติ

มีใครไปงานนี้บ้างครับ? หรือมีความคิดเห็นเกี่ยวกับเทคโนโลยีเหล่านี้อย่างไรบ้าง?`,
    authorName: "Data Wow",
    category: "เทคโนโลยี",
    commentCount: 5,
    createdAt: "2023-10-15T08:30:00Z",
  },
  {
    id: "topic-2",
    title: "แนะนำหนังสือเกี่ยวกับ TypeScript ที่น่าอ่าน",
    content:
      "กำลังมองหาหนังสือดีๆ เกี่ยวกับ TypeScript อยู่ค่ะ มีใครพอจะแนะนำได้บ้างไหมคะ? อยากได้แนวที่เน้นการใช้งานจริงมากกว่าทฤษฎีเยอะๆ ค่ะ",
    authorName: "User Wow",
    category: "คำถาม",
    commentCount: 3,
    createdAt: "2023-10-14T15:45:00Z",
  },
];

// ข้อมูลความคิดเห็นตัวอย่าง
const commentsData: { [key: string]: any[] } = {
  "topic-1": [
    {
      id: "comment-1",
      topicId: "topic-1",
      content:
        "ผมเองก็ไปร่วมงานมาเหมือนกันครับ ประทับใจมากๆ โดยเฉพาะการพูดของ Dan Abramov เกี่ยวกับอนาคตของ React",
      authorName: "User Wow",
      createdAt: "2023-10-15T10:30:00Z",
    },
    {
      id: "comment-2",
      topicId: "topic-1",
      content:
        "ผมสนใจเรื่อง Server Components มาก อยากรู้ว่ามันจะเปลี่ยนวิธีที่เราเขียน React ไปมากแค่ไหน",
      authorName: "Admin Wow",
      createdAt: "2023-10-15T11:15:00Z",
    },
    {
      id: "comment-3",
      topicId: "topic-1",
      content:
        "ไม่ได้ไปงานครับ แต่ได้ดูบางส่วนผ่าน livestream ชอบเรื่อง React Compiler มากๆ ครับ",
      authorName: "Data Wow",
      createdAt: "2023-10-15T12:20:00Z",
    },
  ],
  "topic-2": [
    {
      id: "comment-1",
      topicId: "topic-2",
      content:
        'แนะนำ "Programming TypeScript" ของ Boris Cherny ครับ เน้นการใช้งานจริงและมีตัวอย่างเยอะดี',
      authorName: "Data Wow",
      createdAt: "2023-10-14T16:20:00Z",
    },
    {
      id: "comment-2",
      topicId: "topic-2",
      content:
        'ลองอ่าน "Effective TypeScript" ของ Dan Vanderkam ดูค่ะ มีเทคนิคที่ใช้ได้จริงในการทำงาน',
      authorName: "Admin Wow",
      createdAt: "2023-10-14T17:45:00Z",
    },
  ],
};

export default function TopicPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // หาข้อมูลหัวข้อจาก id ที่ได้รับ
  const topic = topicsData.find((t) => t.id === id);

  // ดึงข้อมูลความคิดเห็นจาก id ของหัวข้อ
  const [comments, setComments] = useState<any[]>(commentsData[id] || []);

  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  // ตรวจสอบว่าผู้ใช้เป็นเจ้าของหัวข้อหรือไม่
  const isOwner = isAuthenticated() && topic && user?.name === topic.authorName;

  useEffect(() => {
    // ในโปรเจคจริงควรมีการเรียก API เพื่อดึงข้อมูลหัวข้อและความคิดเห็น
  }, [id]);

  if (!topic) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-500">
          ไม่พบหัวข้อที่ต้องการ
        </h1>
        <Link
          href="/community"
          className="text-green-500 hover:underline mt-4 inline-block"
        >
          กลับไปยังหน้าชุมชน
        </Link>
      </div>
    );
  }

  // จัดการเมื่อมีการส่งความคิดเห็นใหม่
  const handleCommentSubmitted = (newComment: any) => {
    setComments((prevComments) => [newComment, ...prevComments]);

    // ในโปรเจคจริงควรมีการอัปเดตจำนวนความคิดเห็นในหัวข้อด้วย
  };

  // จัดการเมื่อมีการลบความคิดเห็น
  const handleDeleteComment = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  // จัดการเมื่อมีการแก้ไขความคิดเห็น
  const handleEditComment = (commentId: string, newContent: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, content: newContent } : comment
      )
    );
  };

  // จัดการเมื่อมีการเริ่มแก้ไขหัวข้อ
  const handleStartEditTopic = () => {
    setIsEditing(true);
    setEditedContent(topic.content);
  };

  // จัดการเมื่อมีการบันทึกการแก้ไขหัวข้อ
  const handleSaveEditTopic = () => {
    // ในโปรเจคจริงควรมีการส่งข้อมูลไปยัง API
    alert("บันทึกการแก้ไขหัวข้อแล้ว (ในโปรเจคจริงควรมีการส่งข้อมูลไปยัง API)");
    setIsEditing(false);
  };

  // จัดการเมื่อมีการลบหัวข้อ
  const handleDeleteTopic = () => {
    if (window.confirm("คุณต้องการลบหัวข้อนี้ใช่หรือไม่?")) {
      // ในโปรเจคจริงควรมีการส่งข้อมูลไปยัง API
      alert(
        "ลบหัวข้อแล้ว (ในโปรเจคจริงควรมีการส่งข้อมูลไปยัง API และนำทางกลับไปยังหน้าชุมชน)"
      );
    }
  };

  // แปลงวันที่ให้อ่านง่ายขึ้น
  const formattedDate = new Date(topic.createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* ส่วนหัวของหัวข้อ */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link
              href="/community"
              className="flex items-center text-green-500 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              กลับไปยังหน้าชุมชน
            </Link>

            {/* ปุ่มแก้ไข/ลบสำหรับเจ้าของหัวข้อ */}
            {isOwner && !isEditing && (
              <div className="ml-auto flex space-x-2">
                <button
                  onClick={handleStartEditTopic}
                  className="text-blue-500 hover:text-blue-700"
                >
                  แก้ไข
                </button>
                <button
                  onClick={handleDeleteTopic}
                  className="text-red-500 hover:text-red-700"
                >
                  ลบ
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-800">{topic.title}</h1>

          <div className="flex items-center mt-4 text-gray-600 text-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 mr-2">
                <Image
                  src="/images/profile-placeholder.png"
                  alt={topic.authorName}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <span>{topic.authorName}</span>
            </div>

            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>

          <div className="mt-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {topic.category}
            </span>
          </div>
        </div>

        {/* เนื้อหาของหัวข้อ */}
        {isEditing ? (
          <div className="mb-6">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-2"
              rows={10}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveEditTopic}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                บันทึก
              </button>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none mb-8 whitespace-pre-wrap">
            {topic.content}
          </div>
        )}

        {/* ส่วนความคิดเห็น */}
        <div className="mt-8 border-t pt-6">
          <h3
            className="text-xl font-semibold text-gray-800 mb-4"
            id="comments"
          >
            ความคิดเห็น ({comments.length})
          </h3>

          <CommentForm
            topicId={id}
            onCommentSubmitted={handleCommentSubmitted}
          />

          {comments.length > 0 ? (
            <div className="mt-6">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  content={comment.content}
                  authorName={comment.authorName}
                  createdAt={comment.createdAt}
                  onDelete={handleDeleteComment}
                  onEdit={handleEditComment}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็นในหัวข้อนี้
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
