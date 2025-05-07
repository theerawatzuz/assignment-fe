"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  username: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้ที่ล็อกอินไว้หรือไม่
    const userData = localStorage.getItem("user");

    if (!userData) {
      // ถ้าไม่มีข้อมูลผู้ใช้ ให้ redirect กลับไปหน้า login
      router.replace("/");
      return;
    }

    try {
      // แปลงข้อมูลจาก JSON string เป็น object
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      // ถ้ามีปัญหาในการแปลงข้อมูล ให้ redirect กลับไปหน้า login
      router.replace("/");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้จาก localStorage
    localStorage.removeItem("user");
    // redirect กลับไปหน้า login
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-500">
        <div className="text-white text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-100">
      <header className="bg-green-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">a Board</h1>
            <p>
              ยินดีต้อนรับ,{" "}
              <span className="font-semibold">{user?.username}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
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
            <span className="font-semibold">{user?.username}</span>
          </p>
          <p className="mt-4 text-gray-600">
            นี่เป็นหน้าแดชบอร์ดพื้นฐานสำหรับผู้ใช้ที่ล็อกอินสำเร็จ
          </p>
        </div>
      </main>
    </div>
  );
}
