"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";

export default function LayoutTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // หน้าล็อกอินไม่แสดง navbar และ sidebar
  const isLoginPage = pathname === "/";

  return (
    <AuthProvider>
      {isLoginPage ? (
        <>{children}</>
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Navbar fixed บนสุด */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>

          <div className="flex flex-1 pt-[61px]">
            {/* สูงเท่ากับความสูงของ Navbar */}
            {/* Sidebar fixed ด้านซ้าย */}
            <div className="fixed left-0 top-[61px] bottom-0 z-40 w-64">
              <Sidebar />
            </div>
            {/* เนื้อหาหลักที่สามารถเลื่อนได้ */}
            <div className="flex-1 ml-64 overflow-y-auto bg-gray-50 min-h-screen">
              {children}
            </div>
          </div>
        </div>
      )}
    </AuthProvider>
  );
}
