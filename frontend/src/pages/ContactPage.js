import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Heart,
  MessageSquare,
  Building2,
  User,
  ArrowRight,
  HelpCircle,
  X,
} from "lucide-react";
import SEO from "../components/SEO";
import { seo } from "../config/seo";

// ============================================================================
// BRAND SVG ICONS (Replaces Lucide-React social brand icons to fix build errors)
// ============================================================================

const GithubIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.88a1.68 1.68 0 0 0-1.68 1.68c0 .93.75 1.69 1.68 1.69a1.69 1.69 0 0 0 1.69-1.69c0-.93-.76-1.68-1.69-1.68Z" />
  </svg>
);

const InstagramIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
  </svg>
);

const TwitterIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z" />
  </svg>
);

const YoutubeIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
  </svg>
);

// ============================================================================
// 1. HERO SECTION
// ============================================================================

function ContactHero() {
  return (
    <div className="mx-auto max-w-3xl text-center pb-12 border-b border-slate-200/80">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/10 mb-6">
        <MessageSquare className="h-4 w-4 text-blue-600" />
        <span>We're Here to Help ! test</span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        Contact <span className="text-blue-600">Us</span>
      </h1>

      <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
        We'd love to hear from you. Whether you have feedback, a feature
        request, a business inquiry, or simply want to say hello, we're always
        happy to connect.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-50/80 border border-amber-200/60 px-4 py-2.5 text-xs sm:text-sm text-amber-800 font-medium">
        <Heart className="h-4 w-4 text-amber-600 shrink-0 fill-amber-500" />
        <span>
          Every suggestion, bug report, and feature request helps us make{" "}
          <Link to="/" className="font-bold underline underline-offset-4">
            PlusFolio
          </Link>{" "}
          better for everyone.
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// 2. COMPANY & FOUNDER CARDS
// ============================================================================

function CompanyCard() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <Building2 className="h-3.5 w-3.5" />
            <span>Powered by</span>
          </div>

          {/* Company Logo Placeholder */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-sm shadow-sm">
            <img
              src="https://interestingplus.netlify.app/logo.jpg"
              alt="INTERESTING Plus"
              className="h-full w-full rounded-2xl"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900">
          <a
            href="https://www.interestingplus.qzz.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
          >
            INTERESTING Plus
            <ExternalLink className="h-4 w-4 text-slate-400" />
          </a>
        </h3>

        <p className="mt-1 text-sm font-semibold text-blue-600 italic">
          "Building Things That Are Actually Interesting."
        </p>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          <a
            href="https://www.interestingplus.qzz.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-900 hover:text-blue-600 underline underline-offset-4"
          >
            INTERESTING Plus
          </a>{" "}
          is focused on creating modern digital experiences, innovative
          solutions, and meaningful products that help businesses move faster
          and grow smarter.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <a
          href="https://www.interestingplus.qzz.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 transition-colors group"
        >
          <span>Visit Company</span>
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

function FounderCard() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <User className="h-3.5 w-3.5" />
            <span>Created by</span>
          </div>

          {/* Large Circular Avatar Placeholder */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-600 text-white font-extrabold text-base shadow-sm">
            <img
              src="https://jatinporiya.netlify.app/logo192.png"
              alt="Jatin Poriya"
              className="h-full w-full rounded-2xl"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900">
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

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-semibold text-slate-500">
          <span>Founder</span>
          <span>•</span>
          <span>Full Stack Developer</span>
          <span>•</span>
          <span>Product Builder</span>
        </div>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Passionate about building useful software that solves real-world
          problems through technology, simplicity, and thoughtful design.
          Focused on creating{" "}
          <Link
            to="/"
            className="font-semibold text-slate-900 hover:text-blue-600 underline underline-offset-4"
          >
            PlusFolio
          </Link>{" "}
          for everyone.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <a
          href="https://jatinporiya.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 transition-colors group"
        >
          <span>Visit Portfolio</span>
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

// ============================================================================
// 3. CONTACT FORM COMPONENT
// ============================================================================

function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      fromEmail: "plusfolio.tech@gmail.com",
      toEmail: "poriyajatin914@gmail.com",
      replyTo: formData.email,
      fullName: formData.fullName,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (response && !response.ok) {
        throw new Error("Unable to send message. Please try again later.");
      }

      await new Promise((resolve) => setTimeout(resolve, 600));

      setLoading(false);
      setFormData({
        fullName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
      onSuccess();
    } catch (err) {
      setLoading(false);
      setError(
        err.message || "Something went wrong. Please try emailing us directly.",
      );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900">Send Us a Message</h3>
        <p className="mt-1 text-sm text-slate-500">
          Fill out the form below and our team will get back to you promptly.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jatin Poriya"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition"
            />
          </div>
        </div>

        {/* Subject Dropdown */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Partnership">Partnership</option>
            <option value="Business">Business</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you're thinking, how we can help, or share your feedback..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 transition cursor-pointer"
        >
          {loading ? (
            <span>Sending Message...</span>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// ============================================================================
// 4. CONTACT INFORMATION CARD
// ============================================================================

function ContactInfo() {
  return (
    <div className="h-full flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-sm">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">Direct Contact</h3>
        <p className="mt-1 text-sm text-slate-500">
          Prefer reaching out directly? Here is our official communication desk.
        </p>

        <div className="mt-8 space-y-6">
          {/* Email Desk */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Official Emails
              </p>
              <div className="mt-1 flex flex-col space-y-1 text-sm font-medium text-slate-900">
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
                <a
                  href="mailto:poriyajatin914@gmail.com"
                  className="hover:text-blue-600 hover:underline text-xs text-slate-500"
                >
                  poriyajatin914@gmail.com (Founder Desk)
                </a>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Phone Number
              </p>
              <a
                href="tel:+917201840095"
                className="mt-1 block text-sm font-semibold text-slate-900 hover:text-blue-600 hover:underline"
              >
                +91 72018 40095
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Headquarters
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Gujarat, India – 365560
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Business Hours
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Monday – Saturday
              </p>
              <p className="text-xs text-slate-500">10:00 AM – 7:00 PM (IST)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-xs font-medium text-slate-600 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
        <span>Usually replies within 24 hours.</span>
      </div>
    </div>
  );
}

// ============================================================================
// 5. SOCIAL LINKS (Using custom SVG brand icons)
// ============================================================================

const socialLinks = [
  {
    name: "GitHub",
    url: "http://github.com/interestingPlus/",
    icon: GithubIcon,
    color: "hover:border-slate-800 hover:text-slate-900",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/interesting-plus",
    icon: LinkedinIcon,
    color: "hover:border-[#0A66C2] hover:text-[#0A66C2]",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/jatin_poriya_404/",
    icon: InstagramIcon,
    color: "hover:border-[#E4405F] hover:text-[#E4405F]",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/poriya_jatin",
    icon: TwitterIcon,
    color: "hover:border-slate-900 hover:text-slate-900",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/jatin.poriya.54/",
    icon: FacebookIcon,
    color: "hover:border-[#1877F2] hover:text-[#1877F2]",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@INTERESTING_Plus",
    icon: YoutubeIcon,
    color: "hover:border-[#FF0000] hover:text-[#FF0000]",
  },
];

function SocialLinks() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-900">
          Follow Our Community
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Connect with us across our official social channels for updates,
          releases, and discussions.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-5 text-slate-600 shadow-xs transition-all duration-200 ${social.color}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-semibold">{social.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 6. FREQUENTLY ASKED / HELP LINKS SECTION
// ============================================================================

function FAQLinksSection() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 text-center">
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        <HelpCircle className="h-4 w-4" />
        <span>Need Instant Answers?</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        You may also want to visit our core documentation
      </h3>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Link
          to="/faq"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 shadow-xs transition"
        >
          FAQ
        </Link>
        <Link
          to="/about"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 shadow-xs transition"
        >
          About Us
        </Link>
        <Link
          to="/privacy"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 shadow-xs transition"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 shadow-xs transition"
        >
          Terms &amp; Conditions
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// 7. BOTTOM CTA CARD
// ============================================================================

function ContactCTA() {
  const scrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 sm:p-12 text-white shadow-xl shadow-slate-900/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
      <div className="max-w-xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Collaborate With Us</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Let's Build Something Amazing Together 🚀
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Whether you have a new idea, found a bug, want to collaborate, or
          simply wish to share feedback, we'd love to hear from you. Every
          message helps us improve{" "}
          <Link
            to="/"
            className="font-semibold text-white underline underline-offset-4"
          >
            PlusFolio
          </Link>{" "}
          and build better tools for everyone.
        </p>
      </div>

      <button
        type="button"
        onClick={scrollToForm}
        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors cursor-pointer"
      >
        <span>Send us a Message</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ============================================================================
// SUCCESS MODAL DIALOG
// ============================================================================

function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl border border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900">
          Thank you for contacting us!
        </h3>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          We've received your message and will get back to you as soon as
          possible.
        </p>

        <div className="mt-6 rounded-2xl bg-blue-50/70 border border-blue-100 p-4 text-xs font-medium text-blue-900">
          <span>
            ❤️ We love feedback. Every suggestion, bug report, and feature
            request helps us make{" "}
          </span>
          <Link to="/" onClick={onClose} className="font-bold underline">
            PlusFolio
          </Link>
          <span> better for everyone.</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-600 transition cursor-pointer"
        >
          Back to Website
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ContactUsPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <>
      <SEO {...seo.contact} />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <main className="min-h-screen bg-slate-50/60 py-12 sm:py-16 lg:py-20 text-slate-700 antialiased">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. HERO SECTION */}
          <ContactHero />

          {/* 2. COMPANY SHOWCASE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompanyCard />
            <FounderCard />
          </div>

          {/* 3 & 4. CONTACT FORM + DIRECT INFO DESK */}
          <div
            id="contact-form-section"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch scroll-mt-28"
          >
            <div className="lg:col-span-7">
              <ContactForm onSuccess={() => setShowSuccessModal(true)} />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>

          {/* 5. SOCIAL LINKS */}
          <SocialLinks />

          {/* 6. FREQUENTLY ASKED / HELP LINKS */}
          <FAQLinksSection />

          {/* 7. BOTTOM CTA */}
          <ContactCTA />
        </div>
      </main>
    </>
  );
}
