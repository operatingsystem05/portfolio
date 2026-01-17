import head from "../assets/headd.png";

export default function Sidebar({ selectedType, setSelectedType }) {
  const categories = ["all", "graphic design", "type design", "photography"];

  return (
    <div className="w-[230px] bg-white flex flex-col justify-between h-full px-4 py-8">
      {/* TOP CONTENT */}
      <div>
        <img
          src={head}
          alt="my portrait"
          className="w-full mb-2 object-cover object-center"
        />

        <div className="flex flex-row-reverse justify-between items-baseline w-full">
          <p className="text-2xl font-semibold text-right pr-2">أميمة</p>
          <p className="text-xl font-semibold text-left">oumaima</p>
        </div>

        <p className="text-md font-semibold leading-relaxed mt-4 break-words">
          here: home of my works website: built by yours truly.
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="mt-8 flex flex-col gap-2 text-md font-semibold text-left">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedType(cat)}
            className="flex items-center gap-2 group uppercase"
          >
            <span
              className={`w-3 h-3 border border-black ${selectedType === cat ? "bg-black" : "bg-transparent"}`}
            />
            <span
              className={`group-hover ${selectedType === cat ? "font-bold" : "text-black"}`}
            >
              {cat}
            </span>
          </button>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-col gap-1 text-md font-semibold mt-8">
        <a
          href="https://instagram.com"
          target="_blank"
          className="hover:underline"
        >
          instagram
        </a>
        <a
          href="https://github.com"
          target="_blank"
          className="hover:underline"
        >
          github
        </a>
        <a href="https://are.na" target="_blank" className="hover:underline">
          are.na
        </a>
        <a href="mailto:you@example.com" className="hover:underline">
          email
        </a>
      </div>
    </div>
  );
}
