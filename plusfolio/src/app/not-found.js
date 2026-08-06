import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-140px)] bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          {/* Error Code */}
          <p className="text-7xl md:text-8xl font-extrabold text-blue-600">
            404
          </p>

          {/* Heading */}
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist, may have been
            moved, or the URL might be incorrect. Humans invent broken links
            with remarkable consistency. The internet quietly endures the chaos.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700"
            >
              Go to Home
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </div>

          {/* Optional */}
          <p className="mt-8 text-sm text-gray-500">
            Error Code: <span className="font-medium">404</span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
