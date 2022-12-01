import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import router from "./router";
import "./assets/css/main.css";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "@/assets/css/datepicker.scss";

const app = createApp(App);

const pinia = createPinia();

app.component("Datepicker", Datepicker);

app.use(pinia);
app.use(router);
app.mount("#app");
