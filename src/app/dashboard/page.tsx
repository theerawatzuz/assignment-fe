"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  // ใช้ hook useAuth จัดการเรื่องผู้ใช้และการตรวจสอบสถานะ
  const { user, isLoading, signOut, requireAuth, API_URL } = useAuth();

  // เรียกใช้ requireAuth เพื่อตรวจสอบและ redirect ถ้าไม่ได้ล็อกอินไว้
  useEffect(() => {
    requireAuth("/");
  }, [requireAuth]);

  // แสดงส่วน loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-500">
        <div className="text-white text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  // ถ้าไม่มีข้อมูลผู้ใช้ (กรณีกำลัง redirect) ให้แสดงหน้าว่าง
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-green-100">
      <header className="bg-green-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">a Board</h1>
            <p>
              ยินดีต้อนรับ,{" "}
              <span className="font-semibold">{user.username}</span>
            </p>
          </div>
          <button
            onClick={signOut}
            className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            ออกจากระบบ
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-green-500">แดชบอร์ด</h2>
          <p className="text-gray-700">
            คุณได้เข้าสู่ระบบด้วยชื่อผู้ใช้:{" "}
            <span className="font-semibold">{user.username}</span>
          </p>
          <p className="mt-4 text-gray-600">
            นี่เป็นหน้าแดชบอร์ดพื้นฐานสำหรับผู้ใช้ที่ล็อกอินสำเร็จ
          </p>
          <p className="mt-2 text-sm text-gray-500">API URL: {API_URL}</p>
        </div>
      </main>
    </div>
  );
}
