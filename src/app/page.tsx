"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // ใช้ hook useAuth แทนการเขียนตรรกะการ login เอง
  const { signIn, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // เรียกใช้ฟังก์ชัน signIn จาก hook
      const success = await signIn(username);

      if (success) {
        setTimeout(() => {
          router.push("/blog");
        }, 100);
      }
    } catch (error) {
      setError("เซิร์ฟเวอร์ไม่ตอบสนอง โปรดลองอีกครั้งในภายหลัง");
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Mobile View Layout */}
      <div className="md:hidden w-full min-h-screen relative flex flex-col">
        {/* พื้นหลังเต็มจอสีเขียวเข้ม */}
        <div className="absolute top-0 left-0 w-full h-full bg-green-500 z-0"></div>

        {/* ส่วนบนพร้อมภาพและมุมโค้งด้านล่าง */}
        <div className="relative w-full h-[45vh] bg-green-300 rounded-b-3xl z-10 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36">
            <div className="relative">
              {/* รูปโน้ตบุ๊ค */}
              <Image
                src="/logo/logo1.png"
                alt="logo"
                className="w-full h-full object-contain"
                width={150}
                height={150}
                priority
              />
            </div>
          </div>
          <p className="italic text-white text-xl mt-2 font-castoro">a Board</p>
        </div>

        {/* ส่วนฟอร์ม Sign In - จัดกลางเหมือนในรูป */}
        <div className="relative flex-grow flex flex-col justify-center items-center px-6 z-20">
          <div className="w-full max-w-md">
            <h1 className="text-white text-2xl font-bold mb-8">Sign in</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {(error || authError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error || authError}
                </div>
              )}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 rounded-md border bg-white text-gray-600 border-gray-300 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-white mt-1 ml-1">
                  ลองใช้: datawow, userwow, หรือ adminwow
                </p>
              </div>
              <button
                type="submit"
                className={`w-full ${
                  isLoading ? "bg-gray-400" : "bg-success"
                } text-white p-3 rounded-md hover:bg-opacity-90 transition`}
                disabled={isLoading}
              >
                {isLoading ? "กำลังดำเนินการ..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block w-full h-screen relative">
        {/* Sign in Form Section (Left) - พื้นหลังต่อเนื่องทั้งหน้าจอ */}
        <div className="absolute top-0 left-0 w-full h-full bg-green-500 z-0"></div>

        {/* Image Section (Right) - วางทับบนพื้นหลังโดยมีการทำมุมโค้ง */}
        <div className="absolute top-0 right-0 md:w-1/2 h-full bg-green-300 rounded-l-3xl z-10">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-64 h-64">
              <div className="relative">
                <Image
                  src="/logo/logo1.png"
                  alt="logo"
                  className="w-full h-full object-contain"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            </div>
            <p className="italic text-white text-2xl mt-4 font-castoro">
              a Board
            </p>
          </div>
        </div>

        {/* Sign in Form Content - วางทับบนพื้นหลัง */}
        <div className="absolute top-0 left-0 md:w-1/2 h-full z-20">
          <div className="flex flex-col justify-center items-center h-full px-6">
            <div className="w-full max-w-md">
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center md:text-left">
                Sign in
              </h1>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {(error || authError) && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error || authError}
                  </div>
                )}
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 rounded-md border bg-white text-gray-600 border-gray-300 focus:outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-white mt-1 ml-1">
                    ลองใช้: datawow, userwow, หรือ adminwow
                  </p>
                </div>
                <button
                  type="submit"
                  className={`w-full ${
                    isLoading ? "bg-gray-400" : "bg-success"
                  } text-white p-3 rounded-md hover:bg-opacity-90 transition`}
                  disabled={isLoading}
                >
                  {isLoading ? "กำลังดำเนินการ..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
