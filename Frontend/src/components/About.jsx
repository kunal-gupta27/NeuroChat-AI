import { useContext } from "react";
import { MyContaxt } from "../MyContaxt";

const About = () => {

  const { theme } = useContext(MyContaxt);

  return (
    <div
      className={`min-h-screen px-10 py-20 transition-all duration-300 ${
        theme
          ? "bg-[#1f1f1f] text-white"
          : "bg-white text-black"
      }`}
    >

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text">
          About NeuroChat AI
        </h1>

        <p
          className={`text-xl leading-10 ${
            theme
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          NeuroChat AI is a modern AI-powered conversational
          platform designed to deliver intelligent, real-time
          interactions with a sleek and immersive user
          experience.
        </p>

        <p
          className={`text-xl leading-10 mt-6 ${
            theme
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          Built using the MERN Stack and integrated with Groq AI,
          NeuroChat AI enables users to generate code, manage
          conversations, explore AI-driven responses, and enjoy
          beautifully formatted markdown with syntax
          highlighting.
        </p>

        <p
          className={`text-xl leading-10 mt-6 ${
            theme
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          The project focuses on performance, responsive UI,
          authentication security, and creating a premium
          AI-chat experience similar to modern SaaS platforms.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">

          {/* Features Card */}
          <div
            className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] ${
              theme
                ? "bg-[rgba(255,255,255,0.04)] border-purple-500/20"
                : "bg-gray-100 border-purple-300"
            }`}
          >
            <h2 className="text-2xl font-bold mb-3">
              🚀 Features
            </h2>

            <ul
              className={`space-y-3 ${
                theme
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              <li>✔ Real-time AI Chat</li>
              <li>✔ Code Generation</li>
              <li>✔ Markdown Rendering</li>
              <li>✔ Syntax Highlighting</li>
              <li>✔ Copy Code Button</li>
              <li>✔ Secure Authentication</li>
              <li>✔ Chat Thread Management</li>
              <li>✔ Dark / Light Theme</li>
            </ul>
          </div>

          {/* Tech Stack Card */}
          <div
            className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-[0_0_25px_rgba(217,70,239,0.35)] ${
              theme
                ? "bg-[rgba(255,255,255,0.04)] border-fuchsia-500/20"
                : "bg-gray-100 border-fuchsia-300"
            }`}
          >
            <h2 className="text-2xl font-bold mb-3">
              💻 Tech Stack
            </h2>

            <ul
              className={`space-y-3 ${
                theme
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              <li>⚡ React.js</li>
              <li>⚡ Tailwind CSS</li>
              <li>⚡ Node.js</li>
              <li>⚡ Express.js</li>
              <li>⚡ MongoDB</li>
              <li>⚡ JWT Authentication</li>
              <li>⚡ Groq API</li>
            </ul>
          </div>
        </div>

        {/* Developer Section */}
<div
  className={`mt-20 rounded-3xl p-10 border backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] ${
    theme
      ? "bg-[rgba(255,255,255,0.04)] border-purple-500/20"
      : "bg-gray-100 border-gray-200"
  }`}
>

  {/* Heading */}
  <h2 className="text-5xl font-extrabold italic mb-8 bg-gradient-to-r from-purple-400 to-fuchsia-500 text-transparent bg-clip-text">
    👨‍💻 Developer
  </h2>

  {/* Intro */}
  <p
    className={`text-lg italic leading-9 mb-8 ${
      theme
        ? "text-gray-300"
        : "text-gray-700"
    }`}
  >
    Passionate MERN Stack Developer focused on building
    modern AI-powered web applications with clean UI,
    responsive design, and seamless user experiences.
  </p>

  {/* Details */}
  <div
    className={`space-y-2 text-xl italic ${
      theme
        ? "text-gray-300"
        : "text-gray-700"
    }`}
  >
    <p>
      <span className="font-bold text-purple-400">
        Name →
      </span>{" "}
      Kunal Gupta
    </p>

    <p>
      <span className="font-bold text-purple-400">
        Email →
      </span>{" "}
      kunalgupta.cse2027@gmail.com
    </p>

    <p>
      <span className="font-bold text-purple-400">
        GitHub →
      </span>{" "}
      <a
        href="https://github.com/kunal-gupta27"
        target="_blank"
        rel="noreferrer"
        className="hover:text-fuchsia-400 transition-all duration-300 underline underline-offset-4"
      >
        github.com/kunalgupta
      </a>
    </p>
  </div>
</div>

        {/* Footer */}
        <div
          className={`mt-20 text-center text-sm ${
            theme
              ? "text-gray-500"
              : "text-gray-700"
          }`}
        >
          © 2026 NeuroChat AI • Built with MERN Stack & Groq AI
        </div>
      </div>
    </div>
  );
};

export default About;