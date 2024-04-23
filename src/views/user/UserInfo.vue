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
            <div class="col-md-4 d-flex flex-column gap-2">
              <img v-if="!this.currentUser.avt" src="assets/img/profile-img.jpg" class="img-fluid rounded-3 mt-3 ms-3" alt="..." style="width: 450px; height: 450px" />
              <img v-else :src="avtBase64String ? 'data:image/png;base64,' + avtBase64String : apiUrl + '/' + currentUser.avt" class="img-fluid rounded-3 mt-3 ms-3" alt="..." style="width: 450px; height: 450px" />
              <input ref="uploadInput" type="file" class="d-none" style="width: 450px; height: 450px" @change="handleUpload" />
              <button class="btn btn-primary ms-3 w-100" @click="$refs.uploadInput.click()">Tải ảnh lên</button>
            </div>
            <div class="col-md-8" style="margin-left: ">
              <div class="card-body ms-3">
                <h1 class="card-title fw-bold">Họ tên:</h1>
                <input type="text" class="rounded-2 ps-2 w-50" v-model="updateUser.hoten" />
                <h1 class="card-title fw-bold">Email:</h1>
                <input type="text" class="rounded-2 ps-2 w-50" :value="currentUser.email" disabled="disabled" />
                <h1 class="card-title fw-bold">Tài khoản:</h1>
                <input type="text" class="rounded-2 ps-2 w-50" :value="currentUser.username" disabled="disabled" />
                <h1 class="card-title fw-bold"></h1>
                <div class="yeuthich">
                  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#changePassword">Đổi mật khẩu</button>
                </div>
                <h1 class="card-title fw-bold"></h1>
                <div class="d-flex gap-2">
                  <button @click="btnupdateUser()" type="button" class="btn btn-success">Cập nhật tài khoản</button>
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

  <!-- Modal thay đổi mật khẩu -->
  <div class="modal fade" id="changePassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="exampleModalLabel">Thay đổi mật khẩu</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="fw-bold">
            <div class="">
              <label for="recipient-name" class="col-form-label">Mật khẩu cũ:</label>
              <input v-model="oldPass" type="password" class="form-control" id="recipient-name" />
            </div>
            <div class="">
              <label for="recipient-name" class="col-form-label">Mật khẩu mới:</label>
              <input v-model="newPass" type="password" class="form-control" id="recipient-name" />
            </div>
            <div class="">
              <label for="recipient-name" class="col-form-label">Xác nhận lại mật khẩu:</label>
              <input v-model="conformPass" type="password" class="form-control" id="recipient-name" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button @click="btnchangePassword()" type="button" class="btn btn-success">Cập nhật mật khẩu</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal thay đổi mật khẩu -->
  <Footer/>
</template>

<script>
import SideBar from "./Sidebar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderUser from "@/components/HeaderUser.vue";
export default {
  name: "ThongTinCaNhan",
  components: { SideBar, HeaderUser, Footer },
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      updateUser: {
        hoten: null,
        avtFile: null,
        password: null,
      },
      currentUser: {
        id: null,
        hoten: null,
        avt: null,
        email: null,
        username: null,
        password: null,
      },
      avtBase64String: null,
      oldPass: null,
      newPass: null,
      conformPass: null,
    };
  },
  mounted() {
    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    this.updateUser.hoten = this.currentUser.hoten;
  },
  methods: {
    async btnchangePassword() {
      try {
        if (this.currentUser.password != this.oldPass) {
          Swal.fire("Mật khẩu cũ không hợp lệ!", "Vui lòng nhập lại!", "error");
          return;
        }
        if (this.conformPass != this.newPass) {
          Swal.fire("Xác nhận mật khẩu không khớp!", "Vui lòng nhập lại!", "error");
          return;
        }
        const formData = new FormData();
        formData.append("password", this.newPass);
        const response = await axios.put(`http://localhost:8000/api/user/update/${this.currentUser.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.currentUser = response.data;
        window.localStorage.setItem("loggedInUser", JSON.stringify(this.currentUser));
        Swal.fire({
          title: "Bạn đã cập nhật mật khẩu thành công!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },
    async btnupdateUser() {
      try {
        const formData = new FormData();
        formData.append("hoten", this.updateUser.hoten);
        if (this.updateUser.avtFile) {
          formData.append("avtFile", this.updateUser.avtFile);
        }
        const response = await axios.put(`http://localhost:8000/api/user/update/${this.currentUser.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.currentUser = response.data;
        window.localStorage.setItem("loggedInUser", JSON.stringify(this.currentUser));
        Swal.fire({
          title: "Bạn đã cập nhật thông tin thành công!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },

    async handleUpload(e) {
      const file = e.target.files[0];
      this.updateUser.avtFile = file;
      this.avtBase64String = await this.convertFileToBase64String(file);
    },

    convertFileToBase64String(file) {
      if (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            console.log(base64String);
            resolve(base64String);
          };

          reader.onerror = (error) => reject(error);

          // Đọc tệp dưới dạng base64
          reader.readAsDataURL(file);
        });
      }
    },
  },
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
