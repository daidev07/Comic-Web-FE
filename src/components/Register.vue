<template>
    <!-- Section: Design Block -->
    <section class="text-center text-lg-start vh-100">
        <!-- Jumbotron -->
        <div class="container py-4">
            <div class="row g-0 align-items-center justify-content-center">
                <div class="col-lg-4 mb-5 mb-lg-0">
                    <div class="card cascading-right" style="
                background: hsla(0, 0%, 100%, 0.55);
                backdrop-filter: blur(30px);
              ">
                        <div class="card-body p-5 shadow-5 text-center">
                            <h1 class="fw-bold mb-5">Đăng ký ngay</h1>
                            <form>
                                <div class="form-outline mb-4">
                                    <input type="email" id="form3Example3" class="form-control" />
                                    <label class="form-label" for="form3Example3">Họ và tên</label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="email" id="form3Example3" class="form-control" />
                                    <label class="form-label" for="form3Example3">Email</label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input type="email" id="form3Example3" class="form-control" />
                                    <label class="form-label" for="form3Example3">Tài khoản</label>
                                </div>

                                <!-- Password input -->
                                <div class="form-outline mb-4">
                                    <input type="password" id="form3Example4" class="form-control" />
                                    <label class="form-label" for="form3Example4">Mật khẩu</label>
                                </div>

                                <!-- Submit button -->
                                <button type="submit" class="btn btn-primary col-4 mb-4">
                                    Đăng ký
                                </button>

                                <div class="text-center">
                                    <p>Đã có tài khoản?
                                        <RouterLink to="/login">Đăng nhập</RouterLink>
                                    </p>
                                </div>

                                <!-- Register buttons -->
                                <div class="text-center">
                                    <p>hoặc <span class="text-primary">Đăng ký</span> với:</p>
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
export default {
    name: "Login",
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