import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateResumePage } from "./pages/CreateResumePage";
import { EditorPage } from "./pages/EditorPage";
import { PreviewPage } from "./pages/PreviewPage";
import SamplePage from "./pages/Sample";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LandingLayout from "./components/layout/LandingLayout";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // 1️⃣ CRITICAL: Jab tak backend se session verify ho raha hai, loader dikhao
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Verifying session...</p>
        </div>
      </div>
    );
  }

  // 2️⃣ Loading khatam hone ke baad hi check karo ki user hai ya nahi
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// Recommended for Google Adsense
// - About Us
// - Privacy Policy
// - Terms & Conditions
// - Contact Us
// - Blogs
// - FAQ
// - Pricing (Premium)
// - Resume Templates
// - Resume Samples
// - Biodata Samples

// Future SEO Pages - Traffic
// - Resume Builder
// - Biodata Maker
// - ATS Checker
// - Cover Letter Generator
// - Portfolio Builder
// - Resume Examples
// - Resume Templates
// - Resume Format
// - Resume Tips
// - Interview Tips
// - Career Blog

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sample" element={<SamplePage />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignupPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/privacy"
        element={
          <LandingLayout>
            <PrivacyPolicyPage />
          </LandingLayout>
        }
      />

      <Route
        path="/terms"
        element={
          <LandingLayout>
            <TermsAndConditionsPage />
          </LandingLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateResumePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editor/:id"
        element={
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preview/:id"
        element={
          <ProtectedRoute>
            <PreviewPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
