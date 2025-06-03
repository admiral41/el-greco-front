"use client";
export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}
