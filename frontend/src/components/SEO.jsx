import { Helmet } from "react-helmet-async";

const BASE_URL = "https://plusfolio.netlify.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export default function SEO({
  title,
  ogTitle = title,

  description,
  ogDescription = description,

  canonical,
  robots = "index, follow",
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
