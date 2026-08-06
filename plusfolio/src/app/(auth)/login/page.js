import LoginPage from "./LoginPage";
import { seo } from "@/config/seo";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata(seo.login);

export default function Page() {
  return <LoginPage />;
}
