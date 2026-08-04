import { Helmet } from "react-helmet-async";

const BASE_URL = "https://plusfolio.netlify.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export default function SEO({
  title,
  description,
  canonical,
  robots = "index, follow",
}) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Helmet>
  );
}
