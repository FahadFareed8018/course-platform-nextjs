import Link from "next/link";

export default function Home() {
  const courses = [
    { id: "1", name: "Complete Web Development Bootcamp" },
    { id: "2", name: "Advanced Machine Learning with Python" },
    { id: "3", name: "Mobile App Development with React Native" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Course Platform
          </h1>
          <p className="text-xl text-gray-600">
            High-performance, SEO-optimized course detail pages
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {course.name}
              </h2>
              <p className="text-blue-600 hover:text-blue-700">
                View Course Details →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-blue-50 border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Features Implemented:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Dynamic metadata (title, description, OG tags)</li>
            <li>JSON-LD structured data for Course schema</li>
            <li>Server-Side Rendering (SSR) with Next.js App Router</li>
            <li>Incremental Static Regeneration (ISR)</li>
            <li>Performance optimizations (image optimization, compression)</li>
            <li>Semantic HTML and accessibility</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
