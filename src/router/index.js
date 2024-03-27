import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/pages/Login.vue";
import HomePage from "@/components/pages/HomePage.vue";
import Register from "@/components/pages/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
