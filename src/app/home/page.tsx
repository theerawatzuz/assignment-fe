"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BlogCard from "@/components/BlogCard";

// ข้อมูลตัวอย่าง
const blogPosts = [
  {
    id: "1",
    title: "The Beginning of the End of the World",
    excerpt:
      "The afterlife sitcom The Good Place comes to its culmination, the show's two protagonists, Eleanor and Chidi, contemplate their future. Having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offer...",
    authorName: "Wittawat",
    category: "History",
    commentCount: 32,
  },
  {
    id: "2",
    title: "The Big Short War",
    excerpt:
      "Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate and just the type to make a big wager with no margin for error. But on the night before the S.A.T., his father took pity on him and canceled the bet. \"I would've...",
    authorName: "Zach",
    category: "History",
    commentCount: 4,
  },
  {
    id: "3",
    title: "The Mental Health Benefits of Exercise",
    excerpt:
      "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
    authorName: "Nicholas",
    category: "Exercise",
    commentCount: 32,
  },
  {
    id: "4",
    title: "What Makes a Man Betray His Country?",
    excerpt:
      "The life of Adolf Tolkachev, Soviet dissident and CIA spy. Excerpted from The Billion Dollar Spy: A True Story of Cold War Espionage",
    authorName: "Carl",
    category: "History",
    commentCount: 12,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 max-w-3xl mx-auto px-4 py-6">
          <h1 className="sr-only">Home Page</h1>

          <div className="bg-white rounded-lg shadow-sm">
            {blogPosts.map((post) => (
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
        </main>

        {/* Right sidebar/community section (only visible on large screens) */}
        <div className="hidden lg:block w-64 p-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-4">Community</h2>

            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                General Discussion
              </li>
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                Questions & Answers
              </li>
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                Book Club
              </li>
              <li className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                Writer's Workshop
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
