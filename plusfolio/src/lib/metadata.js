const DEFAULT_IMAGE = "/og-image.jpg";

export function createMetadata(seo) {
  return {
    title: seo.title,

    description: seo.description,

    robots: seo.robots || "index, follow",

    alternates: {
      canonical: seo.canonical,
    },

    openGraph: {
      type: seo.type || "website",

      title: seo.ogTitle || seo.title,

      description: seo.ogDescription || seo.description,

      url: seo.canonical,

      images: [
        {
          url: seo.ogImage || DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: seo.ogTitle || seo.title,

      description: seo.twitterDescription || seo.description,

      images: [seo.ogImage || DEFAULT_IMAGE],
    },
  };
}
