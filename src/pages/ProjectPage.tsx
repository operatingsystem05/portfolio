import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEmbed from "../components/CodeEmbed";
import { projects } from "../data/projects";

type Embed = {
  label: string;
  src?: string;
  html?: string;
};

type Download = {
  label: string;
  file: string;
};

type ProjectExtended = (typeof projects)[number] & {
  images?: string[];
  code?: { html?: string; css?: string; js?: string };
  embeds?: Embed[];
  downloads?: Download[];
  wide?: boolean;
  summary?: string;
  imageContain?: boolean;
};

const EMBED_SIZES: Record<string, { width: number; height: number }> = {
  "exits — the blog": { width: 980, height: 900 },
  "sweep my mind — the game": { width: 860, height: 600 },
};

function isVideo(src: string) {
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug) as
    | ProjectExtended
    | undefined;

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-black p-6 text-sm font-sans lowercase">
        project not found.
      </div>
    );
  }

  const images: string[] =
    project.images ?? (project.image ? [project.image] : []);

  const maxWidth = project.wide ? "max-w-[960px]" : "max-w-[520px]";

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className={`${maxWidth} w-full mx-auto px-5 py-8 sm:px-6 sm:py-10`}>
        {/* Title + date */}
        <div className="mb-4">
          <h1 className="text-base font-bold uppercase leading-tight tracking-wide">
            {project.title}
          </h1>
          <p className="text-sm text-neutral-400 lowercase">{project.date}</p>
        </div>

        {/* Disciplines */}
        {project.disciplines && (
          <p className="text-xs text-neutral-400 uppercase font-semibold mb-4 tracking-wide">
            {project.disciplines.join(", ")}
          </p>
        )}

        {/* Description */}
        <p className="text-sm leading-relaxed lowercase text-neutral-600 mb-8">
          {project.description}
        </p>

        {/* Downloads */}
        {project.downloads && (
          <div className="flex gap-4 mb-8">
            {project.downloads.map((d, i) => (
              <a
                key={i}
                href={d.file}
                download
                className="text-xs font-mono uppercase tracking-wide border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {d.label}
              </a>
            ))}
          </div>
        )}

        {/* Images / videos */}
        {images.length > 0 && (
          <div className="mb-10">
            <div className="grid grid-cols-3 gap-1.5">
              {images.map((src, i) =>
                isVideo(src) ? (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden cursor-pointer"
                    onClick={() => setLightboxSrc(src)}
                  >
                    <video
                      src={src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <button
                    key={i}
                    onClick={() => setLightboxSrc(src)}
                    className="block w-full cursor-zoom-in overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`${project.title} ${i + 1}`}
                      className={`w-full transition duration-300 ${
                        project.imageContain
                          ? "object-contain"
                          : "aspect-square object-cover"
                      }`}
                    />
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* Embeds */}
        {project.embeds?.map((embed, i) => {
          const sizes = EMBED_SIZES[embed.label] ?? { width: 860, height: 700 };
          const isSrc = Boolean(embed.src);
          const isGame = embed.label.includes("game");

          return (
            <div key={i} className="mb-10">
              <p className="text-xs text-neutral-400 font-mono mb-2 lowercase tracking-wide">
                — {embed.label}
              </p>
              <div
                className="border border-neutral-200 overflow-auto"
                style={{ height: `${sizes.height}px` }}
              >
                <div style={{ width: `${sizes.width}px`, height: "100%" }}>
                  {isSrc ? (
                    <iframe
                      src={embed.src}
                      title={embed.label}
                      style={{
                        width: `${sizes.width}px`,
                        height: "100%",
                        border: "none",
                        display: "block",
                      }}
                      scrolling={isGame ? "no" : "yes"}
                    />
                  ) : (
                    <iframe
                      srcDoc={(embed as { html?: string }).html}
                      title={embed.label}
                      sandbox="allow-scripts allow-same-origin"
                      style={{
                        width: `${sizes.width}px`,
                        height: "100%",
                        border: "none",
                        display: "block",
                      }}
                      scrolling={isGame ? "no" : "yes"}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Code embed */}
        {project.code && <CodeEmbed files={project.code} />}
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out p-4"
          onClick={() => setLightboxSrc(null)}
        >
          {isVideo(lightboxSrc) ? (
            <video
              src={lightboxSrc}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={lightboxSrc}
              alt="close up"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
}
