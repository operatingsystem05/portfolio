import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import head from "./assets/headd.png";
import About from "./pages/About";
import Collab from "./pages/Collab";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  const basePoem = {
    line1: "here: home of my works",
    line2: "website: built by yours truly.",
  };

  const [poem, setPoem] = useState(basePoem);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setPoem((prev) => {
        if (prev.line1 !== basePoem.line1 || prev.line2 !== basePoem.line2) {
          return basePoem;
        }
        return prev;
      });
    }
  }, [location.pathname]);

  function mutateBothLines(prev: { line1: string; line2: string }) {
    const synonyms: Record<string, string[]> = {
      here: ["here", "this place", "this corner"],
      home: ["space", "room", "nest"],
      works: ["pieces", "works", "creations"],
      website: ["website", "portfolio", "index"],
      built: ["coded", "crafted", "assembled"],
      truly: ["lovingly", "carefully", "intentionally"],
    };
    function mutateLine(text: string) {
      return text
        .split(" ")
        .map((word) => {
          const match = word.match(/^([a-zA-Z]+)([^a-zA-Z]*)$/);
          if (!match) return word;
          const [, core, punctuation] = match;
          if (synonyms[core]) {
            const options = synonyms[core];
            return (
              options[Math.floor(Math.random() * options.length)] + punctuation
            );
          }
          return word;
        })
        .join(" ");
    }
    return { line1: mutateLine(prev.line1), line2: mutateLine(prev.line2) };
  }

  useEffect(() => {
    const handler = () => setPoem((prev) => mutateBothLines(prev));
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const isStandalone =
    location.pathname.startsWith("/projects/") ||
    location.pathname === "/collab";

  if (isStandalone) {
    return (
      <Routes>
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/collab" element={<Collab />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* HEADER — no border */}
      <header className="px-6 py-6 flex items-start gap-6">
        {/* Portrait */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={head}
            alt="portrait"
            className="w-[120px] sm:w-[140px] object-cover cursor-pointer"
          />
        </Link>

        {/* Poem — right of portrait */}
        <div className="flex-1 pt-1">
          <p className="text-md text-neutral-800 leading-relaxed font-semibold">
            {poem.line1}
            <br />
            {poem.line2}
          </p>
        </div>

        {/* Nav — about + email stacked, far right */}
        <nav className="flex flex-col items-end gap-1.5 pt-1 flex-shrink-0">
          <Link
            to="/about"
            className="text-sm text-neutral-800 uppercase font-semibold tracking-wide hover:text-black transition-colors"
          >
            about
          </Link>
          <a
            href="mailto:ouma1ma@proton.me"
            className="text-sm text-neutral-800 uppercase font-semibold tracking-wide hover:text-black transition-colors"
          >
            email
          </a>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/collab" element={<Collab />} />
        </Routes>
      </main>
    </div>
  );
}
