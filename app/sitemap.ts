import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thomasott.fr"
  const currentDate = new Date()

  // Portfolio one-page - Sections référencées avec ancres pour SEO
  const pages: MetadataRoute.Sitemap = [
    // Page principale avec toutes les sections
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0, // Homepage gets highest priority
    },
    // Ancres de sections pour une meilleure indexation (optionnel mais utile pour SEO)
    {
      url: `${baseUrl}#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // Section À propos
    },
    {
      url: `${baseUrl}#experience`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Section Expérience
    },
    {
      url: `${baseUrl}#education`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.7, // Section Formation
    },
    {
      url: `${baseUrl}#skills`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Section Compétences
    },
    {
      url: `${baseUrl}#projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9, // Section Projets (importante pour le portfolio)
    },
    {
      url: `${baseUrl}#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Section Contact
    },
    // Page CV pour SEO
    {
      url: `${baseUrl}/cv`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // CV important pour le référencement
    },
  ]

  return pages
}

/*
 * Dynamic sitemap generation example for future use:
 *
 * export async function generateSitemaps() {
 *   // Fetch the number of projects/blog posts from your data source
 *   const projects = await getProjects()
 *   const posts = await getBlogPosts()
 *
 *   return [
 *     { id: 'projects' },
 *     { id: 'blog' },
 *   ]
 * }
 *
 * export default async function sitemap({
 *   id,
 * }: {
 *   id: string
 * }): Promise<MetadataRoute.Sitemap> {
 *   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-portfolio.com'
 *
 *   if (id === 'projects') {
 *     const projects = await getProjects()
 *     return projects.map((project) => ({
 *       url: `${baseUrl}/projects/${project.slug}`,
 *       lastModified: new Date(project.updatedAt),
 *       changeFrequency: 'monthly',
 *       priority: 0.8,
 *     }))
 *   }
 *
 *   if (id === 'blog') {
 *     const posts = await getBlogPosts()
 *     return posts.map((post) => ({
 *       url: `${baseUrl}/blog/${post.slug}`,
 *       lastModified: new Date(post.updatedAt),
 *       changeFrequency: 'weekly',
 *       priority: 0.7,
 *     }))
 *   }
 *
 *   return []
 * }
 */
