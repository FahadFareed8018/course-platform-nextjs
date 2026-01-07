import { MetadataRoute } from 'next'
import { getAllCourseIds } from '@/lib/courseData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://course-platform-nextjs-psi.vercel.app'
  const courseIds = await getAllCourseIds()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Course pages
  const coursePages = courseIds.map((id) => ({
    url: `${baseUrl}/courses/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...coursePages]
}
