"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-full max-w-lg bg-white/10 backdrop-blur-md rounded-full p-1 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <input
        type="text"
        placeholder="Enter a username..."
        className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 px-4 py-2 rounded-l-full focus:outline-none focus:ring-0"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
      >
        Search
      </button>
    </motion.form>
  );
}
