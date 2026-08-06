import React from "react";
import AboutPage from "./AboutPage";
import { createMetadata } from "@/lib/metadata";
import { seo } from "@/config/seo";

export const metadata = createMetadata(seo.about);

const page = () => {
  return <AboutPage />;
};

export default page;
