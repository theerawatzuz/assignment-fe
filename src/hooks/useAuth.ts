"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface User {
  username: string;
}

interface AuthResponse {
  status: "success" | "error";
  message: string;
  user?: User;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // อ่านค่า API URL จาก environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดหน้า
  useEffect(() => {
    const checkAuth = async () => {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user data:", err);
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ฟังก์ชันสำหรับการเข้าสู่ระบบ
  const signIn = async (username: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    if (!username.trim()) {
      setError("กรุณากรอกชื่อผู้ใช้");
      setIsLoading(false);
      toast.error("กรุณากรอกชื่อผู้ใช้");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data: AuthResponse = await response.json();

      if (data.status === "success" && data.user) {
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsLoading(false);
        return true;
      } else {
        setError(data.message);
        toast.error(data.message);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      const errorMessage = "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error during login:", err);
      setIsLoading(false);
      return false;
    }
  };

  // ฟังก์ชันสำหรับการออกจากระบบ
  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  // ฟังก์ชันตรวจสอบว่าเข้าสู่ระบบแล้วหรือไม่
  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  // ฟังก์ชันตรวจสอบสถานะและ redirect ถ้าจำเป็น
  const requireAuth = (redirectTo: string = "/"): boolean => {
    if (isLoading) return false;

    if (!isAuthenticated()) {
      router.replace(redirectTo);
      return false;
    }

    return true;
  };

  return {
    user,
    isLoading,
    error,
    signIn,
    signOut,
    isAuthenticated,
    requireAuth,
    API_URL,
  };
};
