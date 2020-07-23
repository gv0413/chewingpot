import Vue from "vue";
import VueRouter from "vue-router";
//맛집 리스트 페이지
import ListView from "../components/Index.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: 'list',
      component: ListView,
    },
  ],
});
