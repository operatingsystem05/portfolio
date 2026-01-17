import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Projects from "./components/Projects";

export default function App() {
  const [selectedType, setSelectedType] = useState("all");

  return (
    <div className="min-h-screen text-black flex flex-row items-start px-4 py-8 gap-8">
      <Sidebar selectedType={selectedType} setSelectedType={setSelectedType} />
      <main className="flex-1">
        <Projects selectedType={selectedType} />
      </main>
    </div>
  );
}
