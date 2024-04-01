<template>
  <!-- Section: Design Block -->
  <section class="text-center text-lg-start vh-100">
    <!-- Jumbotron -->
    <div class="container py-4">
      <div class="row g-0 align-items-center justify-content-center">
        <div class="col-lg-4 mb-5 mb-lg-0">
          <div class="card cascading-right" style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)">
            <div class="card-body p-5 shadow-5 text-center">
              <h2 class="fw-bold mb-5">Đăng nhập</h2>
              <form>
                <!-- 2 column grid layout with text inputs for the first and last names -->

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="text" id="form3Example3" class="form-control" v-model="userCheck.username" />
                  <label class="form-label" for="form3Example3">Tài khoản</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" v-model="userCheck.password" />
                  <label class="form-label" for="form3Example4">Mật khẩu</label>
                </div>

                <!-- Submit button -->
                <button type="button" class="btn btn-primary col-4 mb-4" @click="loginUser">Đăng nhập</button>

                <div class="text-center">
                  <p>
                    Không có tài khoản?
                    <RouterLink to="/register">Đăng ký</RouterLink>
                  </p>
                </div>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>hoặc <span class="text-primary">đăng nhập</span> với:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mb-lg-0">
          <img src="../assets/bgRegister.jpg" class="rounded-4 shadow-4" alt="" />
        </div>
      </div>
    </div>
    <!-- Jumbotron -->
  </section>
  <!-- Section: Design Block -->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Login",
  data() {
    return {
      userCheck: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        const apiUrl = "http://localhost:8000";
        // Gửi yêu cầu POST để tìm kiếm người dùng theo username
        const response = await axios.post(`${apiUrl}/api/user/login`, this.userCheck);
        const userFromApi = response.data;

        // Kiểm tra xem người dùng đã được tìm thấy hay không
        if (userFromApi) {
          // Nếu người dùng tồn tại, tiến hành đăng nhập
          Swal.fire("Đăng nhập thành công", "", "success");
          this.$router.push("/");
        } else {
          // Nếu người dùng không tồn tại, hiển thị thông báo lỗi hoặc thực hiện các thao tác khác
          Swal.fire("Tên đăng nhập hoặc mật khẩu không hợp lệ!", "Vui lòng kiểm tra lại!", "error");
          console.log("Tên đăng nhập không tồn tại");
          return;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style>
