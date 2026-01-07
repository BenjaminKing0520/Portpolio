import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Sample project data
const projects = [
  {
    title: "Blood Bank Management System",
    description: "Java desktop application to manage blood donors and inventory.",
    tech: ["Java", "MySQL", "Swing"],
    image: "/projects/bloodbank.png",
    github: "#",
    demo: "#",
    category: "Web",
  },
  {
    title: "Hotel Management System",
    description: "C# desktop app for hotel booking and billing management.",
    tech: ["C#", ".NET", "SQL Server"],
    image: "/projects/hotel.png",
    github: "#",
    demo: "#",
    category: "Web",
  },
  {
    title: "Theater Seat Booking App",
    description: "Frontend React + Tailwind and backend PHP + MySQL for booking.",
    tech: ["React", "Tailwind", "PHP", "MySQL"],
    image: "/projects/theater.png",
    github: "#",
    demo: "#",
    category: "Web",
  },
  // Add more projects here
];

const categories = ["All", "Web", "Mobile", "Backend", "Other"];

export default function Projects({ theme = "green" }) {
  const [activeCat, setActiveCat] = useState("All");

  const filteredProjects =
    activeCat === "All" ? projects : projects.filter((p) => p.category === activeCat);

  const themeColor =
    theme === "green"
      ? "from-green-300 via-lime-400 to-green-500"
      : "from-blue-400 via-cyan-400 to-blue-600";

  return (
    <div className="min-h-screen bg-[#010204] text-white px-6 md:px-32 py-24">
      <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r ${themeColor}`}>
        Projects
      </h1>

      {/* Category Filters */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full font-semibold border transition
              ${activeCat === cat ? "bg-gradient-to-r " + themeColor : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-green-400">{proj.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-700 rounded">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-3">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-300 hover:text-green-400">
                  <FaGithub /> Code
                </a>
                <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-300 hover:text-green-400">
                  <FaExternalLinkAlt /> Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
