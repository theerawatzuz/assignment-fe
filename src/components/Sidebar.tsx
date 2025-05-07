"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaNewspaper } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4">
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/home"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 text-gray-700"
            >
              <FaHome className="text-lg text-green-500" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 text-gray-700"
            >
              <FaNewspaper className="text-lg text-green-500" />
              <span>Our Blog</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
