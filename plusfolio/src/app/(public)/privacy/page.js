import { seo } from "@/config/seo";
import { createMetadata } from "@/lib/metadata";
import React from "react";
import PrivacyPolicyPage from "./PrivacyPage";

export const metadata = createMetadata(seo.privacy);

const page = () => {
  return <PrivacyPolicyPage />;
};

export default page;
