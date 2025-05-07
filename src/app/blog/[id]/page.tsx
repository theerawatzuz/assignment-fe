"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

// ข้อมูลตัวอย่าง - จะถูกแทนที่ด้วยการดึงข้อมูลจริงจาก API ในอนาคต
const blogPostsData = {
  "blog-1": {
    id: "blog-1",
    title: "Welcome to our Community Platform",
    content: `
      <p>We're excited to launch our new community platform where you can share your thoughts, connect with others, and learn from experts in various fields. Join us on this journey!</p>
      
      <h2>What You Can Do Here</h2>
      <p>Our platform offers a variety of features designed to help you connect, learn, and grow:</p>
      <ul>
        <li>Create and share your own posts</li>
        <li>Comment on others' content and engage in meaningful discussions</li>
        <li>Follow topics and people that interest you</li>
        <li>Participate in virtual events and webinars</li>
        <li>Access exclusive resources and learning materials</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>If you're new here, here are a few tips to help you get started:</p>
      <ol>
        <li>Complete your profile so others can get to know you</li>
        <li>Explore different categories to find topics that interest you</li>
        <li>Follow some active members and engage with their content</li>
        <li>Check out our upcoming events and mark your calendar</li>
        <li>Read through our community guidelines to understand our values and expectations</li>
      </ol>
      
      <p>We're committed to creating a positive and supportive environment where everyone feels welcome and valued. If you have any questions or suggestions, please don't hesitate to reach out to our team.</p>
      
      <p>Thank you for being part of our community. We can't wait to see what you'll contribute!</p>
    `,
    authorName: "Admin",
    authorImage: "/images/profile-placeholder.png",
    category: "Announcements",
    commentCount: 15,
    publishDate: "2023-10-15",
    readTime: "5 min read",
  },
  "blog-2": {
    id: "blog-2",
    title: "Community Guidelines and Best Practices",
    content: `
      <p>To ensure everyone has a positive experience, we've put together some guidelines and best practices for participating in our community. Please take a moment to read through them.</p>
      
      <h2>Respect Everyone</h2>
      <p>Treat all members with respect and kindness. Disagreements are normal, but always focus on the ideas rather than attacking the person. Remember that text can sometimes be misinterpreted, so give people the benefit of the doubt.</p>
      
      <h2>Quality Content</h2>
      <p>When sharing content, aim to provide value to the community. Consider whether your post or comment contributes meaningfully to the discussion. Use clear language and organize your thoughts for better readability.</p>
      
      <h2>Privacy Matters</h2>
      <p>Respect others' privacy and be mindful of what personal information you share. Never share someone else's private information without their explicit consent.</p>
      
      <h2>Intellectual Honesty</h2>
      <p>Give credit where it's due. If you're sharing ideas or content from others, make sure to attribute properly. Plagiarism has no place in our community.</p>
      
      <h2>Constructive Feedback</h2>
      <p>When providing feedback, be constructive and specific. Focus on how something could be improved rather than just pointing out flaws.</p>
      
      <h2>Report Problems</h2>
      <p>If you notice content that violates our guidelines, please report it to the moderation team. We're committed to maintaining a healthy environment and rely on our community to help us identify issues.</p>
      
      <p>Following these guidelines will help us build a vibrant and supportive community where everyone can learn and grow together. Thank you for your cooperation!</p>
    `,
    authorName: "Moderator",
    authorImage: "/images/profile-placeholder.png",
    category: "Guidelines",
    commentCount: 8,
    publishDate: "2023-10-20",
    readTime: "7 min read",
  },
  "blog-3": {
    id: "blog-3",
    title: "Upcoming Features and Improvements",
    content: `
      <p>We're constantly working to improve your experience. Here's a sneak peek at some exciting features and improvements we're planning to roll out in the next few months.</p>
      
      <h2>Enhanced Search Functionality</h2>
      <p>We're upgrading our search system to make it easier for you to find relevant content. The new search will include filters for content type, date range, and more, helping you quickly locate exactly what you're looking for.</p>
      
      <h2>Personalized Content Feed</h2>
      <p>Soon, your home feed will become more personalized based on your interests and interactions. This will help surface content that's most relevant to you while still ensuring you don't miss important community announcements.</p>
      
      <h2>Mobile App</h2>
      <p>We're developing dedicated mobile apps for iOS and Android to provide a smoother experience on mobile devices. The apps will include push notifications, offline reading, and other mobile-specific features.</p>
      
      <h2>Community Challenges</h2>
      <p>We're introducing monthly community challenges to encourage engagement and learning. These challenges will span various topics and will include rewards for participation and outstanding contributions.</p>
      
      <h2>Improved Analytics</h2>
      <p>For content creators, we're adding enhanced analytics to help you understand how your content is performing and who your audience is. This data will help you create more engaging content tailored to your readers' interests.</p>
      
      <h2>Integration with Popular Tools</h2>
      <p>We're working on integrations with commonly used productivity and communication tools to streamline your workflow and make it easier to share content from other platforms.</p>
      
      <p>These are just a few of the improvements we're working on. We're committed to making this platform better every day, and your feedback plays a crucial role in shaping our roadmap. If you have suggestions for features or improvements, please share them with us!</p>
    `,
    authorName: "Developer",
    authorImage: "/images/profile-placeholder.png",
    category: "Updates",
    commentCount: 23,
    publishDate: "2023-11-05",
    readTime: "8 min read",
  },
  "blog-4": {
    id: "blog-4",
    title: "Join Our Weekly Webinars",
    content: `
      <p>Starting next week, we'll be hosting weekly webinars on various topics. These sessions are free for all members and provide a great opportunity to learn and engage with experts.</p>
      
      <h2>Upcoming Schedule</h2>
      <ul>
        <li><strong>November 15:</strong> "Building an Engaged Online Community" with Sarah Johnson</li>
        <li><strong>November 22:</strong> "Content Creation Best Practices" with Michael Chen</li>
        <li><strong>November 29:</strong> "Effective Networking in Digital Spaces" with Priya Patel</li>
        <li><strong>December 6:</strong> "Data Privacy and Security Basics" with Thomas Rodriguez</li>
      </ul>
      
      <h2>How to Join</h2>
      <p>All webinars will be held at 2:00 PM Eastern Time. You can join through the Events section of our platform or through the link that will be emailed to you when you register. Registration opens one week before each session.</p>
      
      <h2>Interactive Format</h2>
      <p>Our webinars are designed to be interactive. While there will be a presentation component, we encourage questions and discussion. You can submit questions in advance when you register or ask them live during the session.</p>
      
      <h2>Recordings Available</h2>
      <p>If you can't attend a session live, don't worry! We'll record all webinars and make them available in our resource library within 48 hours. However, we encourage live attendance when possible to take full advantage of the interactive elements.</p>
      
      <h2>Suggest Topics</h2>
      <p>We want these webinars to be valuable to you. If there's a topic you'd like to see covered in a future session, please let us know through our suggestion form in the Events section.</p>
      
      <p>We're excited to launch this new initiative and look forward to seeing you at our upcoming webinars!</p>
    `,
    authorName: "Events Team",
    authorImage: "/images/profile-placeholder.png",
    category: "Events",
    commentCount: 5,
    publishDate: "2023-11-10",
    readTime: "6 min read",
  },
};

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = blogPostsData[id as keyof typeof blogPostsData];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-red-500">
            ไม่พบบทความที่ต้องการ
          </h1>
          <Link
            href="/blog"
            className="text-green-500 hover:underline mt-4 inline-block"
          >
            กลับไปยังหน้าบทความ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 max-w-3xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* ส่วนหัวของบทความ */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Link
                  href="/blog"
                  className="flex items-center text-green-500 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mr-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  กลับไปยังหน้าบทความ
                </Link>
              </div>

              <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>

              <div className="flex items-center mt-4">
                <div className="flex items-center mr-6">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                    <Image
                      src={
                        post.authorImage || "/images/profile-placeholder.png"
                      }
                      alt={post.authorName}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.authorName}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-500 flex space-x-4">
                  <span>{post.publishDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span className="text-green-500">{post.category}</span>
                </div>
              </div>
            </div>

            {/* เนื้อหาบทความ */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ส่วนท้ายของบทความ */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button className="flex items-center text-gray-500 hover:text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                    ถูกใจ
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">แชร์:</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </button>
                    <button className="text-blue-400 hover:text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </button>
                    <button className="text-blue-700 hover:text-blue-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* ส่วนความคิดเห็น */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                  ความคิดเห็น ({post.commentCount})
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-gray-500">
                    โปรด{" "}
                    <Link
                      href="/login"
                      className="text-green-500 hover:underline"
                    >
                      เข้าสู่ระบบ
                    </Link>{" "}
                    เพื่อแสดงความคิดเห็น
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right sidebar with related content */}
        <div className="hidden lg:block w-64 p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-bold text-lg mb-4">บทความที่เกี่ยวข้อง</h2>
            <ul className="space-y-3">
              {Object.values(blogPostsData)
                .filter((relatedPost) => relatedPost.id !== post.id)
                .slice(0, 3)
                .map((relatedPost) => (
                  <li
                    key={relatedPost.id}
                    className="border-b pb-3 last:border-0"
                  >
                    <Link
                      href={`/blog/${relatedPost.id}`}
                      className="hover:text-green-500"
                    >
                      <p className="font-medium">{relatedPost.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {relatedPost.publishDate}
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-4">หมวดหมู่</h2>
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
