import { createApp } from "vue";
// import vuetify from "./plugins/vuetify";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.css";
import { createPinia } from "pinia";
// import { useBeveragesStore } from "./stores/beverages";

const pinia = createPinia();
// const beveragesStore = useBeveragesStore();

const vuetify = createVuetify({
  components,
  directives,
});

// pinia.use(beveragesStore);

const app = createApp(App);
app.use(router).use(vuetify).use(pinia).mount("#app");
