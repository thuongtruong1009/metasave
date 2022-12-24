import { defineStore, acceptHMRUpdate } from "pinia";

type IResponseUser = {
  id: string;
  username: string;
  email: string;
};

const useAuthStore = defineStore({
  id: "auth",
  state: (): IResponseUser => ({
    id: "",
    username: "",
    email: "",
  }),

  getters: {
    isAuthenticated: (state) => !state.id,
    getUser() {
      return JSON.parse(localStorage.getItem("user") || "{}");
    },
    getRefreshToken() {
      return document.cookie.split("=")[1];
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

    async setCookie(cname: string, cvalue: string, exdays: number) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    async getAvailableCookie(cname: string) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    async checkCookie(cname: string, cvalue: string, exdays: number) {
      let user = await this.getAvailableCookie(cname);
      if (user != "" && user != null) {
        this.setCookie(cname, cvalue, exdays);
        return;
      }
      return;
    },

    async login(
      userData: IResponseUser & { accessToken: string }
    ): Promise<void> {
      this.$patch({
        id: userData.id,
        username: userData.username,
        email: userData.email,
      });
      localStorage.setItem("token", userData.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      this.checkCookie("token", userData.accessToken, 365);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export default useAuthStore;
