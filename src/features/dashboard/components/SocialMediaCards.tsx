import { SimpleGrid } from "@mantine/core";
import SocialCard from "./SocialCard";

// ─── Platform config ──────────────────────────────────────────────────────────
// Icons are inline SVGs defined in SocialCard.tsx since social media logos
// are not part of the Material Symbols library.

const FacebookIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.54V6.79a4.85 4.85 0 0 1-1.07-.1z" />
  </svg>
);

const GmailIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const XIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.738-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const SOCIAL_PLATFORMS = [
  { label: "facebook", color: "#0064E0", Icon: FacebookIcon },
  {
    label: "instagram",
    color: "#DD2A70",
    Icon: InstagramIcon,
  },
  { label: "tiktok", color: "#000000", Icon: TikTokIcon },
  { label: "gmail", color: "#F2A60C", Icon: GmailIcon },
  { label: "twitter", color: "#000000", Icon: XIcon },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SocialMediaCards() {
  return (
    <SimpleGrid cols={5} spacing={"0.75rem"}>
      {SOCIAL_PLATFORMS.map((platform) => (
        <SocialCard key={platform.label} {...platform} count="001" />
      ))}
    </SimpleGrid>
  );
}
