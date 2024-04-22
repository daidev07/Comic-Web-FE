import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import HomePage from "@/views/user/HomePage.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import ChapterForStory from "@/views/admin/ChapterForStory.vue";
import Register from "@/components/Register.vue";
import TheLoai from "@/views/admin/TheLoai.vue";
import User from "@/views/admin/User.vue";
import Slide from "@/views/admin/Slide.vue";
import TheLoaiTruyen from "@/views/user/TheLoaiTruyen.vue";
import LichSu from "@/views/user/LichSu.vue";
import YeuThich from "@/views/user/YeuThich.vue";
import ChiTietTruyen from "@/views/user/ChiTietTruyen.vue";
import Reading from "@/views/user/Reading.vue";
import TimKiem from "@/views/user/TimKiem.vue";
import ThongTinCaNhan from "@/views/user/UserInfo.vue";

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
      { path: "user", name: "user", component: User },
      { path: "slide", name: "slide", component: Slide },
      { path: "chi-tiet/:id", name: "chi-tiet", component: ChapterForStory },
    ],
  },
  {
    path: "/theloaitruyen/:id",
    name: "theloaitruyen",
    component: TheLoaiTruyen,
  },
  {
    path: "/lichsu",
    name: "lichsu",
    component: LichSu,
  },
  {
    path: "/tim-kiem",
    name: "timkiem",
    component: TimKiem,
  },
  {
    path: "/yeuthich",
    name: "yeuthich",
    component: YeuThich,
  },
  {
    path: "/404",
    name: "error",
    component: ErrorPage,
  },
  {
    path: "/thongtincanhan",
    name: "thongtincanhan",
    component: ThongTinCaNhan,
  },
  {
    path: "/chitiet/:id",
    name: "chitiet",
    children: [
      {
        path: "",
        name: "chitiet",
        component: ChiTietTruyen,
      },
      {
        path: "doc-truyen/:chapterId",
        name: "reading",
        component: Reading,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // Kiểm tra xem có dữ liệu người dùng trong localStorage không
  const loggedInUser = localStorage.getItem("loggedInUser");

  // Kiểm tra xem người dùng đã đăng nhập chưa bằng cách kiểm tra loggedInUser
  const isLoggedIn = loggedInUser !== null;

  // Kiểm tra xem người dùng có quyền admin hay không dựa trên thông tin từ localStorage
  const isAdmin = isLoggedIn ? JSON.parse(loggedInUser).is_admin === true : false;

  // Kiểm tra route hiện tại có thuộc về admin không
  const isAdminRoute = to.matched.some((record) => record.name === "admin");

  if (isAdminRoute && !isAdmin) {
    next({ path: "404" });
  } else {
    next();
  }
});

export default router;
