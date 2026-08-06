import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const loading = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default loading;
