import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/meal/:id",
    name: "meal",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/MealView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // This causes the browser to jump to the top of the page whenever the route changes.
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 };
  },
});

export default router;
