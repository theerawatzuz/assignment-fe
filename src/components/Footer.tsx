export default function Footer() {
  return (
    <footer className="bg-white shadow-md dark:bg-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-4 max-w-5xl text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} เว็บบอร์ดถาม-ตอบ. สงวนลิขสิทธิ์.
        </p>
      </div>
    </footer>
  );
}
