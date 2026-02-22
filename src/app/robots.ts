import { MetadataRoute } from "next";

const SITE_URL = process.env.AUTH_URL ?? "https://main.d331chu91ig1xv.amplifyapp.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/my-tracks"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
