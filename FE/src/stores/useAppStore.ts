import { create } from "zustand";

interface AppState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  token: string | null;
  setToken: (token: string | null) => void;
}

const useAppStore = create<AppState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),

  token: null,
  setToken: (token) => set({ token }),
}));

export default useAppStore;