import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://thomasott.fr/sitemap.xml",
    host: "https://thomasott.fr",
  }
}
