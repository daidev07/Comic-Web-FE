<template>
  <!-- Section: Design Block -->
  <!-- <section class="text-center text-lg-start vh-100">
    <div class="container py-4">
      <div class="row g-0 align-items-center justify-content-center">
        <div class="col-lg-4 mb-5 mb-lg-0">
          <div class="card cascading-right" style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px)">
            <div class="card-body p-5 shadow-5 text-center">
              <h2 class="fw-bold mb-5">Đăng nhập</h2>
              <form>

                <div class="form-outline mb-4">
                  <input type="text" id="form3Example3" class="form-control" v-model="userCheck.username" />
                  <label class="form-label" for="form3Example3">Tài khoản</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" v-model="userCheck.password" />
                  <label class="form-label" for="form3Example4">Mật khẩu</label>
                </div>

                <div class="">
                  <button type="button" class="btn btn-primary col-4 mb-4" @click="loginUser()">Đăng nhập</button>
                  <RouterLink :to="{ path: '/' }"><button type="button" class="btn btn-danger col-4 mb-4">Trang
                      chủ</button></RouterLink>
                </div>

                <div class="text-center">
                  <p>
                    Không có tài khoản?
                    <RouterLink to="/register">Đăng ký</RouterLink>
                  </p>
                </div>

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
  </section> -->

  <div class="wrapper">
    <div class="logo">
      <RouterLink class="logo d-flex align-items-center" :to="{ path: '/' }">
        <img src="/assets/img/logo.png" alt="" />
      </RouterLink>
    </div>
    <div class="text-center mt-4 name">
      Đăng nhập
    </div>
    <form class="p-3 mt-3">
      <div class="form-field d-flex align-items-center">
        <i class="bi bi-person"></i>
        <input type="text" name="userName" id="userName" placeholder="Username" class="form-control"
          v-model="userCheck.username">
      </div>
      <div class="form-field d-flex align-items-center">
        <i class="bi bi-key"></i>
        <input type="password" name="password" id="pwd" placeholder="Password" class="form-control"
          v-model="userCheck.password">
      </div>
      <div v-if="isEmpty" class="align-items-center" style="color: red">
        Vui lòng nhập đầy đủ thông tin
      </div>
      <div v-if="wrongInfo" class="align-items-center" style="color: red">
        Sai thông tin đăng nhập
      </div>
      <button class="dangnhap btn mt-3 bg-primary" type="button" @click="loginUser()">Đăng nhập</button>
    </form>
    <div class="text-center fs-6">
      <a href="#" class="text-primary">Quên mật khẩu?</a> hoặc <RouterLink to="/register" class="text-primary">Đăng ký
      </RouterLink>
    </div>
  </div>
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
      isEmpty: false,
      wrongInfo: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        const { username, password } = this.userCheck;
        if (!username || !password) {
          return this.isEmpty = true;
        } else {
          this.isEmpty = false;
          const apiUrl = "http://localhost:8000";
          const response = await axios.post(`${apiUrl}/api/user/login`, this.userCheck);
          const userFromApi = response.data;

          localStorage.setItem("loggedInUser", JSON.stringify(userFromApi));

          if (userFromApi.is_admin === true) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
          Swal.fire({
            title: "Đăng nhập thành công",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            timer: 1500
          })
        }
      } catch (error) {
        console.error("Error:", error);
        if (!this.isEmpty)
          this.wrongInfo = true;
        return;
      }
    }
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

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Reseting */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background: #dead6f;
}

.wrapper {
  max-width: 350px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  background-color: #ecf0f3;
  border-radius: 15px;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
  justify-content: center;
}

.logo {
  width: 80px;
}

.logo img {
  margin-left: 20px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #5f5f5f,
    0px 0px 0px 5px #ecf0f3,
    8px 8px 15px #a7aaa7,
    -8px -8px 15px #fff;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-left: 10px;
  color: #555;
}

.wrapper .form-field input {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
  /* border: 1px solid red; */
}

.wrapper .form-field {
  padding-left: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
  color: #555;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #03A9F4;
  color: #fff;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #b1b1b1,
    -3px -3px 3px #fff;
  letter-spacing: 1.3px;
}

.wrapper .btn:hover {
  background-color: #039BE5;
}

.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #03A9F4;
}

.wrapper a:hover {
  color: #039BE5;
}

@media(max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}

.dangnhap:hover {
  transform: scale(1.1);
}
</style>
