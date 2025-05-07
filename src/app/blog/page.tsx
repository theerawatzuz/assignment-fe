"use client";

import React from "react";
import BlogCard from "@/components/BlogCard";

// ข้อมูลตัวอย่าง - บทความจากผู้เขียนของเว็บไซต์
const officialBlogPosts = [
  {
    id: "blog-1",
    title: "Welcome to our Community Platform",
    excerpt:
      "We're excited to launch our new community platform where you can share your thoughts, connect with others, and learn from experts in various fields. Join us on this journey!",
    authorName: "Admin",
    category: "Announcements",
    commentCount: 15,
  },
  {
    id: "blog-2",
    title: "Community Guidelines and Best Practices",
    excerpt:
      "To ensure everyone has a positive experience, we've put together some guidelines and best practices for participating in our community. Please take a moment to read through them.",
    authorName: "Moderator",
    category: "Guidelines",
    commentCount: 8,
  },
  {
    id: "blog-3",
    title: "Upcoming Features and Improvements",
    excerpt:
      "We're constantly working to improve your experience. Here's a sneak peek at some exciting features and improvements we're planning to roll out in the next few months.",
    authorName: "Developer",
    category: "Updates",
    commentCount: 23,
  },
  {
    id: "blog-4",
    title: "Join Our Weekly Webinars",
    excerpt:
      "Starting next week, we'll be hosting weekly webinars on various topics. These sessions are free for all members and provide a great opportunity to learn and engage with experts.",
    authorName: "Events Team",
    category: "Events",
    commentCount: 5,
  },
];

export default function BlogPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-500">Our Blog</h1>
        <p className="text-gray-600 mt-2">
          Official updates, announcements, and articles from our team
        </p>
      </div>

      <div className="flex">
        <div className="flex-1 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm">
            {officialBlogPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                authorName={post.authorName}
                category={post.category}
                commentCount={post.commentCount}
              />
            ))}
          </div>
        </div>

        {/* Right sidebar with featured content */}
        <div className="hidden lg:block w-64 ml-6">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-bold text-lg mb-4">Subscribe</h2>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest updates delivered directly to your inbox
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-4">Categories</h2>
            <ul className="space-y-1">
              <li className="text-green-500 hover:underline cursor-pointer">
                Announcements
              </li>
              <li className="text-green-500 hover:underline cursor-pointer">
                Guidelines
              </li>
              <li className="text-green-500 hover:underline cursor-pointer">
                Updates
              </li>
              <li className="text-green-500 hover:underline cursor-pointer">
                Events
              </li>
              <li className="text-green-500 hover:underline cursor-pointer">
                Tutorials
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
