import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import HomePage from "@/views/user/HomePage.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Register from "@/components/Register.vue";
import TheLoai from "@/views/admin/TheLoai.vue";
import User from "@/views/admin/User.vue";

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
  {
    path: "/admin",
    name: "admin",
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "theloai",
        name: "theloai",
        component: TheLoai,
      },
      {
        path: "user",
        name: "user",
        component: User,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
