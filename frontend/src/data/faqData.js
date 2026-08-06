// src/data/faqData.js
import {
  Rocket,
  FileText,
  UserCheck,
  Cpu,
  ShieldCheck,
  User,
  Crown,
  HelpCircle,
} from "lucide-react";

export const faqCategories = [
  { id: "all", label: "All", icon: HelpCircle },
  { id: "getting-started", label: "Getting Started", icon: Rocket },
  { id: "resume-builder", label: "Resume Builder", icon: FileText },
  { id: "biodata-builder", label: "Biodata Builder", icon: UserCheck },
  { id: "ai-features", label: "AI Features", icon: Cpu },
  { id: "privacy-security", label: "Privacy & Security", icon: ShieldCheck },
  { id: "account", label: "Account", icon: User },
  { id: "premium", label: "Premium", icon: Crown },
  { id: "general", label: "General", icon: HelpCircle },
];

export const faqItems = [
  // ------------------------------------------------------------------------
  // GETTING STARTED (5 items)
  // ------------------------------------------------------------------------
  {
    id: "gs-1",
    category: "getting-started",
    question: "What is PlusFolio?",
    answer:
      "PlusFolio is an independent, technology-driven career platform created by INTERESTING Plus. It provides AI-powered builders for resumes, biodatas, portfolios, cover letters, and ATS optimization tools—helping individuals create industry-standard documents without expensive paywalls.",
  },
  {
    id: "gs-2",
    category: "getting-started",
    question: "Is PlusFolio free to use?",
    answer:
      "Yes! Our core document builders, ATS checker, and cover letter tools are completely free. We do not lock your final PDF downloads behind mandatory credit card paywalls.",
  },
  {
    id: "gs-3",
    category: "getting-started",
    question: "Do I need an account to create a resume?",
    answer:
      "No. One of our signature features is Guest Mode. You can jump straight into the builder, create your resume or biodata, and download your finished PDF immediately without mandatory sign-ups.",
  },
  {
    id: "gs-4",
    category: "getting-started",
    question: "How does Guest Mode work without signing in?",
    answer:
      "When using Guest Mode, your document data is stored locally inside your device's browser memory (Local Storage). Nothing is uploaded to our cloud servers unless you explicitly choose to create a registered account.",
  },
  {
    id: "gs-5",
    category: "getting-started",
    question: "Which devices and browsers are supported?",
    answer:
      "PlusFolio works seamlessly across all modern web browsers (Chrome, Firefox, Safari, Edge) on desktop computers, laptops, tablets, and smartphones globally.",
  },

  // ------------------------------------------------------------------------
  // RESUME BUILDER (5 items)
  // ------------------------------------------------------------------------
  {
    id: "res-1",
    category: "resume-builder",
    question: "How does the AI Resume Builder work?",
    answer:
      "Our AI Resume Builder uses Google Gemini to analyze your input text, organize work history into structured sections, and suggest action-oriented, quantifiable bullet points tailored to industry recruiting standards.",
  },
  {
    id: "res-2",
    category: "resume-builder",
    question: "Can I create resumes manually without using AI?",
    answer:
      "Absolutely. AI assistance is 100% optional. You can write, edit, format, and customize every single word of your resume manually without triggering any AI prompts.",
  },
  {
    id: "res-3",
    category: "resume-builder",
    question: "Can I edit and update my resumes later?",
    answer:
      "Yes! If you are signed in, your resumes are saved in your cloud dashboard so you can edit them anytime. If you are in Guest Mode, your draft remains accessible in your browser until you clear your local storage.",
  },
  {
    id: "res-4",
    category: "resume-builder",
    question: "Are PlusFolio resume templates ATS-friendly?",
    answer:
      "Yes. Every template is engineered with clean structural hierarchy and readable typography to ensure seamless parsing by modern Applicant Tracking Systems (ATS).",
  },
  {
    id: "res-5",
    category: "resume-builder",
    question: "Can I export my resume as a high-resolution PDF?",
    answer:
      "Yes. You can export your completed resume as a high-resolution, perfectly paginated PDF document with a single click—completely free of charge.",
  },

  // ------------------------------------------------------------------------
  // BIODATA BUILDER (4 items)
  // ------------------------------------------------------------------------
  {
    id: "bio-1",
    category: "biodata-builder",
    question: "What is the difference between a Resume and a Biodata?",
    answer:
      "A resume focuses strictly on professional experience, academic achievements, and technical skills for employment. A biodata includes comprehensive personal details (family background, birth details, marital status, and cultural preferences) and is traditionally used for marriage proposals or specialized applications.",
  },
  {
    id: "bio-2",
    category: "biodata-builder",
    question: "Can I create marriage biodata on PlusFolio?",
    answer:
      "Yes! Our Biodata Builder includes dedicated cultural and personal formatting layouts designed specifically for marriage proposals and family presentations.",
  },
  {
    id: "bio-3",
    category: "biodata-builder",
    question: "Can I use the Biodata Builder without logging in?",
    answer:
      "Yes. Like our Resume Builder, the Biodata Builder fully supports Guest Mode so you can build and download your biodata privately using local browser storage.",
  },
  {
    id: "bio-4",
    category: "biodata-builder",
    question: "Can I customize the biodata templates and sections?",
    answer:
      "Yes. You can add custom fields, toggle optional personal sections, and adjust color palettes to match your preferences.",
  },

  // ------------------------------------------------------------------------
  // AI FEATURES (4 items)
  // ------------------------------------------------------------------------
  {
    id: "ai-1",
    category: "ai-features",
    question: "Which artificial intelligence model powers PlusFolio?",
    answer:
      "PlusFolio uses advanced structured JSON parsing and text-generation endpoints powered by Google Gemini to help organize bullet points and summarize experience.",
  },
  {
    id: "ai-2",
    category: "ai-features",
    question: "How accurate is the AI-generated content?",
    answer:
      "While AI is an incredible writing assistant, it can occasionally misinterpret context or generate inaccuracies. We strongly advise users to review and verify all generated content before submitting documents professionally.",
  },
  {
    id: "ai-3",
    category: "ai-features",
    question: "Can I edit the text after the AI generates it?",
    answer:
      "Yes. AI output is simply a starting draft. You have complete editorial control to modify, delete, or rewrite any text generated by the assistant.",
  },
  {
    id: "ai-4",
    category: "ai-features",
    question: "Will my AI prompts be permanently stored?",
    answer:
      "We only transmit your prompt to Google Gemini to process your document structure. We do not sell your prompt text or use private personal inputs for third-party advertising.",
  },

  // ------------------------------------------------------------------------
  // PRIVACY & SECURITY (5 items)
  // ------------------------------------------------------------------------
  {
    id: "priv-1",
    category: "privacy-security",
    question: "Is my personal information safe with PlusFolio?",
    answer:
      "Yes. Your privacy is a core brand pillar. Guest Mode users enjoy 100% local device storage, while registered accounts use encrypted HTTPS connections and industry-standard security practices.",
  },
  {
    id: "priv-2",
    category: "privacy-security",
    question: "Do you sell user data to advertisers or third parties?",
    answer:
      "Never. We do not sell, rent, or trade your email address, resume contents, or personal biodata details to third-party data brokers or advertisers.",
  },
  {
    id: "priv-3",
    category: "privacy-security",
    question: "Can I permanently delete my account?",
    answer:
      "Yes. Registered users can permanently delete their account and wipe associated cloud documents directly from their account dashboard at any time.",
  },
  {
    id: "priv-4",
    category: "privacy-security",
    question: "Can I delete individual documents from the cloud?",
    answer:
      "Yes. You can delete any saved resume, cover letter, or biodata from your user dashboard with a single click.",
  },
  {
    id: "priv-5",
    category: "privacy-security",
    question: "How is my information protected?",
    answer:
      "We implement reasonable technical safeguards including secure JWT authentication cookies, HTTPS encryption, and minimal data retention policies as outlined in our Privacy Policy.",
  },

  // ------------------------------------------------------------------------
  // ACCOUNT (4 items)
  // ------------------------------------------------------------------------
  {
    id: "acc-1",
    category: "account",
    question: "Can I sign in using Google?",
    answer:
      "Yes! You can sign up and log in securely using your Google account with one click—no need to remember another password.",
  },
  {
    id: "acc-2",
    category: "account",
    question: "Can I use LinkedIn login?",
    answer:
      "Yes! PlusFolio supports standard LinkedIn OpenID Connect authentication to help you sign in quickly and verify your professional profile.",
  },
  {
    id: "acc-3",
    category: "account",
    question: "Can I change my account email address?",
    answer:
      "Yes. You can update your primary contact email address from your account settings inside the user dashboard.",
  },
  {
    id: "acc-4",
    category: "account",
    question: "How do I reset my password if I forget it?",
    answer:
      "Click the 'Forgot Password' link on the sign-in page. We will send a secure password reset link directly to your registered email address.",
  },

  // ------------------------------------------------------------------------
  // PREMIUM (4 items)
  // ------------------------------------------------------------------------
  {
    id: "prem-1",
    category: "premium",
    question: "Why are there advertisements on the platform?",
    answer:
      "We display non-intrusive advertisements (via Google AdSense) so we can keep our core career tools, ATS checker, and PDF downloads 100% free for students and job seekers.",
  },
  {
    id: "prem-2",
    category: "premium",
    question: "Will there be a Premium paid version of PlusFolio?",
    answer:
      "Yes. Our roadmap includes introducing optional paid subscription plans for users who require executive features and higher AI usage limits.",
  },
  {
    id: "prem-3",
    category: "premium",
    question: "What extra features will Premium include?",
    answer:
      "Future premium plans may offer unlimited AI generation quotas, executive-tier templates, multi-page portfolio exports, and custom domain integrations.",
  },
  {
    id: "prem-4",
    category: "premium",
    question: "Can Premium remove advertisements?",
    answer:
      "Yes. Subscribers to future premium tiers will enjoy a completely ad-free workspace across all document builders.",
  },

  // ------------------------------------------------------------------------
  // GENERAL (1 item - expandable as needed)
  // ------------------------------------------------------------------------
  {
    id: "gen-1",
    category: "general",
    question: "How can I contact support or report a bug?",
    answer:
      "We love community feedback! You can reach our team anytime by emailing plusfolio.tech@gmail.com or visiting our dedicated Contact Us page.",
  },
];
