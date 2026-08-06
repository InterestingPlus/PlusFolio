import React from "react";
import FAQPage from "./FaqPage";
import { createMetadata } from "@/lib/metadata";
import { seo } from "@/config/seo";

export const metadata = createMetadata(seo.faq);

const page = () => {
  return <FAQPage />;
};

export default page;
