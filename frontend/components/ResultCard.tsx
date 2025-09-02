"use client";

import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ResultCard({ site, url, icon, username, profilePic }) {
  return (
    <motion.a
      variants={item}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between hover:bg-white/20 transition-all duration-300 shadow-lg"
      whileHover={{ scale: 1.03 }}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={icon} alt={site} className="w-10 h-10 rounded-lg" />
        <div className="flex flex-col text-left">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {site}
          </span>
          <span className="text-sm font-semibold text-gray-100 truncate max-w-[140px]">
            {username}
          </span>
        </div>
      </div>

      {/* Right: Profile picture */}
      {profilePic && (
        <img
          src={profilePic}
          alt={`${username} profile`}
          className="w-12 h-12 rounded-full object-cover border border-white/30 shadow-sm"
        />
      )}
    </motion.a>
  );
}

