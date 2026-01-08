import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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
  {
    title: "Book Store Web App",
    description: "Book buy and order placement system using PHP and MySQL.",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    image: "/BookStore.png",
    github: "https://github.com/BenjaminKing0520/BookStore.git",
    category: "Web App",
  },
];

export default function ProjectsCarousel({ theme = "green" }) {
  const [activeCat, setActiveCat] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ["All", "Web App", "Desktop App"];

  const filteredProjects =
    activeCat === "All"
      ? projects
      : projects.filter((p) => p.category === activeCat);

  const themeGradient =
    theme === "green"
      ? "from-green-300 via-lime-400 to-green-500"
      : "from-blue-400 via-cyan-400 to-blue-600";

  const accentText = theme === "green" ? "text-green-400" : "text-cyan-400";

  const prevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(
      currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#010204] text-white px-6 md:px-20 lg:px-32 py-24">
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
            onClick={() => {
              setActiveCat(cat);
              setCurrentIndex(0); // Reset index on category change
            }}
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

      {/* Carousel */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-3 bg-black/50 rounded-full hover:bg-black/80 transition"
        >
          &#10094;
        </button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-900 rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src={filteredProjects[currentIndex].image}
            alt={filteredProjects[currentIndex].title}
            className="w-full h-64 object-cover"
          />
          <div className="p-5">
            <h3 className={`text-xl font-bold ${accentText}`}>
              {filteredProjects[currentIndex].title}
            </h3>
            <p className="text-gray-300 mt-2">
              {filteredProjects[currentIndex].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {filteredProjects[currentIndex].tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-gray-800 rounded-full border border-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-5 mt-4">
              <a
                href={filteredProjects[currentIndex].github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <FaGithub /> Code
              </a>
              {filteredProjects[currentIndex].demo && (
                <a
                  href={filteredProjects[currentIndex].demo}
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

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-3 bg-black/50 rounded-full hover:bg-black/80 transition"
        >
          &#10095;
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {filteredProjects.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              idx === currentIndex ? "bg-green-400" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
