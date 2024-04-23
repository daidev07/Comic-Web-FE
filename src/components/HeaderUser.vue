<template>
  <!-- ======= Header ======= -->
  <header>
    <div class="py-2" style="padding: 0 100px">
      <div class="row py-4 pb-0 pb-sm-4 align-items-center">
        <div class="col-sm-4 col-lg-3 text-center text-sm-start">
          <div class="main-logo">
            <RouterLink :to="{ path: '/' }">
              <img src="/assets/img/logo.png" alt="logo" class="img-fluid" style="width: 300px; height: 80px" />
            </RouterLink>
          </div>
        </div>

        <div class="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
          <div class="search-bar border rounded-2 px-3 border-dark-subtle">
            <form id="search-form" class="text-center d-flex align-items-center" action="" method="">
              <input type="text" class="form-control border-0 bg-transparent" v-model="searchTerm" placeholder="Tìm kiếm" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="handleSearch">
                <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
              </svg>
            </form>
          </div>
        </div>

        <div class="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
          <div class="support-box text-end d-none d-xl-block">
            <span class="fs-6 secondary-font text-muted">Facebook</span>
            <h5 class="mb-0">www.facebook.com/lorcomic</h5>
          </div>
          <div class="support-box text-end d-none d-xl-block">
            <span class="fs-6 secondary-font text-muted">Email</span>
            <h5 class="mb-0">lorcomic@gmail.com</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <hr class="m-0" />
    </div>

    <div class="">
      <nav class="main-menu d-flex navbar navbar-expand-lg" style="padding: 0 100px">
        <div class="d-flex d-lg-none align-items-end mt-3">
          <ul class="d-flex justify-content-end list-unstyled m-0">
            <li>
              <a href="account.html" class="mx-3">
                <iconify-icon icon="healthicons:person" class="fs-4"></iconify-icon>
              </a>
            </li>
            <li>
              <a href="wishlist.html" class="mx-3">
                <iconify-icon icon="mdi:heart" class="fs-4"></iconify-icon>
              </a>
            </li>

            <li>
              <a href="#" class="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                <iconify-icon icon="mdi:cart" class="fs-4 position-relative"></iconify-icon>
                <span class="position-absolute translate-middle badge rounded-circle bg-primary pt-2"> 03 </span>
              </a>
            </li>

            <li>
              <a href="#" class="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">
                <iconify-icon icon="tabler:search" class="fs-4"></iconify-icon>
              </a>
            </li>
          </ul>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-body justify-content-between">
            <ul class="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0">
              <li class="nav-item" @mouseenter="hoveredItem = 1" @mouseleave="hoveredItem = 0" :style="{ backgroundColor: hoveredItem === 1 ? 'red' : '' }">
                <RouterLink class="nav-link" :to="{ path: '/' }">
                  <span>Trang chủ</span>
                </RouterLink>
              </li>
              <li class="nav-item dropdown" @mouseenter="hoveredItem = 2" @mouseleave="hoveredItem = 0" :style="{ backgroundColor: hoveredItem === 2 ? 'red' : '' }">
                <a class="nav-link dropdown-toggle" role="button" id="pages" data-bs-toggle="dropdown" aria-expanded="false">Thể loại</a>
                <ul class="dropdown-menu" aria-labelledby="pages">
                  <li v-for="category in categories" :key="category.id" @click="reload()">
                    <RouterLink class="dropdown-item" :to="{ path: `/theloaitruyen/${category.id}` }">
                      <span>{{ category.ten }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </li>
              <li class="nav-item" @mouseenter="hoveredItem = 3" @mouseleave="hoveredItem = 0" :style="{ backgroundColor: hoveredItem === 3 ? 'red' : '' }">
                <RouterLink class="nav-link" :to="{ path: '/lichsu' }">
                  <span>Lịch sử</span>
                </RouterLink>
              </li>
              <!-- End Lịch sử -->

              <li class="nav-item" @mouseenter="hoveredItem = 4" @mouseleave="hoveredItem = 0" :style="{ backgroundColor: hoveredItem === 4 ? 'red' : '' }">
                <RouterLink class="nav-link" :to="{ path: '/yeuthich' }">
                  <span>Danh sách yêu thích</span>
                </RouterLink>
              </li>
              <!-- End Favourite -->
            </ul>

            <nav class="d-none d-lg-flex align-items-end">
              <ul class="d-flex justify-content-end list-unstyled m-0">
                <li class="nav-item dropdown pe-3 profileUser" v-if="isLoggedIn">
                  <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img v-if="!currentUser.avt" src="/assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" style="width: 50px; height: 50px" />
                    <img v-else :src="apiUrl + '/' + currentUser.avt" alt="Profile" class="rounded-circle" style="width: 50px; height: 50px" />
                    <span class="d-none d-md-block dropdown-toggle ps-2">{{ this.currentUser.hoten }}</span>
                  </a>

                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile" style="z-index: 999">
                    <li class="dropdown-header">
                      <h6>{{ this.currentUser.username }}</h6>
                      <span>{{ this.currentUser.email }}</span>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <RouterLink :to="{ path: '/thongtincanhan' }" class="dropdown-item d-flex align-items-center">
                        <i class="bi bi-person"></i>
                        <span>Trang cá nhân</span>
                      </RouterLink>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li v-if="this.currentUser?.is_admin">
                      <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                        <i class="bi bi-gear"></i>
                        <RouterLink :to="{ path: '/admin' }"> Quản lý Website </RouterLink>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                        <i class="bi bi-question-circle"></i>
                        <span>Trợ giúp</span>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="#">
                        <i class="bi bi-box-arrow-right"></i>
                        <span @click="logoutClick()">Đăng xuất</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <!-- End Profile Nav -->

                <li class="dangnhap" v-if="!isLoggedIn">
                  <RouterLink :to="{ path: '/login' }">
                    <button type="button" class="btn btn-outline-primary mb-1" style="height: 100%; padding: 10px !important">Đăng nhập</button>
                  </RouterLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <!-- End Header -->
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "HeaderUser",
  components: {},
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      currentUser: {
        id: "",
        hoten: "",
        email: "",
        username: "",
        password: "",
        is_admin: "",
        avt: null,
      },
      isLoggedIn: false,
      categories: [],
      hoveredItem: 0,
      searchTerm: null,
    };
  },
  methods: {
    handleSearch() {
      if (this.searchTerm) {
        this.$router.push({ path: "/tim-kiem", query: { key: this.searchTerm } });
      }
    },
    logoutClick() {
      Swal.fire({
        title: "Bạn có chắc chắn muốn đăng xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("loggedInUser");
          Swal.fire({
            title: "Đăng xuất thành công",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            timer: 1500,
          }).then(() => {
            // Kiểm tra nếu đang ở trang thông tin cá nhân thì chuyển hướng về trang chủ
            if (this.$route.path === "/thongtincanhan") {
              this.$router.push("/");
            } else {
              window.location.reload(); // Nếu không, reload lại trang
            }
          });
        }
      });
    },
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

  mounted() {
    // Check xem có thông tin đăng nhập trong Local Storage không
    this.ShowCates();
    this.currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (this.currentUser) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
};
</script>
<style>
.nav-item:hover {
  cursor: pointer;
  /* Đổi icon chuột khi hover vào */
}

/* CSS cho hiệu ứng hover */
svg:hover {
  color: #007bff;
  /* Thay đổi màu fill khi hover */
  cursor: pointer;
  /* Thay đổi kiểu con trỏ khi hover */
}
</style>
