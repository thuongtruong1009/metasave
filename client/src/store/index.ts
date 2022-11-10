import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return { theme: localStorage.getItem("theme") || null };
  },
  getters: {
    theme: (state: any) => state.theme,
  },
  actions: {
    setTheme(state: any, theme: string) {
      state.theme = theme;
      localStorage.setItem("theme", theme);

      const tmp = document.querySelector("html") as HTMLElement;
      tmp.classList.remove("dark");
      if (theme === "dark") tmp.classList.add("dark");
    },
    initTheme(commit: any) {
      const cachedTheme = localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : false;

      const userPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (cachedTheme) commit("setTheme", cachedTheme);
      else if (userPrefersDark) commit("setTheme", "dark");
      else commit("setTheme", "light");
    },
    toggleTheme(commit: any) {
      switch (localStorage.getItem("theme")) {
        case "light":
          commit("setTheme", "dark");
          break;
        default:
          commit("setTheme", "light");
          break;
      }
    },
  },
});
