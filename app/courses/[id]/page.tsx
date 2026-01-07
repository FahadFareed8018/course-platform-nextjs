import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/courseData";
import CourseSchema from "@/components/CourseSchema";
import Image from "next/image";

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found.",
    };
  }

  const title = `${course.name} | ${course.provider.name}`;
  const description = course.description;
  const imageUrl = course.imageUrl.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${course.imageUrl}`
    : course.imageUrl;
  const courseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/courses/${course.id}`;

  return {
    title,
    description,
    keywords: [
      course.name,
      course.category,
      course.level,
      course.instructor.name,
      "online course",
      "education",
      course.language,
    ],
    authors: [{ name: course.instructor.name }],
    openGraph: {
      title,
      description,
      url: courseUrl,
      siteName: course.provider.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: course.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: `@${course.provider.name.toLowerCase().replace(/\s+/g, "")}`,
    },
    alternates: {
      canonical: courseUrl,
    },
    other: {
      "course:price:amount": course.price.amount.toString(),
      "course:price:currency": course.price.currency,
      "course:instructor": course.instructor.name,
    },
  };
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  const { getAllCourseIds } = await import("@/lib/courseData");
  const ids = await getAllCourseIds();
  return ids.map((id) => ({
    id,
  }));
}

// Revalidate every hour (ISR - Incremental Static Regeneration)
export const revalidate = 3600;

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const imageUrl = course.imageUrl.startsWith("/")
    ? `${baseUrl}${course.imageUrl}`
    : course.imageUrl;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <CourseSchema course={course} baseUrl={baseUrl} />
      
      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Course Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
              
              {/* Course Header Info */}
              <div className="flex flex-col justify-center text-white">
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
                    {course.category}
                  </span>
                  <span className="ml-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>
                
                <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
                  {course.name}
                </h1>
                
                <p className="mb-6 text-xl leading-relaxed text-white/90">
                  {course.description}
                </p>
                
                {/* Rating */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{course.rating}</span>
                    <div className="ml-2 flex text-yellow-300">
                      {"★".repeat(5).split("").map((star, i) => (
                        <span
                          key={i}
                          className={i < Math.floor(course.rating) ? "text-yellow-300" : "text-white/30"}
                        >
                          {star}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-white/80">
                    ({course.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                
                {/* Course Meta */}
                <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/70">Duration:</span>
                    <span className="ml-2 font-semibold">{course.duration}</span>
                  </div>
                  <div>
                    <span className="text-white/70">Language:</span>
                    <span className="ml-2 font-semibold">{course.language}</span>
                  </div>
                  <div>
                    <span className="text-white/70">Instructor:</span>
                    <span className="ml-2 font-semibold">{course.instructor.name}</span>
                  </div>
                  <div>
                    <span className="text-white/70">Provider:</span>
                    <span className="ml-2 font-semibold">{course.provider.name}</span>
                  </div>
                </div>
                
                {/* Price and CTA */}
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-3xl font-bold">
                      {course.price.currency} {course.price.amount.toFixed(2)}
                    </span>
                  </div>
                  <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <section className="mb-12">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">About This Course</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="whitespace-pre-line leading-relaxed">
                    {course.longDescription.trim()}
                  </p>
                </div>
              </section>

              {/* Instructor Section */}
              <section className="mb-12">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">About the Instructor</h2>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {course.instructor.name}
                  </h3>
                  {course.instructor.bio && (
                    <p className="text-gray-700">{course.instructor.bio}</p>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Course Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-2xl font-bold text-gray-900">
                      {course.price.currency} {course.price.amount.toFixed(2)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Duration</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {course.duration}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Level</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {course.level}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Language</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {course.language}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {new Date(course.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                </dl>
                <button className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                  Enroll Now
                </button>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}

