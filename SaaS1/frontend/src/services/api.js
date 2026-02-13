import axios from "axios";

// Backend API base URL - Aşama 9'da oluşturulacak
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth token'ı her istekte ekle (Protected routes için)
api.interceptors.request.use((config) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1] || "";
  const token = localStorage.getItem(`sb-${projectRef}-auth-token`);
  if (token) {
    try {
      const parsed = JSON.parse(token);
      const accessToken = parsed?.access_token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (_) {}
  }
  return config;
});

// Image generation endpoint - Backend hazır olduğunda kullanılacak
export async function generateImage(prompt, accessToken) {
  const response = await api.post(
    "/generate",
    { prompt },
    {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    }
  );
  return response.data;
}
