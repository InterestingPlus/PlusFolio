import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("resumes")
      .select("id, title, updated_at, ai_generated, personal_info")
      .order("updated_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setResumes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const deleteResume = async (id) => {
    const { error } = await supabase.from("resumes").delete().eq("id", id);
    if (!error) {
      setResumes((prev) => prev.filter((r) => r.id !== id));
    }
    return { error: error?.message || null };
  };

  return { resumes, loading, error, refetch: fetchResumes, deleteResume };
}

export function useResume(id) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResume = async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) setError(error.message);
    else setResume(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResume();
  }, [id]);

  const updateResume = async (updates) => {
    if (!id) return { error: "No resume ID" };
    const { data, error } = await supabase
      .from("resumes")
      .update(updates)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (!error && data) setResume(data);
    return { error: error?.message || null };
  };

  return { resume, loading, error, updateResume, refetch: fetchResume };
}
