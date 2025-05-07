"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

// กำหนดรูปแบบข้อมูลผู้ใช้
interface User {
  username: string;
  name: string;
  role: string;
}

// กำหนดรูปแบบ context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: () => boolean;
  signIn: (username: string) => Promise<boolean>;
  signOut: () => void;
}

// สร้าง context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// สร้าง Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ตรวจสอบว่ามีการเข้าสู่ระบบหรือไม่
  const isAuthenticated = () => {
    return user !== null;
  };

  // ฟังก์ชันเข้าสู่ระบบ
  const signIn = async (username: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // จำลองการเรียก API (ในโปรเจคจริงควรเรียก API จริง)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // รายชื่อผู้ใช้ที่อนุญาต
      const validUsers: { [key: string]: User } = {
        datawow: { username: "datawow", name: "Data Wow", role: "admin" },
        userwow: { username: "userwow", name: "User Wow", role: "user" },
        adminwow: { username: "adminwow", name: "Admin Wow", role: "admin" },
      };

      if (validUsers[username]) {
        // ล็อกอินสำเร็จ
        setUser(validUsers[username]);
        toast.success(`ยินดีต้อนรับ, ${validUsers[username].name}!`);
        setIsLoading(false);
        return true;
      } else {
        // ล็อกอินไม่สำเร็จ
        setError("ชื่อผู้ใช้ไม่ถูกต้อง");
        toast.error("ชื่อผู้ใช้ไม่ถูกต้อง");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      toast.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      setIsLoading(false);
      return false;
    }
  };

  // ฟังก์ชันออกจากระบบ
  const signOut = () => {
    setUser(null);
    toast.info("ออกจากระบบแล้ว");
  };

  // ส่งค่า context
  const value = {
    user,
    isLoading,
    error,
    isAuthenticated,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook สำหรับเรียกใช้งาน context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
