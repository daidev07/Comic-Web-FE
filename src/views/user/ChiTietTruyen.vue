<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="chitiettruyen">
        <div class="pagetitle">
          <h1 class="fw-bold bg-danger-subtle p-1 rounded-1 ps-2">Chi tiết truyện</h1>
        </div>
        <!-- Thông tin truyện -->
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="'data:image/jpeg;base64,' + detailTruyen.avt" class="img-fluid rounded-3 mt-3 ms-3" alt="..." style="width: 100%; height: 600px" />
            </div>
            <div class="col-md-8">
              <div class="card-body ms-3">
                <h1 class="card-title fw-bold fs-1">{{ detailTruyen.ten }}</h1>
                <h1 class="card-title fw-bold">Tác giả: {{ detailTruyen.tacgia }}</h1>
                <h1 class="card-title fw-bold">Trạng thái: Đang thực hiện</h1>
                <h1 class="card-title fw-bold">Chap mới nhất: 80</h1>
                <h1 class="card-title fw-bold">Lịch cập nhật: 21h thứ 4 hàng tuần</h1>
                <h1 class="card-title fw-bold">Thể loại:</h1>
                <div class="d-flex gap-2 theloai">
                  <button type="button" class="btn btn-outline-primary">Hành động</button>
                  <button type="button" class="btn btn-outline-primary">Hồi quy</button>
                  <button type="button" class="btn btn-outline-primary">Kiếm hiệp</button>
                </div>
                <h1 class="card-title fw-bold"></h1>
                <div class="yeuthich">
                  <button type="button" class="btn btn-success"><i class="bi bi-star me-1"></i> Yêu thích</button>
                </div>
                <h1 class="card-title fw-bold"></h1>
                <div class="d-flex gap-2">
                  <RouterLink :to="{ path: '/reading' }">
                    <button type="button" class="btn btn-danger">Đọc từ đầu</button>
                  </RouterLink>
                  <RouterLink :to="{ path: '/reading' }">
                    <button type="button" class="btn btn-primary">Đọc tiếp chương 80</button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End thông tin truyện -->
        <div class="pagetitle" style="margin-top: -4px">
          <h1 class="fw-bold bg-danger-subtle p-1 rounded-1 ps-2">Nội dung truyện</h1>
        </div>
        <!-- Mô tả nội dung -->
        <div class="card p-2">
          <h5>{{ detailTruyen.gioithieu }}</h5>
        </div>
        <!-- End Mô tả nội dung -->
        <div class="pagetitle" style="margin-top: -18px">
          <h1 class="fw-bold bg-danger-subtle p-1 rounded-1 ps-2">Danh sách chương</h1>
        </div>
        <!-- Danh sách chương -->
        <div class="card p-2">
          <!-- Default Table -->
          <table class="table">
            <thead>
              <tr class="fs-4">
                <th class="fw-bold" scope="col">Số chương</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th class="fw-bold" scope="col">Cập nhật</th>
                <th class="fw-bold" scope="col">Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              <tr class="fs-6">
                <th scope="row">Chapter 04</th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <td>16 phút trước</td>
                <td>1.234</td>
              </tr>
              <tr class="fs-6">
                <th scope="row">Chapter 03</th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <td>16 phút trước</td>
                <td>1.234</td>
              </tr>
              <tr class="fs-6">
                <th scope="row">Chapter 02</th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <td>16 phút trước</td>
                <td>1.234</td>
              </tr>
              <tr class="fs-6">
                <th scope="row">Chapter 01</th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <th scope="row"></th>
                <td>16 phút trước</td>
                <td>1.234</td>
              </tr>
            </tbody>
          </table>
          <!-- End Default Table Example -->
        </div>
        <!-- End Danh sách chương -->
      </div>
    </main>
    <!-- End #main -->
  </div>
</template>

<script>
import SideBar from "./Sidebar.vue";
import Header from "../../components/Header.vue";
import axios from "axios";
export default {
  name: "ChiTietTruyen",
  components: { SideBar, Header },
  data() {
    return {
      truyenId: null,
      detailTruyen: {
        id: null,
        avt: null,
        ten: null,
        tacgia: null,
        gioithieu: null,
        view: null,
      },
    };
  },
  methods: {
    async getDetailStory() {
      try {
        const reponse = await axios.get(`http://localhost:8000/api/home/${this.truyenId}`);
        console.log(reponse.data);
        this.detailTruyen = reponse.data;
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },
  },
  mounted() {
    this.truyenId = this.$route.params.id;
    console.log(this.truyenId); // In ra giá trị của userId
    this.getDetailStory(this.truyenId);
    this.getDetailStory();
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
