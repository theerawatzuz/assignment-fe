"use client";

import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

interface FetchOptions extends RequestInit {
  skipContentType?: boolean;
}

export const useApi = () => {
  // อ่านค่า API URL จาก environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const [state, setState] = useState<{
    isLoading: boolean;
    error: string | null;
  }>({
    isLoading: false,
    error: null,
  });

  /**
   * ฟังก์ชันสำหรับเรียกใช้ API แบบมีการจัดการ state
   */
  const fetchWithState = async <T>(
    endpoint: string,
    options?: FetchOptions
  ): Promise<ApiResponse<T>> => {
    setState({ isLoading: true, error: null });

    try {
      const headers: HeadersInit = {};

      // เพิ่ม Content-Type header ถ้าไม่ได้ระบุให้ข้าม
      if (!options?.skipContentType) {
        headers["Content-Type"] = "application/json";
      }

      // รวม headers จาก options (ถ้ามี)
      const mergedHeaders = {
        ...headers,
        ...(options?.headers || {}),
      };

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: mergedHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data: T = await response.json();
      setState({ isLoading: false, error: null });
      return { data, error: null, isLoading: false };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
      setState({ isLoading: false, error: errorMessage });
      console.error("API error:", error);
      return { data: null, error: errorMessage, isLoading: false };
    }
  };

  /**
   * สร้าง wrapper functions สำหรับแต่ละ HTTP method
   */
  const get = <T>(endpoint: string, options?: FetchOptions) => {
    return fetchWithState<T>(endpoint, { ...options, method: "GET" });
  };

  const post = <T>(endpoint: string, data: any, options?: FetchOptions) => {
    return fetchWithState<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const put = <T>(endpoint: string, data: any, options?: FetchOptions) => {
    return fetchWithState<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  };

  const del = <T>(endpoint: string, options?: FetchOptions) => {
    return fetchWithState<T>(endpoint, { ...options, method: "DELETE" });
  };

  return {
    isLoading: state.isLoading,
    error: state.error,
    get,
    post,
    put,
    delete: del,
    API_URL,
  };
};
