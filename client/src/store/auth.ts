// @ts-check
import { defineStore, acceptHMRUpdate } from "pinia";

type IResponseUser = {
  id: string;
  username: string;
  email: string;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: (): IResponseUser => ({
    id: "",
    username: "",
    email: "",
  }),

  getters: {
    isLogin: (state) => !!state.id,
    getUser() {
      return JSON.parse(localStorage.getItem("user") || "{}");
    },
  },

  actions: {
    logout() {
      this.$patch({
        id: "",
        username: "",
        email: "",
      });
    },

    async setToken(token: string) {
      localStorage.setItem("token", token);
    },

    async setUser(user: IResponseUser) {
      localStorage.setItem("user", JSON.stringify(user));
    },

    async login(
      userData: IResponseUser & { accessToken: string }
    ): Promise<void> {
      this.$patch({
        id: userData.id,
        username: userData.username,
        email: userData.email,
      });
      this.setToken(userData.accessToken);
      this.setUser(userData);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
