import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// ================= PROJECT DATA =================
const projects = [
  {
    title: "Blood Bank Management System",
    description:
      "Java desktop application to manage blood donors, inventory, and reports.",
    tech: ["Java", "MySQL", "Swing"],
    image: "/BloodBank.png",
    github: "https://github.com/BenjaminKing0520/BloodBankSystem.git",
    category: "Desktop App",
  },
  {
    title: "Hakeem Art Academy Website",
    description:
      "Modern React website showcasing courses, events, and academy content.",
    tech: ["React", "Tailwind CSS"],
    image: "/HakeemArt.png",
    github: "https://github.com/BenjaminKing0520/Hakeem-Art-Academy.git",
    demo: "https://hakeem-art-academy.vercel.app/",
    category: "Web App",
  },
  {
    title: "Car Booking Web App",
    description: "Car rental and booking system using PHP and MySQL backend.",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    image: "/CarReant.png",
    github: "https://github.com/BenjaminKing0520/Ruzaik-rent-car.git",
    category: "Web App",
  },
];

// ================= CATEGORIES =================
const categories = ["All", "Web App", "Desktop App"];

// ================= COMPONENT =================
export default function Projects({ theme = "green" }) {
  const [activeCat, setActiveCat] = useState("All");

  const filteredProjects =
    activeCat === "All"
      ? projects
      : projects.filter((p) => p.category === activeCat);

  const themeGradient =
    theme === "green"
      ? "from-green-300 via-lime-400 to-green-500"
      : "from-blue-400 via-cyan-400 to-blue-600";

  const accentText = theme === "green" ? "text-green-400" : "text-cyan-400";

  return (
    <div className="min-h-screen bg-[#010204] text-white px-6 md:px-20 lg:px-32 py-24">
      {/* Title */}
      <h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-16"
        style={{ color: "#4ADE80" }}
      >
        Projects
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-14 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2 rounded-full font-semibold border transition-all duration-300
              ${
                activeCat === cat
                  ? `bg-gradient-to-r ${themeGradient} text-black`
                  : "bg-gray-900 border-gray-700 hover:bg-gray-800"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl group"
          >
            {/* Category Badge */}
            <span className="absolute top-3 right-3 z-10 text-xs px-3 py-1 rounded-full bg-black/70 backdrop-blur">
              {proj.category}
            </span>

            {/* Image */}
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Content */}
            <div className="p-5">
              <h3 className={`text-xl font-bold ${accentText}`}>
                {proj.title}
              </h3>

              <p className="text-gray-300 text-sm mt-2">{proj.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-3">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-gray-800 rounded-full border border-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-5 mt-4">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  <FaGithub /> Code
                </a>

                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
