import React from "react";
import TermsAndConditionsPage from "./TermsPage";
import { createMetadata } from "@/lib/metadata";
import { seo } from "@/config/seo";

export const metadata = createMetadata(seo.terms);

const page = () => {
  return <TermsAndConditionsPage />;
};

export default page;
