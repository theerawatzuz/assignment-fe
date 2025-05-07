"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      <div className="p-6">
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
    );
  }

  return (
    <div className="p-6">
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

          <div className="flex items-center mt-4 text-gray-600 text-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 mr-2">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  {post.authorName.charAt(0)}
                </div>
              </div>
              <span>{post.authorName}</span>
            </div>

            <span className="mx-2">•</span>
            <span>{post.publishDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="mt-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
        </div>

        {/* เนื้อหาบทความ */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ส่วนท้ายของบทความ */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            แสดงความคิดเห็น
          </h3>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 mb-2">
              แสดงความคิดเห็นในฐานะ <span className="font-medium">Guest</span>
            </p>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-2"
              rows={4}
              placeholder="แสดงความคิดเห็นของคุณที่นี่..."
            ></textarea>
            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                ส่งความคิดเห็น
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-4">
              ความคิดเห็น ({post.commentCount})
            </h4>

            {/* ตัวอย่างความคิดเห็น - ในโปรเจคจริงควรดึงข้อมูลจาก API */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 mr-2">
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      U
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">User123</div>
                    <div className="text-xs text-gray-500">2 วันที่แล้ว</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  บทความนี้มีประโยชน์มาก ขอบคุณที่แบ่งปันข้อมูล!
                </p>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 mr-2">
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      R
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Reader456</div>
                    <div className="text-xs text-gray-500">5 วันที่แล้ว</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  ผมมีคำถามเกี่ยวกับเนื้อหาในส่วนที่ 3 ครับ
                  สามารถอธิบายเพิ่มเติมได้ไหม?
                </p>
              </div>
            </div>

            {/* ปุ่มโหลดความคิดเห็นเพิ่มเติม */}
            <button className="mt-4 text-green-500 hover:underline">
              โหลดความคิดเห็นเพิ่มเติม
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
