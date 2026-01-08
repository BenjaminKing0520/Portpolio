import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [flash, setFlash] = useState(false);
  const [theme, setTheme] = useState("green");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const themeColor = theme === "green" ? "#4ADE80" : "#38BDF8";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await emailjs.send(
        "service_5wuawjm", // 🔁 your Service ID
        "template_6n4ffjg", // 🔁 your Template ID
        {
          name: form.name,
          email: form.user_email,
          subject: form.subject,
          message: form.message,
        },
        "YrUIagTil4wABxoK_" // 🔁 your Public Key
      );

      setStatus({ ok: true, msg: "Message sent successfully!" });
      setForm({ name: "", user_email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus({ ok: false, msg: "Email failed. Please try again!" });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (status) {
      const t = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(t);
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

      <main className="flex-grow text-center px-4 pt-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Contact Us</h1>
        <p className="text-base md:text-lg mb-10 opacity-80">
          We’d love to hear from you 💌
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto bg-[#010204]/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl flex flex-col gap-5"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="rounded-2xl px-4 py-3 bg-[#121314]/80 border border-current"
          />

          <input
            type="email"
            name="user_email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="rounded-2xl px-4 py-3 bg-[#121314]/80 border border-current"
          />

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="rounded-2xl px-4 py-3 bg-[#121314]/80 border border-current"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="rounded-2xl px-4 py-3 resize-none bg-[#121314]/80 border border-current"
          />

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: themeColor }}
            className="text-[#121314] py-3 rounded-2xl font-semibold"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>
        </form>
      </main>

      {status && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl ${
              status.ok
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status.ok ? <CheckCircle /> : <XCircle />}
            <span>{status.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
