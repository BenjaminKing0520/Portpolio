import { motion } from "framer-motion";

export default function SkillSection() {
  const skills = [
    { title: "HTML", level: 95, icon: "🌐" },
    { title: "CSS", level: 90, icon: "🎨" },
    { title: "JavaScript", level: 75, icon: "💻" },
    { title: "Tailwind CSS", level: 90, icon: "🖌️" },
    { title: "Java", level: 60, icon: "☕" },
    { title: "Node.js", level: 50, icon: "🟢" },
    { title: "PHP", level: 70, icon: "🐘" },
    { title: "SQL & MySQL", level: 75, icon: "🗄️" },
    { title: "React.js", level: 70, icon: "⚛️" },
  ];

  return (
    <section className="py-16 bg-[#010204]">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-center text-green-400 mb-14"
      >
        My Skills
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="relative group"
          >
            {/* Neon Glow Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 blur-2xl opacity-25 group-hover:opacity-60 transition duration-300 animate-pulse"></div>

            <div className="relative bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-700">
              <motion.div
                whileHover={{ scale: 1.3, rotate: 15 }}
                className="text-5xl mb-4 text-center"
              >
                {skill.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-green-400 text-center">
                {skill.title}
              </h3>
              <div className="mt-3">
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, delay: i * 0.2 }}
                    className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-sm text-gray-400 mt-1 text-center">
                  Level: {skill.level}%
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
