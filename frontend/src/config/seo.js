const BASE_URL = "https://plusfolio.netlify.app";

export const seo = {
  // ===========================
  // Main Pages
  // ===========================

  home: {
    title: "PlusFolio | Free AI Resume Builder, Biodata Maker & Career Tools",
    description:
      "Create ATS-friendly resumes, professional biodatas, cover letters, portfolios and career documents with AI. Free, privacy-first and easy to use. Powered by Interesting Plus.",
    canonical: `${BASE_URL}/`,
  },

  login: {
    title: "Login | PlusFolio",
    description:
      "Login to your PlusFolio account to access your saved resumes and career tools.",
    canonical: `${BASE_URL}/login`,
    robots: "noindex,nofollow",
  },

  signup: {
    title: "Create Account | PlusFolio",
    description:
      "Create your free PlusFolio account to securely save and manage your resumes and career documents.",
    canonical: `${BASE_URL}/signup`,
    robots: "noindex,nofollow",
  },

  // ===========================
  // Google Adsense Pages
  // ===========================

  privacy: {
    title: "Privacy Policy | PlusFolio",
    description:
      "Read how PlusFolio protects your privacy and personal information while using our AI-powered career tools.",
    ogDescription:
      "We believe your personal information belongs to you. No account required for supported tools, local mode available, and you stay in control.",
    canonical: `${BASE_URL}/privacy`,
  },

  terms: {
    title: "Terms & Conditions | PlusFolio",
    description:
      "Read the PlusFolio Terms & Conditions. Learn about our guest mode, AI generation transparency, fair usage policies, and how you retain 100% ownership of your career documents.",
    ogDescription:
      "Transparent, friendly, and privacy-first Terms & Conditions for PlusFolio. You retain 100% ownership of your resumes, biodatas, and career portfolios.",

    canonical: `${BASE_URL}/terms`,
  },

  about: {
    title: "About Us | PlusFolio",
    description:
      "Learn about PlusFolio, our mission, vision, and the team behind INTERESTING Plus. Discover why we're building free AI-powered career tools with privacy, simplicity, and accessibility at the core.",
    ogDescription:
      "Learn about PlusFolio, our mission, vision, and the team behind INTERESTING Plus. Discover why we're building free AI-powered career tools with privacy at the core.",
    twitterDescription:
      "Discover why we're building free AI-powered career tools with privacy, simplicity, and accessibility at the core.",
    ogImage: `${BASE_URL}/images/seo/about-us.png`,
    canonical: `${BASE_URL}/about`,
  },

  contact: {
    title: "Contact Us | PlusFolio",
    description:
      "Get in touch with the PlusFolio team. Contact INTERESTING Plus for support, feedback, partnerships, feature requests, or business inquiries.",
    ogDescription:
      "Get in touch with the PlusFolio team. Contact INTERESTING Plus for support, feedback, or business inquiries.",
    canonical: `${BASE_URL}/contact`,
  },

  faq: {
    title: "Frequently Asked Questions | PlusFolio",
    description:
      "Find answers to frequently asked questions about PlusFolio, AI Resume Builder, Biodata Builder, ATS Checker, accounts, privacy, templates, and more.",
    twitterDescription:
      "Find answers to frequently asked questions about PlusFolio, AI Resume Builder, Biodata Builder, accounts, and privacy.",
    canonical: `${BASE_URL}/faq`,
  },

  pricing: {
    title: "Pricing | PlusFolio Premium",
    description:
      "Compare Free and Premium plans of PlusFolio and unlock advanced AI features, templates and career tools.",
    canonical: `${BASE_URL}/pricing`,
  },

  blog: {
    title: "Career Blog | PlusFolio",
    description:
      "Explore career advice, resume writing tips, interview preparation, ATS optimization and job search guides.",
    canonical: `${BASE_URL}/blog`,
  },

  // ===========================
  // SEO Landing Pages
  // ===========================

  resumeBuilder: {
    title: "Free AI Resume Builder | PlusFolio",
    description:
      "Generate professional ATS-friendly resumes in seconds using AI. Choose beautiful templates and download your resume for free.",
    canonical: `${BASE_URL}/resume-builder`,
  },

  biodataMaker: {
    title: "Free Biodata Maker | PlusFolio",
    description:
      "Create professional marriage biodatas with modern templates. Simple, fast and privacy-first.",
    canonical: `${BASE_URL}/biodata-maker`,
  },

  atsChecker: {
    title: "ATS Resume Checker | PlusFolio",
    description:
      "Analyze your resume with ATS-friendly checks and improve your chances of getting shortlisted.",
    canonical: `${BASE_URL}/ats-checker`,
  },

  coverLetter: {
    title: "AI Cover Letter Generator | PlusFolio",
    description:
      "Generate personalized and professional cover letters with AI for your next job application.",
    canonical: `${BASE_URL}/cover-letter-generator`,
  },

  portfolioBuilder: {
    title: "Portfolio Builder | PlusFolio",
    description:
      "Build a professional portfolio website to showcase your skills, projects and achievements.",
    canonical: `${BASE_URL}/portfolio-builder`,
  },

  // ===========================
  // SEO Articles / Content Pages
  // ===========================

  resumeExamples: {
    title: "Resume Examples | PlusFolio",
    description:
      "Browse professional resume examples for students, freshers and experienced professionals.",
    canonical: `${BASE_URL}/resume-examples`,
    type: "article",
  },

  resumeTemplates: {
    title: "Free Resume Templates | PlusFolio",
    description:
      "Download and customize modern, ATS-friendly resume templates for every profession.",
    canonical: `${BASE_URL}/resume-templates`,
    type: "article",
  },

  resumeSamples: {
    title: "Resume Samples | PlusFolio",
    description:
      "Explore ready-to-use resume samples and learn how to create impressive resumes.",
    canonical: `${BASE_URL}/resume-samples`,
    type: "article",
  },

  biodataSamples: {
    title: "Marriage Biodata Samples | PlusFolio",
    description:
      "View beautifully designed marriage biodata samples and templates for free.",
    canonical: `${BASE_URL}/biodata-samples`,
    type: "article",
  },

  resumeFormat: {
    title: "Best Resume Format | PlusFolio",
    description:
      "Learn which resume format is best for freshers, experienced professionals and job seekers.",
    canonical: `${BASE_URL}/resume-format`,
    type: "article",
  },

  resumeTips: {
    title: "Resume Writing Tips | PlusFolio",
    description:
      "Discover practical resume writing tips to improve your resume and increase interview opportunities.",
    canonical: `${BASE_URL}/resume-tips`,
    type: "article",
  },

  interviewTips: {
    title: "Interview Tips | PlusFolio",
    description:
      "Prepare confidently with interview tips, common questions and expert career advice.",
    canonical: `${BASE_URL}/interview-tips`,
    type: "article",
  },

  careerBlog: {
    title: "Career Advice Blog | PlusFolio",
    description:
      "Read expert articles on careers, resumes, interviews, AI tools, productivity and professional growth.",
    canonical: `${BASE_URL}/career-blog`,
    type: "article",
  },
};
