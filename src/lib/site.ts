/**
 * Central place to edit the words/branding on the public site.
 * Change these and the whole portfolio updates.
 */
export const site = {
  brand: "The Edit Circle",
  brandShort: "Edit Circle",
  slogan: "Cut • Create • Connect",
  role: "Video Editing Studio",
  tagline: "We turn raw footage into stories people can't scroll past.",
  intro:
    "A video-editing studio crafting cinematic edits, punchy short-form, finance content and podcasts for creators and brands worldwide.",
  location: "Remote · Worldwide",
  email: "theeditcircle@gmail.com",
  phone: "+91 00000 00000",
  socials: {
    instagram: "https://www.instagram.com/the_edit_circle",
  },

  // "Everything You Need" — value props (adapted for an editing studio).
  features: [
    {
      title: "Cinematic Color",
      description:
        "Consistent, film-grade color grading that gives every project a premium, branded look.",
      icon: "Palette",
    },
    {
      title: "Motion Graphics",
      description:
        "Custom titles, kinetic typography and animated graphics that make your content feel high-end.",
      icon: "Sparkles",
    },
    {
      title: "Sound Design",
      description:
        "Clean audio, music sync and sound effects mixed to keep viewers locked in.",
      icon: "AudioLines",
    },
    {
      title: "Fast Turnaround",
      description:
        "Most edits delivered within 48 hours, with priority options when you're on a deadline.",
      icon: "Zap",
    },
    {
      title: "Built for Retention",
      description:
        "Hooks, pacing and captions engineered so people actually watch to the end.",
      icon: "Gauge",
    },
    {
      title: "Direct Communication",
      description:
        "Work straight with your editor — clear updates, easy revisions, no middlemen.",
      icon: "MessagesSquare",
    },
  ],

  packages: [
    {
      name: "Motion Graphics Reels",
      tagline: "Text animation, brand visuals, transitions",
      icon: "Sparkles",
      tiers: [
        { label: "Basic motion reel", price: "₹2,500 – 4,000" },
        { label: "Advanced — custom animations", price: "₹5,000 – 8,000" },
      ],
      revision: "₹1,000 / revision after 3",
    },
    {
      name: "Reels / Shorts",
      tagline: "Instagram & YouTube Shorts · 30–60 sec",
      icon: "Smartphone",
      tiers: [
        { label: "Basic — cuts, music, captions", price: "₹800 – 1,500" },
        { label: "Advanced — fast pacing, effects, hooks", price: "₹2,000 – 3,500" },
      ],
      revision: "₹300 / revision after 3",
    },
    {
      name: "Finance Videos",
      tagline: "YouTube / Instagram / educational",
      icon: "LineChart",
      tiers: [
        { label: "Basic edit", price: "₹3,000 – 5,000" },
        { label: "Advanced — charts, stock visuals, text animation", price: "₹6,000 – 10,000" },
      ],
      revision: "₹700 / revision after 3",
    },
    {
      name: "Podcast Videos",
      tagline: "YouTube / Spotify / long-form",
      icon: "Mic",
      tiers: [
        { label: "Basic — cuts, sync, color & audio", price: "₹2,500 – 4,000" },
        { label: "Advanced — graphics, captions, sound design", price: "₹4,500 – 7,000" },
      ],
      revision: "₹500 / revision after 3",
    },
  ],

  // Studio team — edit names/roles to your real team.
  team: [
    { name: "Add Name", role: "Founder & Lead Editor", note: "Edits, color & creative direction" },
    { name: "Add Name", role: "Motion Designer", note: "Titles, graphics & animation" },
    { name: "Add Name", role: "Short-Form Editor", note: "Reels, Shorts & hooks" },
    { name: "Add Name", role: "Sound & Post", note: "Audio mixing & finishing" },
  ],

  footer: {
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Work", href: "#work" },
          { label: "Pricing", href: "#pricing" },
          { label: "About", href: "#about" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
          { label: "Admin", href: "/admin" },
        ],
      },
    ],
  },
} as const;
