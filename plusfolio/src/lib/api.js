// src/lib/api.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request(endpoint, { method = "GET", body, headers = {} } = {}) {
  const config = {
    method,
    // CRITICAL: Tells browser to send/receive HttpOnly cookies automatically
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Return a standardized error object matching your old Supabase signature
      return {
        data: null,
        status: response.status,
        error: data?.message || `Request failed with status ${response.status}`,
      };
    }

    return { data, error: null };
  } catch (error) {
    // Handles network down, DNS failure, or CORS errors
    return {
      data: null,
      error: "Network error. Please check your connection.",
    };
  }
}

export const authApi = {
  getCurrentUser: () => request("/auth/me"),
  signUp: (email, password, name) =>
    request("/auth/signup", {
      method: "POST",
      body: { email, password, name },
    }),
  signIn: (email, password) =>
    request("/auth/signin", {
      method: "POST",
      body: { email, password },
    }),
  signOut: () =>
    request("/auth/signout", {
      method: "POST",
    }),
  signInWithGoogle: () => {
    if (typeof window !== "undefined") {
      window.location.assign(`${BASE_URL}/auth/google`);
    }
  },
  signInWithLinkedIn: () => {
    if (typeof window !== "undefined") {
      window.location.assign(`${BASE_URL}/auth/linkedin`);
    }
  },
};

export const resumeApi = {
  generateWithAI: (title, rawInput) =>
    request("/resumes/generate-ai", {
      method: "POST",
      body: { title, rawInput },
    }),

  createManual: (title, rawInput) =>
    request("/resumes", {
      method: "POST",
      body: { title, rawInput, ai_generated: false },
    }),

  getAll: () => request("/resumes"),

  // Get a single resume by ID
  getById: (id) => request(`/resumes/${id}`),

  // Update resume fields by ID
  update: (id, updates) =>
    request(`/resumes/${id}`, {
      method: "PUT",
      body: updates,
    }),

  // Delete resume by ID
  delete: (id) =>
    request(`/resumes/${id}`, {
      method: "DELETE",
    }),
};
