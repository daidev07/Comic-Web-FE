<template>
  <HeaderUser />
  <!-- <SideBar /> -->
  <div>
    <main id="" class="main" style="margin-top: 10px; margin-left: 380px; margin-right: 380px">
      <div class="chitiettruyen">
        <div class="pagetitle">
          <h1 class="fw-bold bg-primary p-1 rounded-1 ps-2 text-center">THÔNG TIN CÁ NHÂN</h1>
        </div>
        <!-- Thông tin truyện -->
        <div class="card mb-3">
          <div class="row g-0 align-items-center" style="margin-top: -12px; margin-bottom: 6px">
            <div class="col-md-4">
              <img src="/assets/img/1.png" class="img-fluid rounded-3 mt-3 ms-3" alt="..." style="width: 450px; height: 450px" />
            </div>
            <div class="col-md-8" style="margin-left: ">
              <div class="card-body ms-3">
                <h1 class="card-title fw-bold">Họ tên:</h1>
                <input type="text" class="rounded-2 ps-2 w-50" value="Hồ Phan Minh Tuấn" />
                <h1 class="card-title fw-bold">Email:</h1>
                <input type="text" class="rounded-2 ps-2 w-50" value="tuan@gmail.com" disabled="disabled" />
                <h1 class="card-title fw-bold">Tài khoản:</h1>
                <input type="text" class="rounded-2 ps-2 w-50" value="tuan" disabled="disabled" />
                <h1 class="card-title fw-bold"></h1>
                <div class="yeuthich">
                  <button type="button" class="btn btn-danger">Đổi mật khẩu</button>
                </div>
                <h1 class="card-title fw-bold"></h1>
                <div class="d-flex gap-2">
                  <button type="button" class="btn btn-success">Cập nhật tài khoản</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End thông tin truyện -->

        <div class="pagetitle" style="margin-top: -7px"></div>
      </div>
    </main>
    <!-- End #main -->
  </div>

  <!-- TOAST -->
</template>

<script>
import SideBar from "./Sidebar.vue";
import Header from "../../components/Header.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderUser from "@/components/HeaderUser.vue";
export default {
  name: "ThongTinCaNhan",
  components: { SideBar, HeaderUser },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<style>
.carousel-small,
.carousel-small .carousel-inner,
.carousel-small img {
  height: 500px !important;
}

.carousel-small .carousel-control-prev-icon::after,
.carousel-small .carousel-control-next-icon::after {
  content: "";
}
</style>
