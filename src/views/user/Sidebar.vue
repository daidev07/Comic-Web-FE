<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <RouterLink class="nav-link" :to="{ path: '/' }">
          <i class="bi bi-grid"></i>
          <span>Trang chủ</span>
        </RouterLink>
      </li>
      <!-- End Dashboard Nav -->

      <li class="nav-item">
        <a class="nav-link" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#"> <i class="bi bi-menu-button-wide"></i><span>Thể loại</span><i class="bi bi-chevron-down ms-auto"></i> </a>
        <ul id="components-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li v-for="category in categories" :key="category.id" @click="reload()">
            <RouterLink class="nav-link" :to="{ path: `/theloaitruyen/${category.id}` }">
              <i class="bi bi-circle"></i>
              <span>{{ category.ten }}</span>
            </RouterLink>
          </li>
        </ul>
      </li>
      <!-- End Thể loại -->

      <!-- <li class="nav-item">
        <a class="nav-link" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#"> <i class="bi bi-bar-chart"></i><span>Top truyện</span><i class="bi bi-chevron-down ms-auto"></i> </a>
        <ul id="charts-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
            <RouterLink class="nav-link" :to="{ path: '/toptruyen/topngay' }">
              <i class="bi bi-circle"></i>
              <span>Top ngày</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link" :to="{ path: '/toptruyen/toptuan' }">
              <i class="bi bi-circle"></i>
              <span>Top tuần</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link" :to="{ path: '/toptruyen/topthang' }">
              <i class="bi bi-circle"></i>
              <span>Top tháng</span>
            </RouterLink>
          </li>
        </ul>
      </li> -->
      <!-- End Top -->

      <li class="nav-item" @click="checkLogIn()">
        <RouterLink class="nav-link" :to="{ path: '/lichsu' }">
          <i class="bi bi-card-list"></i>
          <span>Lịch sử</span>
        </RouterLink>
      </li>
      <!-- End Lịch sử -->

      <li class="nav-item" @click="checkLogIn()">
        <RouterLink class="nav-link" :to="{ path: '/yeuthich' }">
          <i class="bi bi-gem"></i>
          <span>Danh sách yêu thích</span>
        </RouterLink>
      </li>
      <!-- End Favourite -->
    </ul>
  </aside>
  <!-- End Sidebar-->
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "SideBar",
  data() {
    return {
      categories: [],
      currentUser: null,
    };
  },
  components: {},
  mounted() {
    this.ShowCates();
    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  },
  methods: {
    async ShowCates() {
      try {
        const reponse = await axios.get("http://localhost:8000/api/category");
        this.categories = reponse.data;
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    },
    checkLogIn() {
      if (!this.currentUser) {
        Swal.fire("Bạn chưa đăng nhập!", "Bạn phải đăng nhập mới có thể xem danh sách yêu thích!", "error").then(() => {
          // Chuyển hướng về trang chủ
          this.$router.push({ path: "/" });
        });
      }
    },
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style>
.nav-link {
  color: #012970 !important;
  background: #fff !important;
}

.router-link-active {
  color: #4154f1 !important;
}
</style>
