import { createApp } from "vue";
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.scss";

const app = createApp(App);

app.use(router);

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};
app.use(VueQueryPlugin, vueQueryPluginOptions);

app.mount("#app");
