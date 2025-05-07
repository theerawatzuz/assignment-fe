"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { loginUser } from "@/lib/api";

export default function Header() {
  const { user, setUser, logout, isLoggedIn } = useAuthStore();
  const [username, setUsername] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setLoginError("ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร");
      return;
    }

    try {
      const userData = await loginUser(username);
      setUser(userData);
      setUsername("");
      setIsLoginOpen(false);
      setLoginError("");
    } catch (error) {
      setLoginError("เข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง");
    }
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4 max-w-5xl flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          เว็บบอร์ดถาม-ตอบ
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn() ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:block">
                สวัสดี, <span className="font-semibold">{user?.username}</span>
              </span>
              <Link
                href="/posts/new"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                สร้างกระทู้ใหม่
              </Link>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 transition"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                เข้าสู่ระบบ
              </button>

              {isLoginOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded shadow-lg p-4 z-10">
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium mb-1"
                      >
                        ชื่อผู้ใช้
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ชื่อผู้ใช้ของคุณ"
                        autoComplete="off"
                      />
                    </div>
                    {loginError && (
                      <p className="text-red-500 text-xs mb-3">{loginError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      เข้าสู่ระบบ
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
