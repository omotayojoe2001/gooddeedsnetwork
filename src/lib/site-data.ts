export const SITE = {
  name: "Good Deeds Network",
  tagline: "Connecting Givers and Receivers",
  url: "https://www.gooddeedsnetwork.com",
  email: "hello@gooddeedsnetwork.com",
  phone: "+2347016190271",
  phoneDisplay: "+234 701 619 0271",
  location: "Lagos, Nigeria",
  founder: "Joshua Omotayo",
  founded: "2025",
} as const;

export const FOUNDER_SOCIAL = {
  linkedin: "https://www.linkedin.com/in/joshua-omotayo/",
  facebook: "https://web.facebook.com/timi.omotayo.1",
} as const;

export const ASSETS = {
  logo: "/logo.jpg",
  hero: "/hero-outreach.jpg",
  heroCard: "/image for hero section.jpeg",
  founder: "/founder.jpg",
  volunteers: "/volunteers.jpg",
  genrevNg: "/genrev-ng.png",
  genrevApp: "/genrev-app.png",
} as const;

export const SOCIAL = {
  youtube: "https://www.youtube.com/@GoodDeedNetwork",
  facebook: "https://web.facebook.com/thegooddeedsnetwork/",
  instagram: "https://www.instagram.com/gooddeednetwork/",
  linkedin: "https://www.linkedin.com/in/gooddeeds-network/",
} as const;

export const STATS = [
  { value: "100+", label: "Lives touched" },
  { value: "3+", label: "Outreach programs" },
  { value: "10+", label: "Volunteers" },
] as const;

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  category: "outreach" | "class" | "story";
  date?: string;
  place?: string;
};

export const VIDEOS: VideoItem[] = [
  {
    id: "7983qO8kXhk",
    title: "Sending Strong Signals of Hope in Ikotun, Lagos",
    description: "Our flagship community outreach bringing essentials, presence, and hope to families in Ikotun.",
    category: "outreach",
    date: "2025",
    place: "Ikotun, Lagos",
  },
  {
    id: "LPv0m6k3Nvk",
    title: "From Homeless To Hopeful: Gabriel's Journey",
    description: "Gabriel's story of survival, second chances, and the community that stood with him.",
    category: "story",
    date: "2025",
  },
  {
    id: "G_L1tjpJ7Sc",
    title: "Fundamentals of Marketing and Brand Strategy",
    description: "Good Deeds Network Class 01 replay. Learn the foundations every small business needs.",
    category: "class",
    date: "2025",
    place: "Online",
  },
  {
    id: "x94R70pEweU",
    title: "The Power Of Social Media Marketing",
    description: "Good Deeds Network Marketing Class 02 replay. Build reach and trust on social platforms.",
    category: "class",
    date: "2025",
    place: "Online",
  },
  {
    id: "Lpu4FiohCko",
    title: "How to Use Facebook Ads to Grow Your Small Business",
    description: "Proven strategies for success. Good Deeds Network Marketing Class replay 03.",
    category: "class",
    date: "2025",
    place: "Online",
  },
  {
    id: "JDvUt5MsnMk",
    title: "Simple Graphics Design For Beginners",
    description: "Good Deeds Network marketing class. Create visuals that represent your brand with confidence.",
    category: "class",
    date: "2025",
    place: "Online",
  },
  {
    id: "phYyJX9eQr4",
    title: "How to Handle Clients, Overcome Objections and Keep Them Coming Back",
    description: "Free tutorial from Good Deeds Network. Build lasting client relationships that grow your business.",
    category: "class",
    date: "2025",
    place: "Online",
  },
];

export const OUTREACH_VIDEOS = VIDEOS.filter((v) => v.category === "outreach" || v.category === "story");
export const CLASS_VIDEOS = VIDEOS.filter((v) => v.category === "class");
export const FEATURED_VIDEOS = VIDEOS.slice(0, 4);

/** Carousel row on homepage: story + two flagship class replays */
export const IMPACT_CAROUSEL_VIDEOS = VIDEOS.filter((v) =>
  ["LPv0m6k3Nvk", "G_L1tjpJ7Sc", "x94R70pEweU"].includes(v.id),
);

const OUTREACH_BASE = "/Cloth the clothless outreach images ikotun";

export const GALLERY_IMAGES = [
  `${OUTREACH_BASE}/20250116_174301.jpg`,
  `${OUTREACH_BASE}/20250116_174358.jpg`,
  `${OUTREACH_BASE}/20250116_174407.jpg`,
  `${OUTREACH_BASE}/20250116_181046.jpg`,
  `${OUTREACH_BASE}/20250116_181124.jpg`,
  `${OUTREACH_BASE}/20250116_181234.jpg`,
  `${OUTREACH_BASE}/20250116_181340.jpg`,
  `${OUTREACH_BASE}/20250116_181500.jpg`,
  `${OUTREACH_BASE}/20250116_182102.jpg`,
  `${OUTREACH_BASE}/20250116_183714.jpg`,
  `${OUTREACH_BASE}/20250116_190946.jpg`,
] as const;

/** Projects shown on /support with logos and build status */
export const SUPPORT_PROJECTS = [
  {
    name: "Good Deeds Platform",
    body: "The official platform that directly connects givers and receivers.",
    logo: ASSETS.logo,
    status: "in_progress" as const,
    statusLabel: "Work in progress",
  },
  {
    name: "genrev.ng",
    body: "Business growth tools for entrepreneurs. Every profit is channeled back to Good Deeds Network.",
    logo: ASSETS.genrevNg,
    status: "live" as const,
    statusLabel: "Live",
    url: "https://genrev.ng",
    profitNote: true,
  },
  {
    name: "genrev.app",
    body: "AI powered tools for creators. Every profit is channeled back to Good Deeds Network.",
    logo: ASSETS.genrevApp,
    status: "live" as const,
    statusLabel: "Live",
    url: "https://genrev.app",
    profitNote: true,
  },
  {
    name: "AI Education Platform",
    body: "An AI app that helps students learn and grow with personalised support.",
    status: "coming_soon" as const,
    statusLabel: "Coming soon",
  },
  {
    name: "Data & Airtime for Students",
    body: "Making data and airtime more affordable, and giving subscriptions to students who need them.",
    status: "in_progress" as const,
    statusLabel: "In progress",
  },
] as const;

export const MIN_DONATION_NAIRA = 100;

export const PROJECTS = [
  {
    tag: "Business tool",
    name: "genrev.ng",
    tagline: "Everything your business needs to grow, in one place.",
    body: "A growth stack built for business owners. WhatsApp chatbot, email automation, WhatsApp automation, and social media management. Fund the mission by growing your business.",
    url: "https://genrev.ng",
    logo: ASSETS.genrevNg,
    features: ["WhatsApp chatbot", "Email automation", "WhatsApp automation", "Social media management"],
  },
  {
    tag: "Creator platform",
    name: "genrev.app",
    tagline: "The AI powered social media manager for creators.",
    body: "An influencer platform with an AI that manages everything on your social media with your mandate and your stance. Includes an autopilot agent and a dedicated social media manager.",
    url: "https://genrev.app",
    logo: ASSETS.genrevApp,
    features: ["Autopilot AI agent", "Dedicated social manager", "Custom mandate and stance", "Growth analytics"],
  },
] as const;

export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
}

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
