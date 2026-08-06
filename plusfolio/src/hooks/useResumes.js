"use client";

// src/hooks/useResumes.js
import { useState, useEffect, useCallback } from "react";
import { resumeApi } from "@/lib/api";

export function useResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    const { data, error: apiError } = await resumeApi.getAll();

    if (apiError) {
      setError(apiError);
    } else {
      setResumes(data?.resumes || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const deleteResume = async (id) => {
    const { error: apiError } = await resumeApi.delete(id);
    if (!apiError) {
      setResumes((prev) => prev.filter((r) => r.id !== id));
    }
    return { error: apiError || null };
  };

  return { resumes, loading, error, refetch: fetchResumes, deleteResume };
}

export function useResume(id) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResume = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: apiError } = await resumeApi.getById(id);

    if (apiError) {
      setError(apiError);
    } else {
      setResume(data?.resume || null);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  const updateResume = async (updates) => {
    if (!id) return { error: "No resume ID provided" };

    const { data, error: apiError } = await resumeApi.update(id, updates);

    if (!apiError && data?.resume) {
      setResume(data.resume);
    }
    return { error: apiError || null };
  };

  return { resume, loading, error, updateResume, refetch: fetchResume };
}
