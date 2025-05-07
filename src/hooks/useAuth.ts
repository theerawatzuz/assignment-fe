"use client";

import { useAuth as useAuthContext } from "@/contexts/AuthContext";

// Re-export useAuth hook จาก context
export const useAuth = useAuthContext;
