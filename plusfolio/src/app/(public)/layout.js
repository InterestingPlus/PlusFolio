import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white py-12 sm:py-16 lg:py-20 text-slate-700 antialiased">
        {children}
      </main>
      <Footer />
    </>
  );
}
