import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Course Not Found
        </h2>
        <p className="mb-8 text-gray-600">
          Sorry, we couldn&apos;t find the course you&apos;re looking for. It may have been removed or the URL might be incorrect.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}


