import { SITE, SOCIAL, ASSETS } from "./site-data";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${ASSETS.logo}`,
    description:
      "A nonprofit platform connecting people who have something to give with those who need to receive. Community outreach, free classes, and free resources in Lagos, Nigeria.",
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    founder: {
      "@type": "Person",
      name: SITE.founder,
    },
    sameAs: [SOCIAL.youtube, SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: "Connecting givers and receivers through outreach, free education, and community support.",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: `${SITE.url}${ASSETS.logo}`,
    },
  };
}
