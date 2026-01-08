import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import devImg from "../assets/CV1.jpg";

export default function Footer() {
  const [typed, setTyped] = useState("");
  const [theme, setTheme] = useState("green"); // 🌈 Theme toggle

  const text = `© ${new Date().getFullYear()} MyPortfolio. All Rights Reserved.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  // Theme-based colors
  const themeColors = {
    green: {
      gradient: "from-green-400 via-lime-400 to-green-500",
      border: "border-green-400",
      glow: "from-green-400 via-lime-400 to-green-500",
      text: "text-[#4ADE80]",
    },
    blue: {
      gradient: "from-blue-400 via-cyan-400 to-blue-600",
      border: "border-cyan-400",
      glow: "from-blue-400 via-cyan-400 to-blue-600",
      text: "text-cyan-400",
    },
  };

  const current = themeColors[theme];

  // Social links
  const socialLinks = [
    { icon: FaFacebook, url: "https://www.facebook.com/share/17vLoetNB2/" },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/rohan-benjamin-708909289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    { icon: FaWhatsapp, url: "https://wa.me/+94755391504" },
    { icon: FaPhoneAlt, url: "tel:+94755391504" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#010204]">
      {/* Glow Background */}
      <div
        className={`absolute inset-0 opacity-30 blur-3xl animate-gradient-x bg-gradient-to-r ${current.glow} -z-10`}
      ></div>

      {/* Theme Switch */}
      <button
        onClick={() => setTheme(theme === "green" ? "blue" : "green")}
        className="fixed bottom-6 left-6 z-50 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white backdrop-blur transition-all duration-300"
      >
        Switch Theme
      </button>

      <motion.div
        className={`relative border rounded-3xl shadow-2xl p-6 md:p-10 border-opacity-50 ${current.border}`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Social Icons */}
          <div className="flex gap-5 md:w-1/3 justify-center md:justify-start">
            {socialLinks.map(({ icon: Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl hover:scale-125 hover:-translate-y-1 transition-all duration-300 ${current.text}`}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Center Text */}
          <div className="text-center md:w-1/3">
            <p className={`text-sm font-mono opacity-80 ${current.text}`}>
              {typed}
            </p>
            <p className={`mt-3 text-sm ${current.text}`}>Developed ❤️ by</p>
            <p
              className={`font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r ${current.gradient}`}
            >
              Rohan Benjamin
            </p>
            <p className={`text-sm font-medium opacity-80 ${current.text}`}>
              Full-Stack Developer
            </p>
          </div>

          {/* Developer Image */}
          <div className="md:w-1/3 flex justify-end">
            <motion.img
              whileHover={{ scale: 1.15, rotate: 3 }}
              src={devImg}
              alt="Developer"
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-xl transition-shadow ${current.border}`}
            />
          </div>
        </div>

        {/* Back-to-top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 p-2 rounded-full shadow-2xl z-50 hover:scale-110 transition-all duration-300 ${current.text}`}
        >
          <FaArrowUp />
        </motion.button>
      </motion.div>
    </footer>
  );
}
