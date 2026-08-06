"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { authApi } from "@/lib/api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Validate session with backend on initial app load
  const checkSession = useCallback(async () => {
    setLoading(true);
    const { data, error } = await authApi.getCurrentUser();

    if (error || !data?.user) {
      setUser(null);
    } else {
      setUser(data.user);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // 2. SignUp Handler
  const signUp = async (email, password, name) => {
    const { data, error } = await authApi.signUp(email, password, name);
    if (error) return { error };

    // If your backend automatically logs the user in on signup:
    if (data?.user) {
      setUser(data.user);
    }
    return { error: null, data };
  };

  // 3. SignIn Handler
  const signIn = async (email, password) => {
    const { data, error } = await authApi.signIn(email, password);
    if (error) return { error };

    if (data?.user) {
      setUser(data.user);
    }
    return { error: null, data };
  };

  // 4. SignOut Handler
  const signOut = async () => {
    // Clear state immediately for responsive UX, then invalidate session on server
    setUser(null);
    await authApi.signOut();
  };

  // 5. Google OAuth Handler
  const signInWithGoogle = () => {
    authApi.signInWithGoogle();
  };

  // 6. LinkedIn OAuth Handler
  const signInWithLinkedIn = () => {
    authApi.signInWithLinkedIn();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        // session prop kept for backward compatibility if components check session
        session: user ? { user } : null,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
        signInWithLinkedIn,
        refreshSession: checkSession, // Bonus: allows manual session re-verification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
