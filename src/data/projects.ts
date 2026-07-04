export const projects = [
  // ── ordered oldest → newest so .reverse() in Home gives newest first ──

  {
    slug: "morocco-ep-cover",
    title: "Morocco",
    date: "2019",
    disciplines: ["photography", "illustration", "cover art"],
    summary: "EP visual identity.",
    description:
      "Cover art created in collaboration with AJ Booker, blending my photography and illustration to echo the EP's emotional landscape.",
    image: "/morocco.jpg",
    images: ["/morocco.jpg"],
  },

  {
    slug: "jin-brand-identity",
    title: "Jin - audiovisual studio",
    date: "2021",
    disciplines: ["brand identity", "logo design", "stationery design"],
    summary: "Brand identity for an audiovisual studio.",
    description:
      "Brand identity for Jin, an audiovisual studio working across still photography, fashion photography, and music videos with a strong emphasis on black-and-white imagery. The visual system draws inspiration from the small monochrome icons found on vintage film cameras, which informed the submark featuring a bird and a seven-point star (a reference to the owner's favorite number and a symbol of luck in Chinese culture). The custom typemark 'Jin' balances slick boldness with a 70s sensibility and subtle 90s electronics influences. The identity extends into business cards, invoices, stickers, and other stationery applications.",
    image: "/submark.png",
    images: [
      "/jin.png",
      "/jin-bnw.png",
      "/photography.png",
      "/jin1.jpg",
      "/frame.png",
      "/submark.png",
      "/card.png",
      "/card2.png",
      "/card3.png",
      "/business-card.png",
      "/sticker.png",
    ],
  },

  {
    slug: "zaz-louz-typeface",
    title: "Zaz-Louz",
    date: "2024",
    disciplines: ["typeface"],
    summary:
      "Custom typeface inspired by Moroccan Dialect (Darija) digital texting.",
    description:
      "A custom semi-serif typeface inspired by Moroccan digital texting practices, where Latin letters are used to approximate Arabic sounds. The system plays with the logic of numerals such as 3 (for ع) and 5 (for خ), and explores how these hybrid phonetic conventions can inform a typographic structure. The typeface blends cultural code-switching with formal experimentation.",
    image: "/sample.gif",
    downloads: [
      { label: "download .otf", file: "/zaz-louz.otf" },
      { label: "download .sfd", file: "/zaz-louz.sfd" },
    ],
  },

  {
    slug: "cavaria-brochure",
    title: "Çavaria Brochure",
    date: "2025",
    disciplines: ["brochure design", "typesetting"],
    summary:
      "Multilingual educational brochure for Asylum center workers on LGBTQI+ identities.",
    description:
      "Concept for a multilingual brochure for Çavaria, a Belgian organization advocating for LGBTQ+ rights. The publication was designed for asylum and refugee center workers, communicating essential information on queer identities. To counter the coldness of bureaucratic mazes, the visual system uses heart-based glyphs inspired by the interlaced security patterns found in passports and official documents, softening the tone while maintaining clarity and structure.",
    rejected: true,
    image: "/cavaria.png",
    images: [
      "/broch.png",
      "/broch2.png",
      "/broch3.png",
      "/broch4.png",
      "/broch5.png",
      "/broch6.png",
    ],
  },

  {
    slug: "la-noce-title-design",
    title: "La Noche de Aparición",
    date: "2025",
    disciplines: ["type design"],
    summary: "Title design.",
    description:
      "Title design for 'La Noche de Aparición', a performance by Désirée 0100 centered on ghosts, death, and the blurred boundary between presence and disappearance.",
    rejected: true,
    image: "/la-noche.png",
    images: ["/la-noche-de.png"],
    imageContain: true,
  },

  {
    slug: "kortrijk-identity",
    title: "FROM OUTCASTS TO ICONS",
    date: "2025",
    disciplines: [
      "brand identity",
      "poster design",
      "creative coding",
      "type design",
    ],
    summary:
      "Various promotional material for Kortrijk Theater's collective 'FOTI'.",
    description:
      "Promotional material for Kortrijk's cultural collective 'From Outcasts to Icons', using creative-coding-generated posters and typographic experiments. The project defines the collective's visual language while remaining cohesive, energetic, and adaptable.",
    image: "/kortrijk.png",
    images: [
      "/foti.png",
      "/qace-talk.png",
      "/qace-talk.mp4",
      "/qace-afterparty.png",
      "/qace-afterparty.mp4",
    ],
  },

  {
    slug: "cozone-zine",
    title: "CoZone",
    date: "2026",
    disciplines: ["editorial design", "typesetting", "collage", "writing"],
    summary: "Zine writing and design.",
    description:
      "CoZone is a three-member (Azur, Kaz, oumaima) collective connecting alternative artists engaged with ideas rooted in philosophy, politics, and the humanities. It is a space to build forms through writing and contextual reflection :an attempt to articulate what we stand for in a zine form. I am part of the collective as a writer and as a visual designer.The first edition focuses on the semiotics of fascism, combining writing, collage, and typographic experimentation.",
    wip: true,
    image: "/cozonee.png",
    pdfs: [{ label: "cozine1:", file: "/cozone1.pdf" }],
  },

  {
    slug: "lombre-ep-cover",
    title: "L'ombre",
    date: "2026",
    disciplines: ["cover art", "photography", "type design", "graphic design"],
    summary: "EP visual identity.",
    description:
      "Visual identity and cover design for Zaydan's debut EP 'L'ombre'. The work includes the EP cover, the single cover for 'Coincé', and custom title design.",
    image: "/coincee.png",
    images: ["/c22.png"],
    wip: true,
  },

  {
    slug: "dyke-march-speech",
    title: "Dyke March Speech",
    date: "2026",
    disciplines: ["writing"],
    summary: "Speech for Dyke March (2026).",
    description:
      "Visual identity and cover design for Zaydan's debut EP 'L'ombre'. The work includes the EP cover, the single cover for 'Coincé', and custom title design.",
    image: "/mic.webp",
    pdfs: [{ label: "speech:", file: "/speech.pdf" }],
    wip: true,
  },

  {
    slug: "desiree-installation",
    title: "Cuarto de querranto / exit room",
    date: "2026",
    disciplines: [
      "installation art",
      "performance",
      "writing",
      "graphic design",
    ],
    summary: "Collaborative installation and performance.",
    description:
      "When Désirée told me she was working on a project with a blog, i was obviously intrigued to do this with her. We had grown up in the same virtual sphere (Skyrock, TeckTonik era) two continents apart. As a starting shared point we had 'nostalgia', 'teenagehood' she came with 'ghosts' and i with 'borders' and so our collaboration started. We built a dream-like teenage bedroom inspired by the 2000s-2010s (an homage to our younger selves and a romantic look back to the past). Inside the room, a computer runs two works: a MySpace-inspired blog written by a ghost named Désirée, and a minesweeper game where each successful click unlocks a new line of a poem. Our texts were about memory, fiction and apparition. During the activation day: a lecture-performance took place in the courtyard of La Bellone, before and after the audience could visit the room themselves. The coding of all the digital elements was done by me while we both contributed to the texts and the overall concept and design of the blog and game and room. The installation was shown as part of Vitamines B (April 2026) at La Bellone, Brussels.",
    wip: false,
    wide: true,
    image: "/exit.png",
    images: ["/_1020892.jpg"],
    embeds: [
      { label: "exit (blog)", src: "/exits.html" },
      { label: "Sweep my mind (the game)", src: "/mindsweeperr.html" },
    ],
  },
];
