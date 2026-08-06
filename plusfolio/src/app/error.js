"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Error({ error, reset }) {
  console.error(error);

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-140px)] bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          {/* Error Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <span className="text-4xl">⚠️</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl md:text-5xl font-bold text-gray-900">
            Something Went Wrong
          </h1>

          {/* Description */}
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            We hit an unexpected error while loading this page. Even the best
            software occasionally reminds us that perfection is an ambitious
            marketing strategy.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>

            <Link
              href="/"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Go to Home
            </Link>
          </div>

          {/* Error Message (Development Only) */}
          {process.env.NODE_ENV === "development" && error?.message && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-left">
              <p className="text-sm font-semibold text-red-700">
                Development Error
              </p>

              <code className="mt-2 block break-words text-sm text-red-600">
                {error.message}
              </code>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
