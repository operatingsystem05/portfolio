import { projects } from "../data/projects";

type Project = (typeof projects)[number] & {
  wide?: boolean;
  images?: string[];
  summary?: string;
};

function openProject(project: Project) {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    window.location.href = `/projects/${project.slug}`;
  } else {
    const w = project.wide ? 1100 : 500;
    const h = project.wide ? 900 : 800;
    window.open(
      `/projects/${project.slug}`,
      `project-${project.slug}`,
      `width=${w},height=${h},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`,
    );
  }
}

const sortedProjects = [...(projects as Project[])].reverse();

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {sortedProjects.map((p) => (
        <div
          key={p.slug}
          className="flex flex-row gap-4 md:gap-6 py-6 group cursor-pointer items-start"
          onClick={() => openProject(p)}
        >
          {/* LEFT — title + meta + summary */}
          <div className="flex flex-row gap-4 md:gap-6 flex-1 min-w-0">
            {/* Title + wip/rejected */}
            <div className="w-[140px] md:w-[160px] flex-shrink-0">
              <p className="text-sm font-bold uppercase leading-tight tracking-wide text-black group-hover:text-red-600 transition-colors">
                {p.title}
              </p>
              <div className="flex gap-2 mt-1">
                {p.wip && (
                  <span className="text-[10px] text-green-600 font-mono">
                    wip
                  </span>
                )}
                {p.rejected && (
                  <span className="text-[10px] text-red-500 font-mono">
                    rejected
                  </span>
                )}
              </div>
            </div>

            {/* Date */}
            <div className="w-[70px] flex-shrink-0">
              <p className="text-xs text-neutral-400 uppercase font-semibold">
                {p.date}
              </p>
            </div>

            {/* Disciplines + summary */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-neutral-400 uppercase font-semibold mb-1 tracking-wide">
                {p.disciplines?.join(", ")}
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {p.summary ?? p.description}
              </p>
            </div>
          </div>

          {/* RIGHT — thumbnail always inline on same row */}
          <div className="flex-shrink-0 self-start">
            <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
