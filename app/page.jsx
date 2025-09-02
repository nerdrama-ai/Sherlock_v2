"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import { fetchSherlock } from "../lib/api";

export default function HomePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (username) => {
    setLoading(true);
    setResults([]);
    try {
      const data = await fetchSherlock(username); // ✅ use backend API
      setResults(data.results || []); // fallback to empty if no results
    } catch (err) {
      console.error("❌ Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

  // Animation settings
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 font-sans p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Sherlock Web
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p className="mt-6 text-gray-400 animate-pulse">🔍 Searching...</p>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {results.map((r, i) => (
          <ResultCard key={i} {...r} />
        ))}
      </motion.div>
    </main>
  );
}
