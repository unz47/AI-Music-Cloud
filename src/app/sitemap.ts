import { MetadataRoute } from "next";

const SITE_URL = process.env.AUTH_URL ?? "https://main.d331chu91ig1xv.amplifyapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/profile`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/liked`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/my-tracks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];
}
