"use client";

import React, { useState, useEffect } from "react";
import TopicCard from "@/components/TopicCard";
import CreateTopicForm from "@/components/CreateTopicForm";
import { useAuth } from "@/contexts/AuthContext";

// ข้อมูลตัวอย่าง - หัวข้อในชุมชน
const initialTopics = [
  {
    id: "topic-1",
    title: "ความรู้สึกหลังเข้าร่วมงาน React Conference",
    content:
      "ผมเพิ่งกลับมาจากงาน React Conference และอยากแบ่งปันประสบการณ์ครับ ได้เรียนรู้เรื่อง Server Components และ React 19 มา มีใครไปงานนี้บ้างครับ?",
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
  {
    id: "topic-3",
    title: "ประกาศรับสมัครผู้ร่วมโปรเจคเว็บไซต์การกุศล",
    content:
      "สวัสดีครับทุกคน ผมกำลังทำโปรเจคเว็บไซต์สำหรับองค์กรการกุศลแห่งหนึ่ง ต้องการหาผู้ร่วมพัฒนาที่มีใจรักในงานอาสา โปรเจคนี้ใช้ Next.js, Tailwind และ Node.js ครับ",
    authorName: "Admin Wow",
    category: "ประกาศ",
    commentCount: 8,
    createdAt: "2023-10-12T10:20:00Z",
  },
  {
    id: "topic-4",
    title: "วิธีจัดการ State ใน React ให้มีประสิทธิภาพ",
    content:
      "อยากแชร์เทคนิคการจัดการ State ใน React ที่ผมใช้มาหลายปีครับ เริ่มจากการแยก local และ global state ให้ชัดเจน และเลือกใช้ library ให้เหมาะกับงาน",
    authorName: "Data Wow",
    category: "แนะนำ",
    commentCount: 12,
    createdAt: "2023-10-10T09:15:00Z",
  },
];

export default function CommunityPage() {
  const [topics, setTopics] = useState(initialTopics);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // กรองหัวข้อตามหมวดหมู่
  const filteredTopics = selectedCategory
    ? topics.filter((topic) => topic.category === selectedCategory)
    : topics;

  // สร้างรายการหมวดหมู่ที่ไม่ซ้ำกัน
  const categories = Array.from(new Set(topics.map((topic) => topic.category)));

  // จัดการเมื่อมีการสร้างหัวข้อใหม่
  const handleTopicCreated = (newTopic: any) => {
    setTopics((prevTopics) => [newTopic, ...prevTopics]);
  };

  // จัดการเมื่อมีการลบหัวข้อ
  const handleDeleteTopic = (topicId: string) => {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== topicId)
    );
  };

  // จัดการเมื่อมีการแก้ไขหัวข้อ
  const handleEditTopic = (topicId: string) => {
    // ในที่นี้เราจะนำทางไปที่หน้าแก้ไขหัวข้อ
    alert(`นำทางไปที่หน้าแก้ไขหัวข้อ ${topicId}`);
    // สำหรับโปรเจคจริง ควรใช้ Router หรือเปิด Modal แก้ไข
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-500">ชุมชน</h1>
        <p className="text-gray-600 mt-2">
          พื้นที่สำหรับแลกเปลี่ยนความคิดเห็น ถามคำถาม และแบ่งปันความรู้
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* เนื้อหาหลัก - รายการหัวข้อ */}
        <div className="flex-1">
          {isAuthenticated() && (
            <CreateTopicForm onTopicCreated={handleTopicCreated} />
          )}

          {filteredTopics.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm">
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  content={topic.content}
                  authorName={topic.authorName}
                  category={topic.category}
                  commentCount={topic.commentCount}
                  createdAt={topic.createdAt}
                  onDelete={handleDeleteTopic}
                  onEdit={handleEditTopic}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">ไม่พบหัวข้อในหมวดหมู่นี้</p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-green-500 hover:underline mt-2"
                >
                  ดูทุกหมวดหมู่
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar ด้านขวา */}
        <div className="lg:w-64">
          {/* กล่องกรองหมวดหมู่ */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-bold text-lg mb-4">หมวดหมู่</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left p-2 rounded hover:bg-gray-50 ${
                    selectedCategory === null
                      ? "bg-green-50 text-green-600"
                      : ""
                  }`}
                >
                  ทั้งหมด
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-2 rounded hover:bg-gray-50 ${
                      selectedCategory === category
                        ? "bg-green-50 text-green-600"
                        : ""
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* กล่องข้อมูลการใช้งาน */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-4">คำแนะนำการใช้งาน</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>สร้างหัวข้อใหม่เพื่อเริ่มบทสนทนา</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>แสดงความคิดเห็นในหัวข้อที่สนใจ</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>เลือกหมวดหมู่เพื่อกรองหัวข้อ</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>เคารพความคิดเห็นของผู้อื่น</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
