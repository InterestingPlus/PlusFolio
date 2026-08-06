import { seo } from "@/config/seo";
import { createMetadata } from "@/lib/metadata";
import React from "react";
import ContactUsPage from "./ContactPage";

export const metadata = createMetadata(seo.contact);

const page = () => {
  return <ContactUsPage />;
};

export default page;
