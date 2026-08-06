"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Globe,
  FileText,
  UserCheck,
  Briefcase,
  CheckCircle2,
  Cpu,
  Lock,
  Cloud,
  Layout,
  Zap,
  Eye,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Layers,
  Rocket,
  Compass,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// TABLE OF CONTENTS DATA
// ============================================================================
const tableOfContents = [
  { id: "hero", label: "About PlusFolio" },
  { id: "who-we-are", label: "1. Who We Are" },
  { id: "our-story", label: "2. Our Story" },
  { id: "our-mission", label: "3. Our Mission" },
  { id: "what-we-build", label: "4. What We Build" },
  { id: "why-choose", label: "5. Why Choose PlusFolio" },
  { id: "our-values", label: "6. Our Values" },
  { id: "looking-ahead", label: "7. Looking Ahead" },
  { id: "meet-founder", label: "8. Meet the Founder" },
  { id: "contact-cta", label: "9. Get in Touch" },
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function AboutHero() {
  return (
    <div
      id="hero"
      className="mx-auto max-w-4xl border-b border-slate-200/80 pb-10 scroll-mt-28"
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/10 mb-4">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <span>Empowering Career Journeys Worldwide</span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        About <span className="text-blue-600">PlusFolio</span>
      </h1>

      <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600">
        We are building the modern standard for career preparation—making
        premium, AI-powered document tools accessible, simple, and privacy-first
        for everyone.
      </p>

      <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
        Created by{" "}
        <a
          href="https://www.interestingplus.qzz.io"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
        >
          INTERESTING Plus
          <ExternalLink className="h-3.5 w-3.5" />
        </a>{" "}
        and founded by{" "}
        <a
          href="https://jatinporiya.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
        >
          Jatin Poriya
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        , our platform is designed to level the playing field so talent shines
        without technical or financial roadblocks.
      </p>
    </div>
  );
}

function TableOfContents({ activeId }) {
  return (
    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          On This Page
        </p>
        <nav className="space-y-1">
          {tableOfContents.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                    : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function AboutPage() {
  const [activeId, setActiveId] = useState("hero");

  // Highlight active section in Table of Contents on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" },
    );

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* <SEO {...seo.about} /> */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <AboutHero />

        {/* MAIN GRID: DESKTOP TOC + CONTENT */}
        <div className="mx-auto mt-10 max-w-4xl lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-12">
          {/* DESKTOP SIDEBAR TOC */}
          <TableOfContents activeId={activeId} />

          {/* MAIN CONTENT SECTIONS */}
          <div className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-16">
            {/* ========================================================
                  2. WHO WE ARE
              ======================================================== */}
            <section id="who-we-are" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                1. Who We Are
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
                <p>
                  <Link
                    href="/"
                    className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors"
                  >
                    PlusFolio
                  </Link>{" "}
                  is an independent, technology-driven career platform built by{" "}
                  <a
                    href="https://www.interestingplus.qzz.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
                  >
                    INTERESTING Plus
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  . Our core philosophy is simple: high-quality career
                  presentation should never be locked behind expensive paywalls
                  or frustrating software.
                </p>
                <p>
                  Whether you are a college student writing your first resume,
                  an experienced professional optimizing for applicant tracking
                  systems, or a freelancer setting up a personal portfolio, our
                  tools give you the clarity and structure you need to succeed.
                </p>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  3. OUR STORY
              ======================================================== */}
            <section id="our-story" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                2. Our Story
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
                <p>
                  We started PlusFolio after seeing countless talented job
                  seekers get rejected—not because they lacked skills, but
                  because they struggled with formatting, broken Word layouts,
                  confusing ATS filters, and overpriced design subscriptions.
                </p>
                <p>
                  Too many platforms lure users in with &quot;free&quot; resume
                  builders, only to demand credit card details right when they
                  click download. We knew there had to be a more honest, human
                  way to build software.
                </p>
                <p>
                  PlusFolio was created to remove those barriers entirely. We
                  combined clean design engineering, optional AI assistance, and
                  privacy-first local storage so that anyone anywhere can build
                  industry-ready career documents in minutes.
                </p>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  4. OUR MISSION
              ======================================================== */}
            <section id="our-mission" className="scroll-mt-28 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  3. Our Mission
                </h2>
                <p className="mt-2 text-base sm:text-lg text-slate-600">
                  We are guided by five fundamental pillars that shape every
                  tool, update, and line of code we ship:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Free Career Tools
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Essential job-hunting utilities should be free. We keep core
                    builders accessible without hidden download fees.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Privacy First
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    We treat your personal data with absolute respect. Use tools
                    without logging in via local browser storage.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    AI for Everyone
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    We integrate intelligent assistance to help you write
                    sharper bullet points and structure clean summaries.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Professional Quality
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Every layout is tested against modern recruiting standards
                    and applicant tracking systems.
                  </p>
                </div>

                <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        Accessible Worldwide
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        Whether you are in Mumbai, New York, London, or Nairobi,
                        our platform is optimized for fast performance and
                        cross-device compatibility globally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  5. WHAT WE BUILD
              ======================================================== */}
            <section id="what-we-build" className="scroll-mt-28 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  4. What We Build
                </h2>
                <p className="mt-2 text-base sm:text-lg text-slate-600">
                  Discover our suite of integrated tools crafted to support
                  every phase of your professional journey:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Resume Builder */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      <Link
                        href="/resume-builder"
                        className="hover:text-blue-600 transition-colors"
                      >
                        Resume Builder
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Create recruiter-ready, ATS-optimized resumes in minutes
                      with intelligent formatting and live PDF rendering.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/resume-builder"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                    >
                      <span>Launch Builder</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Biodata Builder */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      <Link
                        href="/biodata-builder"
                        className="hover:text-blue-600 transition-colors"
                      >
                        Biodata Builder
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Craft elegant marriage and professional biodatas with
                      cultural formatting and customizable personal profiles.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/biodata-builder"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                    >
                      <span>Create Biodata</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* ATS Checker */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      <Link
                        href="/ats-checker"
                        className="hover:text-blue-600 transition-colors"
                      >
                        ATS Checker
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Analyze your resume against automated screening algorithms
                      to identify keyword gaps and improve interview callbacks.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/ats-checker"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                    >
                      <span>Check Score</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Cover Letter Generator */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      <Link
                        href="/cover-letter-generator"
                        className="hover:text-blue-600 transition-colors"
                      >
                        Cover Letter Generator
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Generate tailored, compelling cover letters that align
                      seamlessly with your target role and resume highlights.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/cover-letter-generator"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                    >
                      <span>Generate Letter</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Portfolio Builder */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                      <Layout className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      <Link
                        href="/portfolio-builder"
                        className="hover:text-blue-600 transition-colors"
                      >
                        Portfolio Builder
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Showcase your projects, code repositories, and creative
                      work with stunning personal website layouts.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/portfolio-builder"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                    >
                      <span>Build Portfolio</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Career Blogs */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      <Link
                        href="/blog"
                        className="hover:text-blue-600 transition-colors"
                      >
                        Career Blogs
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Read practical guides, salary negotiation tips, and
                      industry insights written by experienced hiring
                      professionals.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/blog"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                    >
                      <span>Read Articles</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Helpful Resource Links */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
                <span>Explore More:</span>
                <Link
                  href="/resume-templates"
                  className="text-blue-600 hover:underline"
                >
                  Resume Templates
                </Link>
                <span>•</span>
                <Link
                  href="/resume-samples"
                  className="text-blue-600 hover:underline"
                >
                  Resume Samples
                </Link>
                <span>•</span>
                <Link
                  href="/biodata-samples"
                  className="text-blue-600 hover:underline"
                >
                  Biodata Samples
                </Link>
                <span>•</span>
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  Pricing
                </Link>
                <span>•</span>
                <Link href="/faq" className="text-blue-600 hover:underline">
                  FAQ
                </Link>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  6. WHY CHOOSE PLUSFOLIO
              ======================================================== */}
            <section id="why-choose" className="scroll-mt-28 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  5. Why Choose PlusFolio
                </h2>
                <p className="mt-2 text-base sm:text-lg text-slate-600">
                  We designed every feature to solve the most frustrating pain
                  points of traditional document creation:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <Zap className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    AI Powered
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Smart bullet point generation and instant content
                    organization.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <Lock className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Guest Mode
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Build and download instantly without mandatory sign-ups.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <Cloud className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Cloud Sync
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Registered users can save drafts securely across all
                    devices.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    ATS Friendly
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Clean structural coding designed to pass hiring bots
                    seamlessly.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <Layers className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Professional Templates
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Modern, timeless layouts designed by hiring specialists.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <ShieldCheck className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Privacy First
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Zero data selling. Read our{" "}
                    <Link href="/privacy" className="underline text-blue-600">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <Layout className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Simple Interface
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Zero bloat or clutter—focus entirely on telling your story.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <FileText className="h-5 w-5 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Fast PDF Export
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    High-resolution, perfectly paginated PDFs ready for
                    employers.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  7. OUR VALUES
              ======================================================== */}
            <section id="our-values" className="scroll-mt-28 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  6. Our Values
                </h2>
                <p className="mt-2 text-base sm:text-lg text-slate-600">
                  How we work and what we stand for as an engineering team:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <Eye className="h-5 w-5 text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Transparency
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Clear pricing, open documentation, and no dark UI patterns.
                    What you see is always what you get.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <Lightbulb className="h-5 w-5 text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Innovation
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Continuously integrating cutting-edge browser capabilities
                    and AI models to simplify complex tasks.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <Globe className="h-5 w-5 text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Accessibility
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ensuring high contrast, semantic HTML, and intuitive
                    keyboard navigation for all users.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <TrendingUp className="h-5 w-5 text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Continuous Growth
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We listen closely to community feedback and ship meaningful
                    platform improvements every single week.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <Lock className="h-5 w-5 text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Privacy
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We believe your personal documents belong to you. See our{" "}
                    <Link href="/terms" className="underline text-blue-600">
                      Terms &amp; Conditions
                    </Link>{" "}
                    for details.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <Award className="h-5 w-5 text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Quality
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We never compromise on clean typography, precise spacing,
                    and professional document presentation.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  8. LOOKING AHEAD (ROADMAP)
              ======================================================== */}
            <section id="looking-ahead" className="scroll-mt-28 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  7. Looking Ahead
                </h2>
                <p className="mt-2 text-base sm:text-lg text-slate-600">
                  We are just getting started. Here is a glimpse into what we
                  are actively engineering for our upcoming releases:
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      More AI Career Tools
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Deep context awareness that tailors your resume bullets
                      specifically to pasted job descriptions.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Interactive Career Assistant
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      A dedicated AI co-pilot to help you identify skill gaps
                      and suggest targeted certifications.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Interview Preparation Suite
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Automated practice Q&amp;A cards generated directly from
                      the experience listed on your resume.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Layout className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Portfolio &amp; Template Expansion
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      Adding customizable dark-mode portfolios, multi-page CV
                      layouts, and future optional premium features.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  9. MEET THE FOUNDER
              ======================================================== */}
            <section id="meet-founder" className="scroll-mt-28 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  8. Meet the Founder
                </h2>
                <p className="mt-2 text-base sm:text-lg text-slate-600">
                  The engineering and vision behind PlusFolio and INTERESTING
                  Plus:
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar Placeholder */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-2xl shadow-md">
                    <img
                      src="https://jatinporiya.netlify.app/logo192.png"
                      alt="Jatin Poriya"
                      className="h-full w-full rounded-2xl"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          <a
                            href="https://jatinporiya.netlify.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
                          >
                            Jatin Poriya
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                          </a>
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-blue-600">
                          Founder &amp; Lead Architect — INTERESTING Plus
                        </p>
                      </div>

                      <a
                        href="https://jatinporiya.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-600 transition-colors"
                      >
                        <span>Visit Portfolio</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                      Jatin is a full-stack engineer and builder passionate
                      about solving real-world friction through intuitive
                      software. Seeing how broken, overpriced, and
                      privacy-invasive modern recruitment tools had become, he
                      founded{" "}
                      <a
                        href="https://www.interestingplus.qzz.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        INTERESTING Plus
                      </a>{" "}
                      and engineered{" "}
                      <Link
                        href="/"
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        PlusFolio
                      </Link>{" "}
                      to put professional document design back into the hands of
                      the user.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* ========================================================
                  10. CONTACT CTA
              ======================================================== */}
            <section id="contact-cta" className="scroll-mt-28">
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 sm:p-10 text-white shadow-xl shadow-slate-900/5">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/20 mb-4">
                    <Rocket className="h-3.5 w-3.5" />
                    <span>We Love Feedback</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Have an idea or feature suggestion?
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    PlusFolio grows through community conversations. Whether you
                    want to report a bug, suggest a new template layout, or just
                    say hello—our inbox is always open.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                    >
                      <span>Contact Us</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/faq"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors border border-white/10"
                    >
                      <span>Visit FAQ</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                  11. FOOTER NOTE
              ======================================================== */}
            <div className="pt-4 text-center">
              <p className="text-sm sm:text-base font-medium text-slate-500 italic">
                &quot;Thank you for being a part of the PlusFolio journey.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
