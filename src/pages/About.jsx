import { motion, useReducedMotion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import robotIcon from "../assets/robot.png";

/* ---------- Typing Text ---------- */
const TypingText = ({ text, speed = 80, color }) => {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplay((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span className="font-mono tracking-wide" style={{ color, textShadow: `0 0 12px ${color}` }}>
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
};

/* ---------- Split Text ---------- */
const SplitText = ({ text, delay = 0, reduced, color }) => (
  <motion.span
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: { staggerChildren: reduced ? 0.01 : 0.05, delayChildren: delay },
      },
    }}
  >
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        variants={{ hidden: { y: reduced ? 0 : 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        transition={{ duration: reduced ? 0.2 : 0.5 }}
        style={{ color, textShadow: `0 0 12px ${color}` }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.span>
);

/* ---------- Hero About Section ---------- */
export default function HeroAboutSection() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [flash, setFlash] = useState(false);
  const controls = useAnimation();

  // ✅ Theme state
  const [theme, setTheme] = useState("green");
  const themeColor = theme === "green" ? "#4ADE80" : "#38BDF8";

  useEffect(() => setIsMobile(window.innerWidth < 768), []);

  useEffect(() => {
    if (isMobile) return;
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // 🔥 Lightning flash effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      controls.start({ scale: [1, 1.05, 1] });
      setTimeout(() => setFlash(false), 100);
    }, 1200);
    return () => clearInterval(interval);
  }, [controls]);

  const reduced = reducedMotion || isMobile;

  const scrollNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen pt-20 md:pt-24 bg-[#010204] overflow-hidden flex items-center">
      {/* Theme Switch */}
      <button
        onClick={() => setTheme(theme === "green" ? "blue" : "green")}
        className="fixed top-20 right-6 z-50 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur"
      >
        Switch Theme
      </button>

      {/* Lightning Flash */}
      {flash && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.1 }}
        >
          <svg className="w-full h-full">
            <line
              x1={Math.random() * window.innerWidth}
              y1={0}
              x2={Math.random() * window.innerWidth}
              y2={window.innerHeight}
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Mouse Glow */}
      {!isMobile && (
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, ${themeColor}22, transparent 70%)`,
          }}
        />
      )}

      {/* Particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: themeColor }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{ y: [0, -30, 30], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center w-full px-6 md:px-32 gap-12">
        {/* LEFT SIDE - Robot */}
        <motion.div className="flex-1 flex justify-center md:justify-start items-center relative">
          <motion.img
            src={robotIcon}
            alt="Robot"
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
            animate={{ y: [0, -10, 0, -10], rotate: [0, 5, 0, -5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
          />
          <span
            className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border-4 opacity-40 animate-pulse"
            style={{ borderColor: themeColor }}
          ></span>
        </motion.div>

        {/* RIGHT SIDE - TEXT */}
        <motion.div
          initial={{ x: reduced ? 0 : 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: reduced ? 0.4 : 1 }}
          className="flex-1 space-y-4 text-center md:text-left text-xl font-sans"
        >
          <div className="text-4xl md:text-5xl font-extrabold">
            <TypingText
              text="👋 About Me"
              speed={isMobile ? 40 : 80}
              color={themeColor}
            />
          </div>
          <p className="opacity-90">
            <SplitText
              text="I Specialize in React, Frameworks, and Front-end Development."
              reduced={reduced}
              color={themeColor}
            />
          </p>
          <p className="opacity-90">
            <SplitText
              text="Outside of coding, ❤️ I Enjoy Continuous Learning and"
              reduced={reduced}
              color={themeColor}
            />
          </p>
          <p className="opacity-90">
            <SplitText
              text="Knowledge to Inspire Others."
              reduced={reduced}
              color={themeColor}
            />
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start">
            <a
              href="https://github.com/BenjaminKing0520"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/YourLinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://wa.me/+94755391504"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
