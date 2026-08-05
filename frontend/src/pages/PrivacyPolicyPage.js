import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Mail,
  Globe,
  User,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  FileText,
} from "lucide-react";
import SEO from "../components/SEO";
import { seo } from "../config/seo";

const tableOfContents = [
  { id: "who-we-are", label: "1. Who We Are" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "guest-mode", label: "3. Guest Mode (No Login)" },
  { id: "registered-accounts", label: "4. Registered Accounts" },
  { id: "ai-features", label: "5. AI Features" },
  {
    id: "how-we-use-your-information",
    label: "6. How We Use Your Information",
  },
  { id: "cookies-local-storage", label: "7. Cookies & Local Storage" },
  { id: "analytics", label: "8. Analytics" },
  { id: "advertising", label: "9. Advertising" },
  { id: "third-party-services", label: "10. Third-Party Services" },
  { id: "email-communications", label: "11. Email Communications" },
  { id: "data-security", label: "12. Data Security" },
  { id: "data-retention", label: "13. Data Retention" },
  { id: "your-rights", label: "14. Your Rights" },
  { id: "childrens-privacy", label: "15. Children's Privacy" },
  { id: "international-users", label: "16. International Users" },
  { id: "changes-to-policy", label: "17. Changes to This Privacy Policy" },
  { id: "contact-us", label: "18. Contact Us" },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState("");

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
      <SEO {...seo.privacy} />

      <main className="min-h-screen bg-slate-50/60 py-12 sm:py-16 lg:py-20 text-slate-700 antialiased">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ========================================================
              HERO SECTION
          ======================================================== */}
          <div className="mx-auto max-w-4xl border-b border-slate-200/80 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/10 mb-4">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Privacy-First Career Tools</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Privacy Policy
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Effective Date: August 5, 2026</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Last Updated: August 5, 2026</span>
              </div>
            </div>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
              Welcome to{" "}
              <a
                href="https://plusfolio.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <strong className="text-slate-900 font-semibold">
                  PlusFolio
                </strong>
              </a>
              , a product by{" "}
              <a
                href="https://interestingplus.qzz.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <strong className="text-slate-900 font-semibold">
                  INTERESTING Plus
                </strong>
              </a>
              .
            </p>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
              At PlusFolio, we believe your personal information belongs to you.
              Whether you create a resume, biodata, portfolio, cover letter, or
              use any of our career tools, we are committed to protecting your
              privacy and giving you control over your data.
            </p>
          </div>

          {/* ========================================================
              MAIN CONTENT & SIDEBAR TOC
          ======================================================== */}
          <div className="mx-auto mt-10 max-w-4xl lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-12">
            {/* DESKTOP STICKY TABLE OF CONTENTS */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Table of Contents
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

            {/* POLICY SECTIONS CONTENT */}
            <div className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-12">
              {/* TRUST CALLOUT CARD */}
              <section className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <Lock className="h-5 w-5 text-blue-100" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Your Privacy Matters
                  </h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm sm:text-base text-blue-50">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-200 shrink-0 mt-0.5" />
                    <span>No account required for supported tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-200 shrink-0 mt-0.5" />
                    <span>Local mode available for privacy-focused users</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-200 shrink-0 mt-0.5" />
                    <span>AI assistance is optional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-200 shrink-0 mt-0.5" />
                    <span>We do not sell your personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-200 shrink-0 mt-0.5" />
                    <span>You stay in control of your data</span>
                  </li>
                </ul>
                <p className="mt-6 border-t border-white/10 pt-4 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                  This Privacy Policy explains what information we collect, how
                  we use it, and how we keep it secure.
                </p>
              </section>

              {/* 1. WHO WE ARE */}
              <section id="who-we-are" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  1. Who We Are
                </h2>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 text-sm">
                    <div>
                      <dt className="font-semibold text-slate-500">Product</dt>
                      <dd className="mt-1 font-medium text-slate-900">
                        PlusFolio
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">Company</dt>
                      <dd className="mt-1 font-medium text-slate-900">
                        INTERESTING Plus
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">Founder</dt>
                      <dd className="mt-1 font-medium text-slate-900">
                        <a
                          href="https://jatinporiya.netlify.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-black-600 hover:text-blue-700 underline underline-offset-4"
                        >
                          Jatin Poriya
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">
                        Product Website
                      </dt>
                      <dd className="mt-1">
                        <a
                          href="https://plusfolio.netlify.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4"
                        >
                          https://plusfolio.netlify.app
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">
                        Company Website
                      </dt>
                      <dd className="mt-1">
                        <a
                          href="https://www.interestingplus.qzz.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4"
                        >
                          https://www.interestingplus.qzz.io
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">
                        Portfolio
                      </dt>
                      <dd className="mt-1">
                        <a
                          href="https://jatinporiya.netlify.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700 underline underline-offset-4"
                        >
                          https://jatinporiya.netlify.app
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </dd>
                    </div>
                    <div className="sm:col-span-2 border-t border-slate-100 pt-3">
                      <dt className="font-semibold text-slate-500">
                        Contact Emails
                      </dt>
                      <dd className="mt-1 flex flex-col sm:flex-row gap-2 sm:gap-6 font-medium text-slate-900">
                        <a
                          href="mailto:plusfolio.tech@gmail.com"
                          className="text-blue-600 hover:underline"
                        >
                          plusfolio.tech@gmail.com
                        </a>
                        <a
                          href="mailto:interestingplus.tech@gmail.com"
                          className="text-blue-600 hover:underline"
                        >
                          interestingplus.tech@gmail.com
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 2. INFORMATION WE COLLECT */}
              <section
                id="information-we-collect"
                className="scroll-mt-28 space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    2. Information We Collect
                  </h2>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Depending on how you use PlusFolio, we may collect different
                    types of information.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Account Information
                  </h3>
                  <p className="text-slate-600">
                    When you create an account using Email, Google, or LinkedIn,
                    we may collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                    <li>Name</li>
                    <li>Email Address</li>
                    <li>
                      Profile Picture (if provided by the authentication
                      provider)
                    </li>
                    <li>Authentication Provider</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Career Information
                  </h3>
                  <p className="text-slate-600">
                    If you choose to create resumes or other career documents,
                    you may provide:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                    <li>Personal Information</li>
                    <li>Phone Number</li>
                    <li>Address</li>
                    <li>Professional Summary</li>
                    <li>Education</li>
                    <li>Work Experience</li>
                    <li>Skills</li>
                    <li>Projects</li>
                    <li>Certifications</li>
                    <li>Social Links</li>
                    <li>Portfolio Information</li>
                    <li>Biodata Details</li>
                  </ul>
                  <p className="mt-3 font-medium text-slate-800">
                    You choose what information to include.
                  </p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 3. GUEST MODE */}
              <section id="guest-mode" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  3. Guest Mode (No Login)
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  One of PlusFolio's core features is the ability to use many
                  tools without creating an account.
                </p>
                <p className="text-slate-600 font-medium">
                  When you use Guest Mode:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Your documents remain on your device.</li>
                  <li>Data is stored locally inside your browser.</li>
                  <li>
                    We do not automatically save your documents to our cloud.
                  </li>
                  <li>
                    You can delete your local data at any time by clearing your
                    browser storage.
                  </li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  This allows users who prefer maximum privacy to use PlusFolio
                  without sharing personal information.
                </p>
              </section>

              <hr className="border-slate-200" />

              {/* 4. REGISTERED ACCOUNTS */}
              <section
                id="registered-accounts"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  4. Registered Accounts
                </h2>
                <p className="text-slate-600 font-medium">
                  If you create an account:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>
                    Your documents may be securely stored in your cloud account.
                  </li>
                  <li>
                    You can edit, update, download, and manage your documents
                    later.
                  </li>
                  <li>
                    You can permanently delete your account and associated
                    documents at any time through your dashboard.
                  </li>
                </ul>
              </section>

              <hr className="border-slate-200" />

              {/* 5. AI FEATURES */}
              <section id="ai-features" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  5. AI Features
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  PlusFolio provides optional AI-powered features.
                </p>
                <p className="text-slate-600 font-medium">
                  When you use AI generation:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>
                    Your prompt is securely sent to our AI processing service.
                  </li>
                  <li>AI helps organize and structure your information.</li>
                  <li>
                    AI-generated responses are used to create your documents.
                  </li>
                  <li>
                    You can choose to skip AI entirely and create documents
                    manually.
                  </li>
                </ul>
                <div className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-sm text-amber-800">
                  We encourage users not to include passwords, banking
                  information, or highly sensitive personal information in AI
                  prompts.
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 6. HOW WE USE YOUR INFORMATION */}
              <section
                id="how-we-use-your-information"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  6. How We Use Your Information
                </h2>
                <p className="text-slate-600 font-medium">
                  We use your information to:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-6 text-slate-600">
                  <li>Create career documents</li>
                  <li>Save your work (for registered users)</li>
                  <li>Improve user experience</li>
                  <li>Personalize your dashboard</li>
                  <li>Provide AI-powered features</li>
                  <li>Respond to support requests</li>
                  <li>Improve platform performance</li>
                  <li>Maintain platform security</li>
                </ul>
              </section>

              <hr className="border-slate-200" />

              {/* 7. COOKIES & LOCAL STORAGE */}
              <section
                id="cookies-local-storage"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  7. Cookies &amp; Local Storage
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  PlusFolio uses cookies and browser storage for essential
                  functionality.
                </p>
                <p className="text-slate-600 font-medium">These may include:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>Secure login sessions</li>
                  <li>Authentication tokens</li>
                  <li>User preferences</li>
                  <li>Theme preferences</li>
                  <li>Language preferences</li>
                  <li>Temporary application settings</li>
                </ul>
                <p className="mt-2 font-medium text-slate-800">
                  We do not use cookies to sell your personal information.
                </p>
              </section>

              <hr className="border-slate-200" />

              {/* 8. ANALYTICS */}
              <section id="analytics" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  8. Analytics
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  To improve PlusFolio, we use analytics services including:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                  <li>Google Analytics</li>
                  <li>Google Search Console</li>
                  <li>Microsoft Clarity</li>
                  <li>Bing Webmaster Tools</li>
                </ul>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  These services may collect anonymous usage information such
                  as:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Country</li>
                  <li>Pages visited</li>
                  <li>Session duration</li>
                  <li>User interactions</li>
                </ul>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  This information helps us improve our platform.
                </p>
              </section>

              <hr className="border-slate-200" />

              {/* 9. ADVERTISING */}
              <section id="advertising" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  9. Advertising
                </h2>
                <div className="space-y-3 text-slate-600 leading-relaxed">
                  <p>
                    PlusFolio may display advertisements through Google AdSense
                    and other advertising partners.
                  </p>
                  <p>
                    Advertisements help us keep many features free for everyone.
                  </p>
                  <p>
                    Advertising providers may use cookies or similar
                    technologies to display relevant advertisements.
                  </p>
                  <p>
                    Future premium subscriptions may provide an ad-free
                    experience.
                  </p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 10. THIRD-PARTY SERVICES */}
              <section
                id="third-party-services"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  10. Third-Party Services
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  PlusFolio integrates with trusted third-party services
                  including:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>Google Authentication</li>
                  <li>LinkedIn Authentication</li>
                  <li>Google Gemini AI</li>
                  <li>Google Analytics</li>
                  <li>Google Search Console</li>
                  <li>Microsoft Clarity</li>
                  <li>Google AdSense</li>
                  <li>SMTP Email Services</li>
                  <li>Netlify</li>
                  <li>Render</li>
                  <li>Google Sheets (for selected platform data)</li>
                </ul>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  These providers have their own privacy policies.
                </p>
              </section>

              <hr className="border-slate-200" />

              {/* 11. EMAIL COMMUNICATIONS */}
              <section
                id="email-communications"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  11. Email Communications
                </h2>
                <p className="text-slate-600 font-medium">
                  We may send emails related to:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                  <li>Account verification</li>
                  <li>Password reset</li>
                  <li>Security notifications</li>
                  <li>Important product updates</li>
                  <li>Feature announcements</li>
                </ul>
                <div className="space-y-2 mt-3 text-slate-600 leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    We do not send spam.
                  </p>
                  <p>
                    Marketing emails may include an unsubscribe option whenever
                    applicable.
                  </p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 12. DATA SECURITY */}
              <section id="data-security" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  12. Data Security
                </h2>
                <div className="space-y-3 text-slate-600 leading-relaxed">
                  <p>Protecting your information is important to us.</p>
                  <p>
                    We use reasonable technical and organizational measures to
                    safeguard user data.
                  </p>
                  <p>
                    Guest Mode users benefit from local-only storage for
                    supported features, while registered users' data is
                    protected through secure authentication and encrypted
                    communication wherever applicable.
                  </p>
                  <p>
                    Although no online service can guarantee absolute security,
                    we continuously work to improve our security practices.
                  </p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 13. DATA RETENTION */}
              <section id="data-retention" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  13. Data Retention
                </h2>
                <p className="text-slate-600 font-medium">
                  Registered account information remains available until:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                  <li>You delete your account, or</li>
                  <li>You request deletion where applicable.</li>
                </ul>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Guest Mode information remains on your own device until you
                  remove it.
                </p>
              </section>

              <hr className="border-slate-200" />

              {/* 14. YOUR RIGHTS */}
              <section id="your-rights" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  14. Your Rights
                </h2>
                <p className="text-slate-600 font-medium">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>Access your information</li>
                  <li>Update your information</li>
                  <li>Delete your information</li>
                  <li>Delete your account</li>
                  <li>Request corrections</li>
                  <li>Contact us regarding privacy concerns</li>
                </ul>
              </section>

              <hr className="border-slate-200" />

              {/* 15. CHILDREN'S PRIVACY */}
              <section
                id="childrens-privacy"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  15. Children's Privacy
                </h2>
                <div className="space-y-3 text-slate-600 leading-relaxed">
                  <p>PlusFolio is intended for users aged 13 years or older.</p>
                  <p>
                    If you are under 13 years of age, please use the platform
                    with the involvement of a parent or legal guardian.
                  </p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 16. INTERNATIONAL USERS */}
              <section
                id="international-users"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  16. International Users
                </h2>
                <div className="space-y-3 text-slate-600 leading-relaxed">
                  <p>PlusFolio is available worldwide.</p>
                  <p>
                    By using our platform, you understand that your information
                    may be processed in accordance with this Privacy Policy
                    regardless of your country of residence.
                  </p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 17. CHANGES TO THIS PRIVACY POLICY */}
              <section
                id="changes-to-policy"
                className="scroll-mt-28 space-y-4"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  17. Changes to This Privacy Policy
                </h2>
                <div className="space-y-3 text-slate-600 leading-relaxed">
                  <p>We may update this Privacy Policy from time to time.</p>
                  <p>
                    When significant changes are made, the updated{" "}
                    <strong className="font-semibold text-slate-900">
                      Last Updated
                    </strong>{" "}
                    date will be revised accordingly.
                  </p>
                  <p>
                    Continued use of PlusFolio after updates indicates
                    acceptance of the revised policy.
                  </p>
                </div>
              </section>

              <hr className="border-slate-200" />

              {/* 18. CONTACT US - CONTACT CARD */}
              <section id="contact-us" className="scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
                  18. Contact Us
                </h2>
                <p className="text-slate-600 mb-6">
                  If you have questions regarding this Privacy Policy, please
                  contact us.
                </p>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        PlusFolio
                      </h3>
                      <p className="text-xs text-slate-500">
                        Privacy &amp; Data Protection
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    {/* Emails */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>Email</span>
                      </div>
                      <div className="flex flex-col space-y-1 text-slate-600 pl-6">
                        <a
                          href="mailto:plusfolio.tech@gmail.com"
                          className="hover:text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          plusfolio.tech@gmail.com
                        </a>
                        <a
                          href="mailto:interestingplus.tech@gmail.com"
                          className="hover:text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          interestingplus.tech@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Business */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span>Business</span>
                      </div>
                      <p className="text-slate-600 pl-6">
                        <a
                          href="https://www.interestingplus.qzz.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 hover:underline"
                        >
                          INTERESTING Plus
                        </a>
                      </p>
                    </div>

                    {/* Website */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span>Website</span>
                      </div>
                      <div className="pl-6">
                        <a
                          href="https://www.interestingplus.qzz.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          https://www.interestingplus.qzz.io
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Founder */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <User className="h-4 w-4 text-blue-600" />
                        <span>Founder</span>
                      </div>
                      <p className="text-slate-600 pl-6">
                        <a
                          href="https://jatinporiya.netlify.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 hover:underline"
                        >
                          Jatin Poriya
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
