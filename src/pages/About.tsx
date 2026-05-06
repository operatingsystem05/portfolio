export default function About() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="pb-8 mb-10">
          <p className="text-sm text-neutral-800 uppercase font-semibold tracking-wide mb-1"></p>
        </div>

        {/* Bio */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 pb-10 mb-10">
          <div className="md:w-[160px] flex-shrink-0">
            <p className="text-sm text-neutral-800 uppercase font-semibold tracking-wide">
              OUMAIMA:
            </p>
          </div>
          <div className="flex-1 max-w-xl">
            <p className="text-sm text-neutral-800 leading-relaxed mb-4">
              i am a filmmaker, writer, visual artist and web developper based
              in belgium, working across print, identity, editorial ++. <br />{" "}
              my practice plays with languages (typography) and forms (poetry,
              screenwriting, prose) often beginning with research and arriving
              somewhere ?unexpected?.
            </p>
            <p className="text-sm text-neutral-800 leading-relaxed mb-4">
              i am interested in the politics of borders, the aesthetics of
              bureaucracy, and the question of migration/ displacement.
            </p>
            <p className="text-sm text-neutral-800 leading-relaxed">
              i am currently a freelancer but i work :in collaboration: as much
              as i work /alone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
