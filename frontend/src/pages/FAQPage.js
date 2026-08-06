// src/pages/FAQPage.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Minus,
  MessageSquare,
  ArrowRight,
  HelpCircle,
  FileText,
  Sparkles,
  ExternalLink,
} from "lucide-react";

import { faqCategories, faqItems } from "../data/faqData";
import { seo } from "../config/seo";
import SEO from "../components/SEO";

// ============================================================================
// 1. HERO SECTION
// ============================================================================
function FAQHero({ totalCount }) {
  return (
    <div className="mx-auto max-w-3xl text-center pb-10 border-b border-slate-200/80">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/10 mb-6">
        <HelpCircle className="h-4 w-4 text-blue-600" />
        <span>Help Center &amp; Documentation</span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        Frequently Asked <span className="text-blue-600">Questions</span>
      </h1>

      <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
        Find answers to the most common questions about{" "}
        <Link
          to="/"
          className="font-semibold text-slate-900 hover:text-blue-600 underline underline-offset-4"
        >
          PlusFolio
        </Link>
        , AI-powered career tools, privacy, accounts, templates, and more.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-100/80 border border-slate-200/70 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <span>{totalCount} Questions Answered</span>
      </div>
    </div>
  );
}

// ============================================================================
// 2. SEARCH SECTION
// ============================================================================
function FAQSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions, answers, or categories (e.g., 'resume', 'PDF', 'guest mode')..."
          className="w-full rounded-2xl border border-slate-200/80 bg-white py-4 pl-12 pr-4 text-sm sm:text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 3. CATEGORY PILLS
// ============================================================================
function FAQCategories({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        const count = categoryCounts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${isActive ? "text-blue-400" : "text-slate-400"}`}
            />
            <span>{cat.label}</span>
            <span
              className={`ml-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// 4. FAQ ACCORDION COMPONENT
// ============================================================================
function FAQAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/50 p-12 text-center">
        <HelpCircle className="mx-auto h-12 w-12 text-slate-400 mb-3" />
        <h3 className="text-lg font-bold text-slate-900">
          No matching FAQs found.
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Try searching for a different keyword or select another category
          filter above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 ${
              isOpen
                ? "border-blue-200 bg-white shadow-md shadow-blue-900/5 ring-1 ring-blue-500/10"
                : "border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleAccordion(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-slate-900 sm:text-base cursor-pointer focus:outline-none"
            >
              <span className="leading-snug">{item.question}</span>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isOpen
                    ? "bg-blue-50 text-blue-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm sm:text-base leading-relaxed text-slate-600 animate-in fade-in duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 5. STILL NEED HELP CTA CARD
// ============================================================================
function FAQCTA() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 sm:p-12 text-white shadow-xl shadow-slate-900/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
      <div className="max-w-xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/20">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>We're Here to Help</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Didn't find your answer?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Our team is always happy to help you. Whether it's feedback, a bug
          report, a feature request, or a simple question, feel free to contact
          us directly.
        </p>
      </div>

      <div className="shrink-0 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors cursor-pointer"
        >
          <span>Contact Us</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-4 text-sm font-semibold text-white hover:bg-white/15 transition-colors border border-white/10"
        >
          <span>Visit About Page</span>
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Calculate dynamic count for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: faqItems.length };
    faqItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter FAQs based on active category & live search input across questions, answers, and category names
  const filteredFAQs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const query = searchQuery.toLowerCase();
      const matchesQuestion = item.question.toLowerCase().includes(query);
      const matchesAnswer = item.answer.toLowerCase().includes(query);
      const matchesCategoryName = item.category
        .replace("-", " ")
        .toLowerCase()
        .includes(query);

      return (
        matchesCategory &&
        (matchesQuestion || matchesAnswer || matchesCategoryName)
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SEO {...seo.faq} />

      <main className="min-h-screen bg-slate-50/60 py-12 sm:py-16 lg:py-20 text-slate-700 antialiased">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 1. HERO SECTION */}
          <FAQHero totalCount={faqItems.length} />

          {/* 2. SEARCH SECTION */}
          <FAQSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* 3. CATEGORY PILLS */}
          <FAQCategories
            categories={faqCategories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categoryCounts={categoryCounts}
          />

          {/* 4. FAQ ACCORDION LIST */}
          <div className="mx-auto max-w-4xl">
            <FAQAccordion items={filteredFAQs} />
          </div>

          {/* QUICK TOOL EXPLORER (Internal SEO Linking) */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Explore PlusFolio Career Tools &amp; Resources
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
              <Link
                to="/resume-builder"
                className="hover:text-blue-600 transition"
              >
                Resume Builder
              </Link>
              <span>•</span>
              <Link
                to="/biodata-builder"
                className="hover:text-blue-600 transition"
              >
                Biodata Builder
              </Link>
              <span>•</span>
              <Link
                to="/ats-checker"
                className="hover:text-blue-600 transition"
              >
                ATS Checker
              </Link>
              <span>•</span>
              <Link
                to="/portfolio-builder"
                className="hover:text-blue-600 transition"
              >
                Portfolio Builder
              </Link>
              <span>•</span>
              <Link
                to="/cover-letter-generator"
                className="hover:text-blue-600 transition"
              >
                Cover Letter Generator
              </Link>
              <span>•</span>
              <Link to="/blog" className="hover:text-blue-600 transition">
                Blog
              </Link>
              <span>•</span>
              <Link to="/pricing" className="hover:text-blue-600 transition">
                Pricing
              </Link>
            </div>
          </div>

          {/* 5. STILL NEED HELP CTA CARD */}
          <FAQCTA />
        </div>
      </main>
    </>
  );
}
