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
  pdfs?: Download[];
  wide?: boolean;
  summary?: string;
  imageContain?: boolean;
};

const EMBED_HEIGHTS: Record<string, number> = {
  "exits (blog)": 850,
  "sweep my mind (game)": 620,
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

  // `project.image` is the card/thumbnail image used elsewhere (e.g. the home
  // grid) — only an explicit `images` array should render in the detail-page
  // gallery, otherwise the thumbnail leaks in for projects that only have a
  // pdf/embed and no real gallery (e.g. Dyke March Speech's mic.webp).
  const images: string[] = project.images ?? [];

  const maxWidth = project.wide ? "max-w-[1100px]" : "max-w-[520px]";

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
            <div className="columns-3 gap-1.5">
              {images.map((src, i) =>
                isVideo(src) ? (
                  <div
                    key={i}
                    className="mb-1.5 break-inside-avoid cursor-pointer overflow-hidden"
                    onClick={() => setLightboxSrc(src)}
                  >
                    <video
                      src={src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-auto block"
                    />
                  </div>
                ) : (
                  <button
                    key={i}
                    onClick={() => setLightboxSrc(src)}
                    className="mb-1.5 block w-full break-inside-avoid cursor-zoom-in overflow-hidden border-0 outline-none bg-transparent p-0 appearance-none"
                  >
                    <img
                      src={src}
                      alt={`${project.title} ${i + 1}`}
                      className="w-full h-auto transition duration-300 block"
                    />
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* Embeds */}
        {project.embeds?.map((embed, i) => {
          const height = EMBED_HEIGHTS[embed.label] ?? 700;
          const isSrc = Boolean(embed.src);
          const isGame = embed.label.includes("game");
          const embedWidth = isGame ? "820px" : "100%";

          return (
            <div key={i} className="mb-10">
              <p className="text-xs text-neutral-400 font-mono mb-2 lowercase tracking-wide">
                {embed.label}
              </p>
              <div
                style={{
                  width: embedWidth,
                  height: `${height}px`,
                  border: "1px solid #e5e5e5",
                  overflow: isGame ? "hidden" : "auto",
                }}
              >
                {isSrc ? (
                  <iframe
                    src={embed.src}
                    title={embed.label}
                    style={{
                      width: embedWidth,
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
                      width: embedWidth,
                      height: "100%",
                      border: "none",
                      display: "block",
                    }}
                    scrolling={isGame ? "no" : "yes"}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* PDFs — inline viewer only, no download button */}
        {project.pdfs?.map((pdf, i) => (
          <div key={i} className="mb-10">
            <p className="text-xs text-neutral-400 font-mono mb-2 lowercase tracking-wide">
              {pdf.label}
            </p>
            <iframe
              src={`${pdf.file}#toolbar=0&navpanes=0`}
              title={pdf.label}
              style={{
                width: "100%",
                height: "800px",
                border: "0px",
                display: "block",
              }}
            />
          </div>
        ))}

        {/* Code embed */}
        {project.code && <CodeEmbed files={project.code} />}
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
            padding: "16px",
          }}
          onClick={() => setLightboxSrc(null)}
        >
          {isVideo(lightboxSrc) ? (
            <video
              src={lightboxSrc}
              controls
              autoPlay
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={lightboxSrc}
              alt="close up"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
}
