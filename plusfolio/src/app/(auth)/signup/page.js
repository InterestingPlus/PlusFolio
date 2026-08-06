import SignupPage from "./SignupPage";
import { seo } from "@/config/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(seo.signup);

export default function Page() {
  return <SignupPage />;
}
