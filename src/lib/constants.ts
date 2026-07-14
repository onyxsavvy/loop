// Loop — Single source of truth for all site-wide data
// Swap phone/WhatsApp number once confirmed by client

export const SITE = {
  name: "Loop",
  tagline: "Rooftop Gastropub & Nightclub",
  city: "Ranchi",
  fullName: "Loop — Rooftop Gastropub & Nightclub, Ranchi",
  url: "https://loopranchi.com",
} as const;

export const CONTACT = {
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  email: "loopranchi@gmail.com",
  whatsapp: "919876543210",
  whatsappLink: "https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20Loop.",
  instagram: "https://instagram.com/loopranchi",
  instagramHandle: "@loopranchi",
} as const;

export const LOCATION = {
  address: "8th Floor (Rooftop), Eastern Mall, Pantaloons Dangratoli Chowk, Lalpur, Ranchi, Jharkhand 834001",
  addressShort: "8th Floor, Eastern Mall, Lalpur, Ranchi",
  mapsLink: "https://maps.google.com/?q=Loop+Ranchi+Eastern+Mall+Lalpur",
  lat: 23.3441,
  lng: 85.3096,
} as const;

export const HOURS = {
  display: "12 PM \u2013 12 AM",
  daily: true,
  label: "Open Daily",
  schema: {
    opens: "12:00",
    closes: "00:00",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
} as const;

export const STATS = {
  sqft: 14000,
  cuisines: 5,
  rating: 4.3,
  reviews: 1355,
} as const;

export const CUISINES = [
  "American",
  "Asian",
  "Chinese",
  "Indian",
  "Thai",
] as const;

export const PRICE = {
  min: 400,
  max: 1600,
  currency: "INR",
  display: "\u20B9400\u20131,600 per person",
} as const;

// ─── Image paths (public/images/) ───────────────────────────────────────────
export const IMAGES = {
  logo: "/images/loop-logo.png?v=3",
  hero: "/images/hero.png",
  rooftopNight: "/images/c51dd3b5-6dce-4127-a53e-2af125e1e1e5_DSC063655daa921aa8a14a5eb14529e6991a06a1.webp",
  rooftopDusk: "/images/980c19a1d67d492a0d38f6886f447cbb.avif",
  signage: "/images/dcd2ad6a-8599-4005-a776-748d2efc20c5_DSC0638753b294d6f36d4f9f97590933640fbc34.webp",
  cocktails: "/images/598547773_18011858291806637_3050804011299741969_n.jpg",
  dj: "/images/708230207_18032629691806637_6856131491641534388_n.jpg",
  indoorNight: "/images/640534d4fe7343fb5764f6b44fbfe74d.avif",
  indoorDay: "/images/restaurant020251120103155.avif",
  pose: "/images/700118949_18114700192698523_110306455562085414_n.jpg",
  crowd: "/images/669733678_18026510012806637_6868478793588244463_n.jpg",
} as const;

// ─── Menu Highlights ────────────────────────────────────────────────────────

export interface MenuHighlight {
  name: string;
  description: string;
  image: string;
  alt: string;
}

export const MENU_HIGHLIGHTS: MenuHighlight[] = [
  {
    name: "Indoor Dining",
    description: "Premium seating with stunning interior design",
    image: "/images/indoor-dining.png",
    alt: "Beautiful indoor dining area at Loop",
  },
  {
    name: "Global Cuisines",
    description: "American, Asian, Indian, and Thai",
    image: "/images/food.jpg",
    alt: "Plated food at Loop",
  },
  {
    name: "Signature Cocktails",
    description: "Craft cocktails from a serious bar program",
    image: "/images/cocktails.jpg",
    alt: "Colorful signature cocktails at Loop bar",
  },
  {
    name: "The Bar",
    description: "House specials with premium spirits",
    image: "/images/bar.avif",
    alt: "Loop mixology bar",
  },
];

// ─── Nightlife Events ───────────────────────────────────────────────────────

export interface NightlifeEvent {
  title: string;
  description: string;
  schedule: string;
  image?: string;
  cta: string;
  ctaLink: string;
}

export const NIGHTLIFE_EVENTS: NightlifeEvent[] = [
  {
    title: "Live Music Nights",
    description: "Soulful sets, full bar, rooftop air",
    schedule: "Every Friday & Saturday",
    image: "/images/vivek-samtani.jpg",
    cta: "See What\u2019s On",
    ctaLink: CONTACT.instagram,
  },
  {
    title: "DJ Nights",
    description: "Pro audio/visual, dancefloor open",
    schedule: "Weekends",
    image: "/images/dj-night.jpg",
    cta: "See What\u2019s On",
    ctaLink: CONTACT.instagram,
  },
  {
    title: "Theme Nights",
    description: "Rotating concept parties \u2014 check socials for the next one",
    schedule: "Monthly",
    image: "/images/theme-night.jpg",
    cta: "See What\u2019s On",
    ctaLink: CONTACT.instagram,
  },
];

// ─── Reviews ────────────────────────────────────────────────────────────────

export interface Review {
  quote: string;
  author: string;
  rating: number;
  badge?: string;
}

export const REVIEWS = [
  {
    quote: "Stylish, modern ambience with beautiful lighting from the moment you walk in — the live music made the evening.",
    author: "Anant J.",
    rating: 5,
  },
  {
    quote: "Fast, professional service and genuinely beautiful ambience — great for lunch or a night out.",
    author: "Sanghamita C.",
    rating: 5,
  },
  {
    quote: "A bit on the pricier side, but the ambience justifies it — great for friends, family, or a date.",
    author: "Madhur J.",
    rating: 4,
  },
  {
    quote: "We were a group of six and felt completely safe — the DJ was great about taking requests all night.",
    author: "Guest",
    rating: 4.5,
  },
  {
    quote: "Great for any kind of celebration — the club floor's pro audio-visual setup is genuinely impressive.",
    author: "Guest",
    rating: 5,
  },
  {
    quote: "The club area is top notch with great audio and visuals — spacious, with a real variety of food.",
    author: "Guest",
    rating: 5,
  },
  {
    quote: "Perfect marks across food, service, and atmosphere — a clean 5/5 visit.",
    author: "Vivek K.",
    rating: 5,
  },
  {
    quote: "Praised for live music, karaoke nights, and an entertainment lineup that carries the evening past dinner.",
    author: "Guest",
    rating: 4.5,
  },
  {
    quote: "Staff member Pintu Roy was singled out by name for being attentive and friendly all night.",
    author: "Guest",
    rating: 5,
  },
  {
    quote: "Best place in the town.",
    author: "Guest",
    rating: 5,
  }
];

export const MARQUEE_TEXT =
  "14,000 SQ/FT ROOFTOP  \u2014  MULTI-CUISINE KITCHEN  \u2014  LIVE MUSIC & DJ  \u2014  FULL BAR & MIXOLOGY  \u2014  4.3\u2605 \u00B7 1,355+ REVIEWS  \u2014  PRO AUDIO/VISUAL NIGHTCLUB  \u2014";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Nightlife", href: "#nightlife" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
] as const;

// ─── Experience Cards ───────────────────────────────────────────────────────

export const EXPERIENCE_CARDS = [
  {
    title: "Rooftop Lounge",
    description: "Open-air seating, skyline views, and lighting built for golden hour and midnight in equal measure.",
    icon: "Building2" as const,
    featured: true,
    image: "/images/rootop-lounge.png",
    alt: "Loop rooftop lounge with open-air seating",
  },
  {
    title: "Nightclub, Pro Audio/Visual",
    description: "A dedicated club floor with a full sound and lighting rig \u2014 not a speaker in the corner.",
    icon: "Speaker" as const,
    featured: true,
    image: "/images/nightclub.jpg",
    alt: "Loop nightclub DJ with pro audio and visual setup",
  },
  {
    title: "Live Music & DJ Nights",
    description: "Live sets and resident DJs, running through the week \u2014 request-friendly, crowd-read.",
    icon: "Music" as const,
    featured: true,
    image: "/images/live-music.jpg",
    alt: "DJ performing live at Loop gastropub",
  },
  {
    title: "Full Bar & Mixology",
    description: "Cocktails, mocktails, and a serious spirits list. This is a drinks-first bar that happens to also run a full kitchen.",
    icon: "Martini" as const,
    featured: true,
    image: "/images/mixology.jpg",
    alt: "Signature cocktails at Loop bar",
  },
  {
    title: "Karaoke & Bar Games",
    description: "For the table that wants more than dinner and drinks.",
    icon: "Mic2" as const,
    featured: true,
    image: "/images/karaoke.jpg",
    alt: "Karaoke setup at Loop",
  },
  {
    title: "Insta-Worthy Corners",
    description: "Built to be photographed \u2014 the rooftop is part of the menu.",
    icon: "Camera" as const,
    featured: true,
    image: "/images/corner.png",
    alt: "Insta-worthy photo corner at Loop entrance",
  },
] as const;

// ─── Gallery ────────────────────────────────────────────────────────────────

export const GALLERY_ITEMS = [
  { label: "Indoor Ambience", image: "/images/indoor-dining.png", alt: "Loop beautiful indoor dining area", aspect: "16/9" as const },
  { label: "Nightlife", image: "/images/theme-night.jpg", alt: "Nightlife party at Loop", aspect: "1/1" as const },
  { label: "Rooftop Lounge", image: "/images/rootop-lounge.png", alt: "Rooftop lounge area", aspect: "16/9" as const },
  { label: "Loop Entrance", image: "/images/loop-entrance.jpg", alt: "Loop gastropub entrance and signage", aspect: "4/5" as const },
  { label: "Background", image: "/images/background.jpg", alt: "Loop ambient background", aspect: "16/9" as const },
  { label: "Hero View", image: "/images/hero.png", alt: "Loop rooftop sunset and hero view", aspect: "16/9" as const },
] as const;
