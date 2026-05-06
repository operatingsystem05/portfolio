import { useState, useEffect, useRef } from "react";

type CodeFiles = {
  html?: string;
  css?: string;
  js?: string;
};

export default function CodeEmbed({ files }: { files: CodeFiles }) {
  const tabs = (["html", "css", "js"] as const).filter((t) => files[t]);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">(tabs[0]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Build combined HTML for the preview
  useEffect(() => {
    const doc = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  body { margin: 0; padding: 16px; background: #0f0f0f; color: #f5f5f5;
         font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
  ${files.css ?? ""}
</style>
</head>
<body>
  ${files.html ?? ""}
  <script>${files.js ?? ""}<\/script>
</body>
</html>`;

    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.srcdoc = doc;
    }
  }, [files]);

  return (
    <div className="mt-8 border border-neutral-700 rounded overflow-hidden text-xs">
      {/* Tab bar */}
      <div className="flex border-b border-neutral-700 bg-neutral-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-mono font-semibold tracking-wide transition-colors duration-150 cursor-pointer
              ${activeTab === tab
                ? "bg-neutral-900 text-white border-b-2 border-red-500"
                : "text-neutral-400 hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto px-4 py-2 text-neutral-600 font-mono select-none">
          read only
        </div>
      </div>

      {/* Code display */}
      <div className="bg-neutral-950 overflow-x-auto">
        <pre className="p-4 overflow-x-auto leading-relaxed">
          <code
            dangerouslySetInnerHTML={{
              __html: highlight(files[activeTab] ?? "", activeTab),
            }}
          />
        </pre>
      </div>

      {/* Live preview */}
      <div className="border-t border-neutral-700">
        <div className="px-4 py-2 bg-neutral-800 text-neutral-500 font-mono text-xs">
          preview
        </div>
        <iframe
          ref={iframeRef}
          title="preview"
          sandbox="allow-scripts"
          className="w-full bg-neutral-950"
          style={{ height: "400px", border: "none" }}
        />
      </div>
    </div>
  );
}

// Lightweight syntax highlighter — no dependencies
function highlight(code: string, lang: "html" | "css" | "js"): string {
  // Escape HTML first
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (lang === "html") {
    return escaped
      // tags
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span style="color:#79b8ff">$2</span>')
      // attributes
      .replace(/\s([\w-]+)=/g, ' <span style="color:#ffab70">$1</span>=')
      // strings
      .replace(/"([^"]*)"/g, '"<span style="color:#9ecbff">$1</span>"')
      // comments
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span style="color:#6a737d">$1</span>');
  }

  if (lang === "css") {
    return escaped
      // selectors
      .replace(/^([^\s{][^{]*)\{/gm, '<span style="color:#79b8ff">$1</span>{')
      // properties
      .replace(/([\w-]+)\s*:/g, '<span style="color:#b392f0">$1</span>:')
      // values / strings
      .replace(/:\s*([^;{}]+);/g, ': <span style="color:#9ecbff">$1</span>;')
      // comments
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6a737d">$1</span>');
  }

  if (lang === "js") {
    return escaped
      // keywords
      .replace(
        /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|new|this|typeof|null|undefined|true|false|async|await|=&gt;)\b/g,
        '<span style="color:#f97583">$1</span>',
      )
      // strings
      .replace(/(&#39;[^&#]*&#39;|&quot;[^&]*&quot;|`[^`]*`)/g,
        '<span style="color:#9ecbff">$1</span>',
      )
      // numbers
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#79b8ff">$1</span>')
      // comments
      .replace(/(\/\/[^\n]*)/g, '<span style="color:#6a737d">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6a737d">$1</span>')
      // function names
      .replace(/(\w+)\s*\(/g, '<span style="color:#b392f0">$1</span>(');
  }

  return escaped;
}
