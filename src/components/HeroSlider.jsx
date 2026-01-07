import { motion, useReducedMotion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import profilePic from "../assets/CV1.jpg";

/* ---------- Typing AI Text ---------- */
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
    <span
      className="font-mono tracking-wide animate-pulse"
      style={{ color, textShadow: `0 0 10px ${color}` }}
    >
      {display}|
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
        transition: {
          staggerChildren: reduced ? 0.01 : 0.05,
          delayChildren: delay,
        },
      },
    }}
  >
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { y: reduced ? 0 : 30, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        transition={{ duration: reduced ? 0.2 : 0.5 }}
        style={{ color, textShadow: `0 0 12px ${color}` }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.span>
);

/* ---------- Hero Section ---------- */
export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  /* 3D TILT */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  /* THEME */
  const [theme, setTheme] = useState("green");
  const themeColor = theme === "green" ? "#4ADE80" : "#38BDF8";

  /* Parallax background depth */
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  /* Lightning / beat */
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const move = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  const reduced = reducedMotion || isMobile;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: (y / rect.height - 0.5) * 15,
      y: (x / rect.width - 0.5) * -15,
    });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // 🔥 BEAT LOOP (every 1.2s simulate a flash)
  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      controls.start({ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] });
      setTimeout(() => setFlash(false), 100);
    }, 1200);
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div className="relative min-h-screen pt-20 md:pt-24 bg-[#010204] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#010204] to-[#000000]"
        style={{
          transform: `translateX(${parallax.x * 1.5}px) translateY(${
            parallax.y * 1.5
          }px)`,
        }}
      />

      {/* Theme Switch */}
      <button
        onClick={() => setTheme(theme === "green" ? "blue" : "green")}
        className="fixed top-20 right-6 z-50 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur"
      >
        Switch Theme
      </button>

      {/* Lightning Flashes */}
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

      <div className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-32 z-10">
        {/* TEXT */}
        <motion.div
          initial={{ x: reduced ? 0 : -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: reduced ? 0.4 : 1 }}
          className="flex-1 space-y-5 text-center md:text-left"
        >
          <TypingText
            text="👋 Hi, I'm a Passionate Web Developer"
            color={themeColor}
          />
          <h1 className="text-4xl md:text-6xl font-extrabold">
            <SplitText
              text="Rohan Benjamin"
              reduced={reduced}
              color={themeColor}
            />
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold">
            <SplitText
              text="Full-Stack Developer"
              delay={0.3}
              reduced={reduced}
              color={themeColor}
            />
          </h2>
          <p className="text-lg opacity-90">
            <SplitText
              text="Higher National Diploma in IT"
              delay={0.6}
              reduced={reduced}
              color={themeColor}
            />
          </p>
          <p className="text-lg opacity-90">
            <SplitText
              text="SLIATE"
              delay={0.9}
              reduced={reduced}
              color={themeColor}
            />
          </p>

          {/* ---------- MOBILE + DESKTOP SAFE CV BUTTON ---------- */}
          <motion.button
            onClick={async () => {
              try {
                const response = await fetch("/My CV.pdf");
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "RohanBenjamin_CV.pdf";
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                console.error("Failed to download CV:", err);
              }
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: themeColor,
              boxShadow: `0 0 25px ${themeColor}`,
            }}
            className="mt-6 px-6 py-3 rounded-full font-semibold text-black"
          >
            ⬇️ Download CV
          </motion.button>
        </motion.div>

        {/* IMAGE: 3D TILT + BEAT */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0"
          animate={controls}
        >
          <div
            className="relative w-64 h-64 md:w-80 md:h-80"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: themeColor }}
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
              />
            ))}
            <motion.span
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ backgroundColor: themeColor }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: themeColor }}
              animate={!reduced ? { rotate: 360 } : {}}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              animate={!reduced ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
