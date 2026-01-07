// JSON-LD Schema component for Course structured data
import { Course } from "@/lib/courseData";

interface CourseSchemaProps {
  course: Course;
  baseUrl: string;
}

export default function CourseSchema({ course, baseUrl }: CourseSchemaProps) {
  const courseUrl = `${baseUrl}/courses/${course.id}`;
  const imageUrl = course.imageUrl.startsWith("/")
    ? `${baseUrl}${course.imageUrl}`
    : course.imageUrl;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider.name,
      ...(course.provider.url && { url: course.provider.url }),
    },
    courseCode: course.id,
    educationalLevel: course.level,
    inLanguage: course.language,
    teaches: course.category,
    url: courseUrl,
    image: imageUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.rating,
      ratingCount: course.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: course.price.amount,
      priceCurrency: course.price.currency,
      availability: "https://schema.org/InStock",
      url: courseUrl,
      validFrom: course.updatedAt,
    },
    ...(course.instructor && {
      instructor: {
        "@type": "Person",
        name: course.instructor.name,
        ...(course.instructor.bio && { description: course.instructor.bio }),
      },
    }),
    // Parse duration - assuming format like "40 hours" or "6 weeks"
    // For simplicity, extracting numbers and defaulting to hours
    timeRequired: (() => {
      const hours = course.duration.match(/\d+/)?.[0] || "1";
      return `PT${hours}H`;
    })(),
    coursePrerequisites: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: course.level === "Beginner" ? "No prerequisites" : "Basic knowledge required",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

