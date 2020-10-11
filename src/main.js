import Vue from 'vue'
import App from './App.vue'
import { router } from "./router/index.js";
import VueYoutube from "vue-youtube";
import "./assets/enc.css";
import InfiniteLoading from 'vue-infinite-loading';


Vue.use(InfiniteLoading, { /* options */ });
Vue.use(VueYoutube);
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
