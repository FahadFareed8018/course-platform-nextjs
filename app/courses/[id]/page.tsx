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
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "https://course-platform-nextjs-psi.vercel.app"}${course.imageUrl}`
    : course.imageUrl;
  const courseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://course-platform-nextjs-psi.vercel.app"}/courses/${course.id}`;

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://course-platform-nextjs-psi.vercel.app";
  const imageUrl = course.imageUrl.startsWith("/")
    ? `${baseUrl}${course.imageUrl}`
    : course.imageUrl;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <CourseSchema course={course} baseUrl={baseUrl} />
      
      <article className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <div className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Course Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg">
                    {course.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg">
                    {course.level}
                  </span>
                </div>
              </div>
              
              {/* Course Header Info */}
              <div className="flex flex-col justify-center text-white">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                      {course.category}
                    </span>
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                      {course.level}
                    </span>
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                      {course.duration}
                    </span>
                  </div>
                  
                  <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl">
                    {course.name}
                  </h1>
                  
                  <p className="mb-6 text-xl leading-relaxed text-white/90">
                    {course.description}
                  </p>
                </div>
                
                {/* Rating and Reviews */}
                <div className="mb-6 flex items-center gap-6">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold mr-3">{course.rating}</span>
                    <div className="flex text-yellow-300">
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
                  <span className="text-white/80 text-lg">
                    ({course.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                
                {/* Course Meta */}
                <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-white/70 block text-xs mb-1">Duration</span>
                    <span className="font-semibold text-base">{course.duration}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-white/70 block text-xs mb-1">Language</span>
                    <span className="font-semibold text-base">{course.language}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-white/70 block text-xs mb-1">Instructor</span>
                    <span className="font-semibold text-base">{course.instructor.name}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-white/70 block text-xs mb-1">Provider</span>
                    <span className="font-semibold text-base">{course.provider.name}</span>
                  </div>
                </div>
                
                {/* Price and CTA */}
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-4xl font-bold mb-1">
                      {course.price.currency} {course.price.amount.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">One-time payment</div>
                  </div>
                  <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center">
                  <span className="w-2 h-8 bg-blue-600 rounded-full mr-4"></span>
                  About This Course
                </h2>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  <p className="whitespace-pre-line text-lg">
                    {course.longDescription.trim()}
                  </p>
                </div>
              </section>

              {/* What You'll Learn */}
              <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center">
                  <span className="w-2 h-8 bg-green-600 rounded-full mr-4"></span>
                  What You'll Learn
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Build responsive web applications",
                    "Master modern frameworks and tools",
                    "Implement best practices and patterns",
                    "Deploy applications to production",
                    "Work with real-world projects",
                    "Learn from industry experts"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Instructor Section */}
              <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center">
                  <span className="w-2 h-8 bg-purple-600 rounded-full mr-4"></span>
                  About the Instructor
                </h2>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      {course.instructor.name}
                    </h3>
                    {course.instructor.bio && (
                      <p className="text-gray-700 leading-relaxed">{course.instructor.bio}</p>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Course Details Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="mb-6 text-xl font-bold text-gray-900">Course Details</h3>
                  <dl className="space-y-4">
                    <div className="pb-4 border-b border-gray-100">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Price</dt>
                      <dd className="text-2xl font-bold text-blue-600">
                        {course.price.currency} {course.price.amount.toFixed(2)}
                      </dd>
                    </div>
                    <div className="pb-4 border-b border-gray-100">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Duration</dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {course.duration}
                      </dd>
                    </div>
                    <div className="pb-4 border-b border-gray-100">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Level</dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {course.level}
                      </dd>
                    </div>
                    <div className="pb-4 border-b border-gray-100">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Language</dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {course.language}
                      </dd>
                    </div>
                    <div className="pb-4 border-b border-gray-100">
                      <dt className="text-sm font-medium text-gray-500 mb-1">Rating</dt>
                      <dd className="flex items-center">
                        <span className="text-lg font-semibold text-gray-900 mr-2">{course.rating}</span>
                        <div className="flex text-yellow-400">
                          {"★".repeat(5).split("").map((star, i) => (
                            <span
                              key={i}
                              className={i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}
                            >
                              {star}
                            </span>
                          ))}
                        </div>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">Last Updated</dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {new Date(course.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </dd>
                    </div>
                  </dl>
                  <button className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                    Enroll Now
                  </button>
                </div>

                {/* Features Card */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Course Features</h3>
                  <ul className="space-y-3">
                    {[
                      "Lifetime access",
                      "Certificate of completion",
                      "Downloadable resources",
                      "Assignments with feedback",
                      "Community support",
                      "30-day money back guarantee"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}

