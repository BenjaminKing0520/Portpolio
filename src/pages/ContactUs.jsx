import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [flash, setFlash] = useState(false);
  const [theme, setTheme] = useState("green"); // "green" or "blue"
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const themeColor = theme === "green" ? "#4ADE80" : "#38BDF8";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:5000/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ ok: true, msg: "Message sent successfully!" });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ ok: false, msg: data.error || "Mail failed!" });
      }
    } catch (error) {
      setStatus({ ok: false, msg: "Network error. Server not running!" });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
    }, 1500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="relative flex flex-col min-h-screen overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "#010204", color: themeColor }}
    >
      {/* Theme Switch */}
      <button
        onClick={() => setTheme(theme === "green" ? "blue" : "green")}
        className="fixed top-20 right-6 z-50 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur hover:brightness-110 transition shadow-lg"
      >
        Switch Theme
      </button>

      {/* Lightning Flash */}
      {flash && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="w-full h-full bg-white/40 animate-flash"></div>
        </div>
      )}

      {/* Mouse Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, ${themeColor}33, transparent 70%)`,
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: themeColor,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <main className="flex-grow text-center px-4 pt-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Contact Us</h1>
        <p className="text-base md:text-lg mb-10 opacity-80">We’d love to hear from you 💌</p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto bg-[#010204]/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl flex flex-col gap-5"
        >
          {/* Rounded Neon Inputs */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="rounded-2xl px-4 py-3 text-current bg-[#121314]/80 border border-current placeholder:text-current/60 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ boxShadow: `0 0 10px ${themeColor}66` }}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="rounded-2xl px-4 py-3 text-current bg-[#121314]/80 border border-current placeholder:text-current/60 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ boxShadow: `0 0 10px ${themeColor}66` }}
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="rounded-2xl px-4 py-3 text-current bg-[#121314]/80 border border-current placeholder:text-current/60 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ boxShadow: `0 0 10px ${themeColor}66` }}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="rounded-2xl px-4 py-3 resize-none text-current bg-[#121314]/80 border border-current placeholder:text-current/60 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ boxShadow: `0 0 10px ${themeColor}66` }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: themeColor }}
            className="text-[#121314] py-3 text-base rounded-2xl font-semibold hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>
        </form>
      </main>

      {/* Popup Message */}
      {status && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-slideIn">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg backdrop-blur-md ${
              status.ok ? `bg-green-100/90 text-green-800` : `bg-red-100/90 text-red-800`
            }`}
          >
            {status.ok ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            <span className="font-medium text-sm">{status.msg}</span>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes flash {
            0% { opacity: 0; }
            50% { opacity: 0.8; }
            100% { opacity: 0; }
          }
          .animate-flash {
            animation: flash 0.15s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
}
