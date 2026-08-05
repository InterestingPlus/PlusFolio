import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  Calendar,
  ShieldAlert,
  Bot,
  Scale,
  CheckCircle2,
  Mail,
  Building2,
  Globe,
  User,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import SEO from "../components/SEO";
import { seo } from "../config/seo";

// ============================================================================
// TABLE OF CONTENTS DATA
// ============================================================================
const tableOfContents = [
  { id: "introduction", label: "1. Introduction" },
  { id: "acceptance-of-terms", label: "2. Acceptance of Terms" },
  { id: "eligibility", label: "3. Eligibility" },
  { id: "user-accounts", label: "4. User Accounts" },
  { id: "guest-mode", label: "5. Guest Mode (No Login)" },
  { id: "acceptable-use", label: "6. Acceptable Use" },
  { id: "ai-disclaimer", label: "7. AI Generated Content Disclaimer" },
  { id: "user-content-ownership", label: "8. User Content Ownership" },
  { id: "intellectual-property", label: "9. Intellectual Property" },
  { id: "advertisements", label: "10. Advertisements" },
  { id: "premium-services", label: "11. Premium Services (Future)" },
  { id: "third-party-services", label: "12. Third-Party Services" },
  { id: "service-availability", label: "13. Service Availability" },
  { id: "disclaimer-of-warranties", label: "14. Disclaimer of Warranties" },
  { id: "limitation-of-liability", label: "15. Limitation of Liability" },
  { id: "account-suspension", label: "16. Account Suspension & Termination" },
  { id: "fair-usage-policy", label: "17. Fair Usage Policy" },
  { id: "privacy", label: "18. Privacy" },
  { id: "changes-to-terms", label: "19. Changes to Terms" },
  { id: "governing-law", label: "20. Governing Law (India)" },
  { id: "contact-information", label: "21. Contact Information" },
];

// ============================================================================
// REUSABLE SUB-COMPONENTS
// ============================================================================

function TermsHero() {
  return (
    <div className="mx-auto max-w-4xl border-b border-slate-200/80 pb-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/10 mb-4">
        <FileText className="h-4 w-4 text-blue-600" />
        <span>Legal Agreement &amp; Platform Policies</span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        Terms &amp; Conditions
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
        <strong className="text-slate-900 font-semibold">PlusFolio</strong>,
        created by{" "}
        <strong className="text-slate-900 font-semibold">
          Interesting Plus
        </strong>
        . These Terms &amp; Conditions govern your use of our website, career
        tools, AI assistants, and document builders.
      </p>

      <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-600">
        We have written these terms to be transparent, human-friendly, and
        fair—no traps, no hidden gotchas.
      </p>
    </div>
  );
}

function TermsNoticeCard() {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 text-white shadow-xl shadow-slate-900/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
          <ShieldAlert className="h-5 w-5 text-blue-300" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Agreement at a Glance
        </h2>
      </div>
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
        By accessing or using PlusFolio, you agree to these Terms &amp;
        Conditions. Here are the core highlights of our agreement:
      </p>
      <ul className="mt-4 space-y-3 text-sm sm:text-base text-slate-200">
        <li className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Your Data is Yours:</strong> You own 100% of the resumes,
            portfolios, and biodatas you build.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>No Login Required:</strong> Supported tools work instantly
            in Guest Mode with local browser storage.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Human Verification:</strong> AI tools assist your workflow,
            but you must review documents before sending them to employers.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Fair Play:</strong> We keep tools accessible to everyone;
            automated scraping or platform abuse is strictly prohibited.
          </span>
        </li>
      </ul>
    </section>
  );
}

function CalloutBanner({
  icon: Icon,
  title,
  description,
  badgeText,
  theme = "blue",
}) {
  const themes = {
    blue: {
      wrapper: "border-blue-200/80 bg-blue-50/70 text-blue-950",
      badge: "bg-blue-600 text-white",
      icon: "text-blue-600 bg-white border border-blue-200",
    },
    amber: {
      wrapper: "border-amber-200/80 bg-amber-50/70 text-amber-950",
      badge: "bg-amber-600 text-white",
      icon: "text-amber-600 bg-white border border-amber-200",
    },
  };

  const style = themes[theme] || themes.blue;

  return (
    <div className={`my-6 rounded-2xl border p-6 shadow-xs ${style.wrapper}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.icon}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight">
            {title}
          </h3>
        </div>
        {badgeText && (
          <span
            className={`inline-flex self-start sm:self-auto rounded-full px-2.5 py-0.5 text-xs font-bold ${style.badge}`}
          >
            {badgeText}
          </span>
        )}
      </div>
      <p className="text-sm sm:text-base leading-relaxed opacity-90 pl-0 sm:pl-12">
        {description}
      </p>
    </div>
  );
}

function TableOfContents({ activeId }) {
  return (
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
  );
}

function TermsSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="space-y-3 text-slate-600 leading-relaxed">{children}</div>
    </section>
  );
}

function ContactCard() {
  return (
    <section id="contact-information" className="scroll-mt-28">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
        21. Contact Information
      </h2>
      <p className="text-slate-600 mb-6 leading-relaxed">
        We value clear communication. If you have any questions, concerns, or
        feedback regarding these Terms &amp; Conditions, please reach out to us
        directly:
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">PlusFolio</h3>
            <p className="text-xs text-slate-500">
              Legal &amp; Policy Operations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {/* Emails */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>Email Support</span>
            </div>
            <div className="flex flex-col space-y-1 text-slate-600 pl-6">
              <a
                href="mailto:plusfolio.tech@gmail.com"
                className="hover:text-blue-600 hover:underline"
              >
                plusfolio.tech@gmail.com
              </a>
              <a
                href="mailto:interestingplus.tech@gmail.com"
                className="hover:text-blue-600 hover:underline"
              >
                interestingplus.tech@gmail.com
              </a>
            </div>
          </div>

          {/* Business */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span>Company</span>
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
              <span>Company Portal</span>
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
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function TermsAndConditionsPage() {
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
      <SEO {...seo.terms} />

      <main className="min-h-screen bg-slate-50/60 py-12 sm:py-16 lg:py-20 text-slate-700 antialiased">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HERO SECTION */}
          <TermsHero />

          {/* MAIN GRID: DESKTOP TOC + CONTENT */}
          <div className="mx-auto mt-10 max-w-4xl lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-12">
            {/* DESKTOP SIDEBAR TOC */}
            <TableOfContents activeId={activeId} />

            {/* SECTIONS LIST */}
            <div className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-12">
              {/* NOTICE CARD */}
              <TermsNoticeCard />

              {/* 1. INTRODUCTION */}
              <TermsSection id="introduction" title="1. Introduction">
                <p>
                  Welcome to <strong>PlusFolio</strong> ("Platform", "we", "us",
                  or "our"), a product developed and operated by{" "}
                  <strong>Interesting Plus</strong>, founded by{" "}
                  <strong>Jatin Poriya</strong>.
                </p>
                <p>
                  PlusFolio is a modern software platform designed to help job
                  seekers, freelancers, students, and professionals create
                  beautiful, industry-standard resumes, biodatas, portfolios,
                  cover letters, and other career-related documents.
                </p>
                <p>
                  These Terms &amp; Conditions define the legal relationship
                  between PlusFolio and any individual who accesses or uses our
                  tools ("you", "user"). Our goal is to empower your career
                  journey while maintaining a secure, respectful, and reliable
                  software ecosystem.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 2. ACCEPTANCE OF TERMS */}
              <TermsSection
                id="acceptance-of-terms"
                title="2. Acceptance of Terms"
              >
                <p>
                  By accessing our website, testing our document builders, or
                  creating a registered account, you explicitly acknowledge that
                  you have read, understood, and agreed to be bound by these
                  Terms &amp; Conditions, along with our Privacy Policy.
                </p>
                <p>
                  If you do not agree with any part of these Terms, you should
                  immediately cease accessing PlusFolio and remove any local
                  documents stored on your device.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 3. ELIGIBILITY */}
              <TermsSection id="eligibility" title="3. Eligibility">
                <p>
                  PlusFolio is intended for individuals who are at least{" "}
                  <strong>13 years of age</strong>. By using our Platform, you
                  warrant and represent that you meet this minimum age
                  requirement.
                </p>
                <p>
                  If you are under 18 years old, you represent that you have
                  received consent from a parent or legal guardian to use the
                  Platform and save career documents.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 4. USER ACCOUNTS */}
              <TermsSection id="user-accounts" title="4. User Accounts">
                <p>
                  You can register for a PlusFolio account using an
                  Email/Password combination or through trusted third-party
                  OAuth providers (such as Google and LinkedIn).
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Cloud Storage:</strong> Registered users can
                    securely save, manage, update, and download their documents
                    across multiple devices.
                  </li>
                  <li>
                    <strong>Account Security:</strong> You are strictly
                    responsible for maintaining the confidentiality of your
                    login credentials and for all activities that occur under
                    your account.
                  </li>
                  <li>
                    <strong>Accurate Info:</strong> You agree to provide
                    accurate email details so we can assist you with password
                    resets or critical security notices.
                  </li>
                </ul>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 5. GUEST MODE (NO LOGIN) */}
              <TermsSection id="guest-mode" title="5. Guest Mode (No Login)">
                <p>
                  We strongly believe that helpful software should not force
                  unnecessary registration. PlusFolio offers a privacy-first{" "}
                  <strong>Guest Mode</strong> that allows you to build career
                  documents without creating an account.
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Local Browser Storage:</strong> When using Guest
                    Mode, your resume and biodata data is saved directly in your
                    device's browser memory (Local Storage / IndexedDB).
                  </li>
                  <li>
                    <strong>User Responsibility:</strong> Because Guest Mode
                    data is not synced to our cloud servers, clearing your
                    browser cache or switching devices will erase your work. We
                    recommend downloading your completed PDFs or creating an
                    account to save important drafts.
                  </li>
                </ul>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 6. ACCEPTABLE USE */}
              <TermsSection id="acceptable-use" title="6. Acceptable Use">
                <p>
                  You agree to use PlusFolio strictly for lawful career
                  preparation, professional development, and portfolio creation.
                  You agree NOT to:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>
                    Include defamatory, fraudulent, or illegal information in
                    public documents.
                  </li>
                  <li>Upload malicious software, viruses, or harmful code.</li>
                  <li>
                    Scrape, reverse-engineer, or attempt to extract our software
                    source code.
                  </li>
                  <li>
                    Use automated bots to generate excessive server loads.
                  </li>
                  <li>
                    Harass, threaten, or impersonate other individuals or
                    companies.
                  </li>
                </ul>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 7. AI GENERATED CONTENT DISCLAIMER */}
              <TermsSection
                id="ai-disclaimer"
                title="7. AI Generated Content Disclaimer"
              >
                <p>
                  PlusFolio integrates advanced artificial intelligence features
                  powered by <strong>Google Gemini</strong>. These AI tools help
                  structure bullet points, suggest professional wording, and
                  parse rough text into organized career profiles.
                </p>
                <p>
                  <strong>Optional &amp; Manual First:</strong> Using AI is
                  completely optional. You can manually create, edit, and format
                  every word of your documents without ever triggering an AI
                  prompt.
                </p>

                {/* SPECIAL HIGHLIGHTED AI CALLOUT */}
                <CalloutBanner
                  icon={Bot}
                  title="🤖 AI Transparency"
                  badgeText="Important Notice"
                  theme="amber"
                  description="AI-generated resumes and career documents are created to assist users, but they should always be reviewed before professional or official use. Users remain responsible for verifying the accuracy of all generated content."
                />

                <p>
                  AI tools can sometimes generate inaccuracies, grammatical
                  quirks, or hallucinations. You are the final editor of your
                  resume and assume full responsibility for any statements
                  submitted to employers.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 8. USER CONTENT OWNERSHIP */}
              <TermsSection
                id="user-content-ownership"
                title="8. User Content Ownership"
              >
                <p>
                  <strong>100% Yours:</strong> You retain complete and exclusive
                  ownership over all text, work history, biodata details,
                  images, and portfolios that you enter into PlusFolio.
                </p>
                <p>
                  We do not claim any copyright over your completed resumes or
                  cover letters. By using our platform, you grant PlusFolio a
                  temporary, limited, operational license solely to process,
                  render, and display your documents inside your browser or
                  dashboard.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 9. INTELLECTUAL PROPERTY */}
              <TermsSection
                id="intellectual-property"
                title="9. Intellectual Property"
              >
                <p>
                  While you own your personal resume content,{" "}
                  <strong>PlusFolio and Interesting Plus</strong> retain
                  complete intellectual property ownership over the platform
                  itself. This includes, but is not limited to:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>Our brand name, logo, and visual identity</li>
                  <li>All frontend and backend source code</li>
                  <li>Our proprietary resume and biodata layouts/templates</li>
                  <li>UI/UX design, graphics, and interactive elements</li>
                  <li>All software architecture and styling systems</li>
                </ul>
                <p className="mt-2">
                  You may not redistribute, resell, or package PlusFolio
                  templates as your own competing commercial product.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 10. ADVERTISEMENTS */}
              <TermsSection id="advertisements" title="10. Advertisements">
                <p>
                  To keep PlusFolio free and accessible to students and job
                  seekers globally, our platform may display advertisements
                  through trusted partners such as{" "}
                  <strong>Google AdSense</strong>.
                </p>
                <p>
                  These advertising providers may use cookies or non-sensitive
                  technical data to serve relevant ads. We never sell your
                  personal resume details or email addresses to advertisers.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 11. PREMIUM SERVICES (FUTURE) */}
              <TermsSection
                id="premium-services"
                title="11. Premium Services (Future)"
              >
                <p>
                  We are continuously evolving PlusFolio. In the future, we may
                  introduce optional paid subscription plans or premium add-ons.
                  Future premium plans may provide enhancements such as:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>An ad-free workspace experience</li>
                  <li>Unlimited AI generation and parsing quotas</li>
                  <li>Exclusive executive and specialty design templates</li>
                  <li>Advanced portfolio export and branding tools</li>
                </ul>
                <p className="mt-2">
                  Any transition to paid services will be clearly communicated.
                  Existing free core functionalities will always be
                  transparently maintained where feasible.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 12. THIRD-PARTY SERVICES */}
              <TermsSection
                id="third-party-services"
                title="12. Third-Party Services"
              >
                <p>
                  PlusFolio relies on trusted cloud providers and infrastructure
                  partners to operate smoothly. These include:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                  <li>
                    <strong>Google &amp; LinkedIn OAuth:</strong> For secure
                    social sign-in.
                  </li>
                  <li>
                    <strong>Google Gemini:</strong> For AI text processing and
                    resume structuring.
                  </li>
                  <li>
                    <strong>Netlify &amp; Render:</strong> For web hosting and
                    backend servers.
                  </li>
                  <li>
                    <strong>Google Sheets:</strong> For selected operational
                    database structures.
                  </li>
                  <li>
                    <strong>Google Analytics &amp; Clarity:</strong> For
                    anonymous product analytics.
                  </li>
                </ul>
                <p className="mt-2">
                  Your interaction with third-party providers is subject to
                  their respective terms of service and privacy policies.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 13. SERVICE AVAILABILITY */}
              <TermsSection
                id="service-availability"
                title="13. Service Availability"
              >
                <p>
                  We strive to maintain high uptime and reliable access to
                  PlusFolio. However, we do not guarantee uninterrupted
                  availability. The platform may occasionally undergo temporary
                  downtime for routine maintenance, security patching, or server
                  upgrades.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 14. DISCLAIMER OF WARRANTIES */}
              <TermsSection
                id="disclaimer-of-warranties"
                title="14. Disclaimer of Warranties"
              >
                <p>
                  PlusFolio is provided on an{" "}
                  <strong>"AS IS" and "AS AVAILABLE"</strong> basis without
                  explicit or implied warranties of any kind. We provide
                  software tools to assist your document design, but we make no
                  guarantees regarding real-world career outcomes.
                </p>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
                  <p className="font-semibold text-slate-900 mb-2">
                    Specifically, PlusFolio does NOT guarantee:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-6 text-slate-600">
                    <li>Job interviews or employment placement</li>
                    <li>Acceptance into universities or academic programs</li>
                    <li>
                      Marriage proposals or matrimonial matchmaking success
                    </li>
                    <li>Visa approvals or immigration clearances</li>
                    <li>
                      The acceptance of any generated document by third parties
                    </li>
                  </ul>
                </div>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 15. LIMITATION OF LIABILITY */}
              <TermsSection
                id="limitation-of-liability"
                title="15. Limitation of Liability"
              >
                <p>
                  To the maximum extent permitted by applicable law,{" "}
                  <strong>
                    Interesting Plus, PlusFolio, and its founder Jatin Poriya
                  </strong>{" "}
                  shall not be held liable for any indirect, incidental,
                  consequential, special, or punitive damages arising out of
                  your use of the Platform.
                </p>
                <p>
                  This includes, without limitation, losses related to
                  employment opportunities, rejected applications, data loss, or
                  system interruptions.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 16. ACCOUNT SUSPENSION & TERMINATION */}
              <TermsSection
                id="account-suspension"
                title="16. Account Suspension &amp; Termination"
              >
                <p>
                  You may terminate your agreement with us at any time by
                  deleting your account from your user dashboard and clearing
                  your local browser data.
                </p>
                <p>
                  We reserve the right to suspend or permanently terminate
                  accounts that violate these Terms, engage in server abuse,
                  attempt unauthorized access, or use our tools for fraudulent
                  or malicious purposes.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 17. FAIR USAGE POLICY */}
              <TermsSection
                id="fair-usage-policy"
                title="17. Fair Usage Policy"
              >
                <p>
                  To ensure fast server response times and reliable AI
                  generation for all users, PlusFolio operates under a community
                  Fair Usage Policy.
                </p>

                {/* SPECIAL HIGHLIGHTED FAIR USAGE CALLOUT */}
                <CalloutBanner
                  icon={Scale}
                  title="⚖️ Fair Usage"
                  badgeText="Community Policy"
                  theme="blue"
                  description="Our mission is to keep PlusFolio accessible to everyone. Please avoid automated abuse, excessive requests, or activities that negatively impact other users. We may temporarily restrict access to protect the platform."
                />

                <p>
                  Automated scraping of AI endpoints, scripts designed to
                  overload document rendering, or sharing single accounts among
                  massive groups is strictly prohibited.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 18. PRIVACY */}
              <TermsSection id="privacy" title="18. Privacy">
                <p>
                  Your privacy is a core principle of PlusFolio. Our data
                  handling practices—including how we manage local browser
                  storage, authentication cookies, and optional cloud
                  backups—are comprehensively detailed in our{" "}
                  <a
                    href="/privacy"
                    className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 19. CHANGES TO TERMS */}
              <TermsSection id="changes-to-terms" title="19. Changes to Terms">
                <p>
                  We may periodically revise these Terms &amp; Conditions to
                  reflect new features, legal changes, or product improvements.
                  When updates occur, we will modify the{" "}
                  <strong>"Last Updated"</strong> date at the top of this
                  document.
                </p>
                <p>
                  Your continued use of PlusFolio after any revised terms are
                  posted constitutes your binding acceptance of the updated
                  agreement.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 20. GOVERNING LAW (INDIA) */}
              <TermsSection
                id="governing-law"
                title="20. Governing Law (India)"
              >
                <p>
                  These Terms &amp; Conditions and any dispute arising out of or
                  related to your use of PlusFolio shall be governed by and
                  construed in accordance with the laws of{" "}
                  <strong>India</strong>, without regard to conflict of law
                  principles.
                </p>
                <p>
                  Any legal actions or proceedings relating to PlusFolio shall
                  be subject to the exclusive jurisdiction of the competent
                  courts in India.
                </p>
              </TermsSection>

              <hr className="border-slate-200" />

              {/* 21. CONTACT INFORMATION */}
              <ContactCard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
