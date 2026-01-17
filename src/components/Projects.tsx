import React from "react";

export default function Projects({ selectedType }) {
  const projects = [
    {
      id: 1,
      title: "Poster",
      type: "graphic design",
      image: "/images/poster.jpg",
    },
    {
      id: 2,
      title: "Typeface",
      type: "type design",
      image: "/images/typeface.jpg",
    },
    {
      id: 3,
      title: "Portraits",
      type: "photography",
      image: "/images/portraits.jpg",
    },
  ];

  const filtered =
    selectedType === "all"
      ? projects
      : projects.filter((p) => p.type === selectedType);

  const openProjectWindow = (id) => {
    window.open(
      `/projects/${id}`,
      "projectWindow",
      "width=500,height=800,menubar=no,toolbar=no,location=no,status=no",
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filtered.map((project) => (
        <button
          key={project.id}
          onClick={() => openProjectWindow(project.id)}
          className="group block w-full aspect-square overflow-hidden text-left"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
          />

          <p className="mt-2 text-sm font-semibold lowercase transition-colors duration-300 group-hover:text-red-500">
            {project.title}
          </p>
        </button>
      ))}
    </div>
  );
}
