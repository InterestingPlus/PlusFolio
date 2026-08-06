import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <span className="font-bold text-white">
                <span id="purple-gradient">Plus</span>
                Folio
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Helping professionals craft the perfect narrative for their
              careers through the power of artificial intelligence.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: [
                { link: "/features", text: "Features" },
                { link: "/templates", text: "Templates" },
                { link: "/pricing", text: "Pricing" },
                { link: "/reviews", text: "Reviews" },
              ],
            },
            {
              title: "Resources",
              links: [
                { link: "/resume-guide", text: "Resume Guide" },
                { link: "/career-blog", text: "Career Blog" },
                { link: "/interview-prep", text: "Interview Prep" },
                { link: "/cover-letters", text: "Cover Letters" },
              ],
            },
            {
              title: "Company",
              links: [
                { link: "/about", text: "About Us" },
                { link: "/contact", text: "Contact" },
                { link: "/privacy", text: "Privacy" },
                { link: "/terms", text: "Terms" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4 text-sm">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.link}>
                    <a
                      href={l.link}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {l.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; 2024 PlusFolio Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
