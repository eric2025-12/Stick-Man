// src/utils/api.js
/**
 * Minimal API wrapper. Replace fetch URLs with your backend endpoints.
 * This wrapper is intentionally tiny: it returns mock results for local dev.
 */

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

async function request(path, options = {}) {
  // For now return mock data for auth endpoints.
  // Replace with actual fetch/axios logic for production.
  const url = `${API_BASE}${path}`;
  // Uncomment for real requests:
  // const res = await fetch(url, options);
  // return res.json();

  // Simple local mocks:
  if (path.startsWith("/auth/login")) {
    return {
      user: { id: "demo", username: options.body?.username || "demo", token: "demo-token", progress: { season: 1, level: 1 } },
    };
  }
  if (path.startsWith("/auth/signup")) {
    return {
      user: { id: options.body?.username, username: options.body?.username, token: "demo-token", progress: { season: 1, level: 1 } },
    };
  }
  if (path.startsWith("/seasons")) {
    // Return seasons metadata
    return {
      seasons: [
        { id: 1, title: "City Showdown", description: "Rooftops and neon traps", levels: 5 },
        { id: 2, title: "Jungle Mayhem", description: "Vines and ancient ruins", levels: 5 },
      ],
    };
  }
  if (path.startsWith("/levels/")) {
    // path example: /levels/1 -> return level detail
    const id = path.split("/")[2];
    return { id, title: `Level ${id}`, difficulty: id, traps: [], length: 120 + id * 30 };
  }
  if (path.startsWith("/profile")) {
    return { profile: { username: "demo", coins: 100, badges: [] } };
  }

  return { ok: true };
}

export default {
  request,
  login: (data) => request("/auth/login", { method: "POST", body: data }),
  signup: (data) => request("/auth/signup", { method: "POST", body: data }),
  getSeasons: () => request("/seasons"),
  getLevel: (id) => request(`/levels/${id}`),
  getProfile: () => request("/profile"),
};