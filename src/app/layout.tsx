import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "เว็บบอร์ดถาม-ตอบ",
  description: "เว็บบอร์ดสำหรับให้ผู้ใช้สามารถตั้งคำถามและแสดงความคิดเห็น",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
