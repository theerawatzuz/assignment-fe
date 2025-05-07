"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { FaHome, FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  return (
    <div className="w-full bg-green-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center">
          <Link href="/home" className="font-castoro text-2xl italic">
            a Board
          </Link>
        </div>

        {/* Center search */}
        <div className="hidden md:flex items-center flex-1 max-w-xl px-4">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 pl-10 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:bg-white/20 transition-all"
            />
            <BiSearch className="absolute left-3 top-3 text-white/70" />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated() ? (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <div className="group relative">
                  <button className="flex items-center space-x-1 text-white hover:text-white/80">
                    <span>Community</span>
                    <IoMdArrowDropdown />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="py-1">
                      <Link
                        href="/community/forums"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Forums
                      </Link>
                      <Link
                        href="/community/groups"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Groups
                      </Link>
                      <Link
                        href="/community/events"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Events
                      </Link>
                    </div>
                  </div>
                </div>
                <button className="bg-success hover:bg-success/90 text-white px-4 py-2 rounded flex items-center">
                  <span className="mr-1">Create</span>
                  <span>+</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <button
                  onClick={signOut}
                  className="bg-white text-green-500 px-4 py-1 rounded-md hover:bg-gray-100 text-sm font-medium transition"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => router.push("/")}
              className="bg-success hover:bg-success/90 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
