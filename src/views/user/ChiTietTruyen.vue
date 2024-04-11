<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="chitiettruyen">
        <div class="pagetitle">
          <h1 class="fw-bold bg-danger-subtle p-1 rounded-1 ps-2 text-center">CHI TIẾT</h1>
        </div>
        <!-- Thông tin truyện -->
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="`${this.apiUrl}/${detailTruyen.avt}`" class="img-fluid rounded-3 mt-3 ms-3" alt="..."
                style="width: 100%; height: 600px" />
            </div>
            <div class="col-md-8">
              <div class="card-body ms-3">
                <h1 class="card-title fw-bold fs-1">{{ detailTruyen.ten }}</h1>
                <h1 class="card-title fw-bold">Tác giả: {{ detailTruyen.tacgia }}</h1>
                <h1 class="card-title fw-bold">Trạng thái: Đang thực hiện</h1>
                <h1 class="card-title fw-bold">Chương mới nhất: {{ chapters[0]?.so }}</h1>
                <h1 class="card-title fw-bold">Lịch cập nhật: 21h thứ 4 hàng tuần</h1>
                <h1 class="card-title fw-bold">Thể loại:</h1>
                <div class="d-flex gap-2 theloai">
                  <template v-for="category in detailTruyen.categories" :key="category?.id">
                    <RouterLink :to="{ path: `/theloaitruyen/${category?.id}` }">
                      <button type="button" class="btn btn-outline-primary">{{ category?.ten }}</button>
                    </RouterLink>
                  </template>
                </div>
                <h1 class="card-title fw-bold"></h1>
                <div class="yeuthich">
                  <button v-if="!isFavorite" type="button" class="btn btn-success" @click="postFavorite()"><i
                      class="bi bi-star me-1"></i> Yêu thích</button>
                  <button v-if="isFavorite" type="button" class="btn btn-success" @click="deleteFavorite()"><i
                      class="bi bi-star me-1"></i> Bỏ yêu
                    thích</button>
                </div>
                <h1 class="card-title fw-bold"></h1>
                <div class="d-flex gap-2">
                  <RouterLink :to="{ path: `${truyenId}/doc-truyen/${chapters[chapters.length - 1]?.id}` }">
                    <button type="button" class="btn btn-danger">Đọc từ đầu</button>
                  </RouterLink>
                  <RouterLink :to="{ path: `${truyenId}/doc-truyen/${chapters[0]?.id}` }">
                    <button type="button" class="btn btn-primary">Đọc chương mới nhất</button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End thông tin truyện -->
        <div class="pagetitle" style="margin-top: -4px">
          <h1 class="fw-bold bg-danger-subtle p-1 rounded-1 ps-2 text-center">NỘI DUNG TRUYỆN</h1>
        </div>
        <!-- Mô tả nội dung -->
        <div class="card p-2">
          <h5>{{ detailTruyen.gioithieu }}</h5>
        </div>
        <!-- End Mô tả nội dung -->
        <div class="pagetitle" style="margin-top: -18px">
          <h1 class="fw-bold bg-danger-subtle p-1 rounded-1 ps-2 text-center">DANH SÁCH CHƯƠNG</h1>
        </div>
        <!-- Danh sách chương -->
        <div class="card p-2">
          <!-- Default Table -->
          <table class="table">
            <thead>
              <tr class="fs-4">
                <th class="fw-bold" scope="col">Tên chương</th>
                <th class="fw-bold col-2 text-center" scope="col">Trạng thái</th>
                <th class="fw-bold col-2 text-center" scope="col">Cập nhật</th>
                <th class="fw-bold col-2 text-center" scope="col">Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              <tr class="fs-8" v-for="chapter in chapters" :key=chapter?.id>
                <td class="fw-bold" scope="row" style="font-size: 18px">
                  <RouterLink :to="{ path: `${truyenId}/doc-truyen/${chapter.id}` }">
                    Chapter {{ chapter.so }}: {{ chapter.ten }}
                  </RouterLink>
                </td>
                <td class="col-2 text-center"><i class="bi bi-eye-slash-fill" style="font-size: 20px"></i></td>
                <td class="col-2 text-center">{{ formatTimeAgo(chapter.thoi_gian_dang) }}</td>
                <td class="col-2 text-center">{{ chapter.view }}</td>
              </tr>
            </tbody>
          </table>
          <!-- End Default Table Example -->
        </div>
        <!-- End Danh sách chương -->
        <div class="pagetitle" style="margin-top: -18px">
          <h1 class="fw-bold bg-danger-subtle p-1 rounded-1 ps-2 text-center">BÌNH LUẬN</h1>
          <div class="mt-2">
            <textarea v-model="newComment.noidung" class="form-control binhluan" rows="3" id="message-text"
              placeholder="Người tiện tay vẽ hoa vẽ lá, tôi đa tình tưởng đó là mùa xuân..."></textarea>
          </div>
          <div class="d-flex justify-content-end mt-1">
            <button @click="addNewComment()" type="button" class="btn btn-success my-1 px-3">Gửi</button>
          </div>

          <div class="d-flex w-100" v-for="comment in comments" :key="comment.id">
            <img src="/assets/img/profile-img.jpg" alt="Profile" class="rounded-circle mt-1"
              style="height: 50px; width: 50px" />
            <div class="nguoibinhluan d-flex flex-column mb-2 w-100 ms-2">
              <div class="">
                <label for="" class="fw-bold ms-1 text-success">{{ comment?.user.hoten }}</label>
                <label for="" class="ms-2" style="font-size: 14px">{{ formatTimeAgo(comment.thoi_gian_dang) }}</label>
              </div>
              <label for="" class="fw-bold bg-secondary-subtle p-2 rounded-2">{{ comment.noidung }}</label>
              <a href="" class="ms-2 fs-9 text-danger" style="font-size: 14px">Xoá</a>
            </div>
          </div>
        </div>
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
export default {
  name: "ChiTietTruyen",
  components: { SideBar, Header },
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      truyenId: null,
      detailTruyen: {
        id: null,
        avt: null,
        ten: null,
        tacgia: null,
        gioithieu: null,
        thoi_gian_dang: null,
        view: null,
        categories: [],
      },
      comments: [
        {
          id: null,
          user: {
            hoten: null,
          },
          id_truyen: null,
          noidung: null,
          thoi_gian_dang: null,
        },
      ],
      newComment: {
        userId: null,
        storyId: null,
        noidung: null,
      },
      currentUser: null,
      isFavorite: false,
      chapters: [],
    };
  },
  mounted() {
    this.truyenId = this.$route.params.id;
    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    this.getDetailStory();
    this.getAllCommentsByStoryId();
    this.fetchChapters();
  },
  methods: {
    async getDetailStory() {
      try {
        let response = await axios.get(`http://localhost:8000/api/story/${this.truyenId}`);
        console.log("DỮ LIỆU CHI TIẾT CỦA TRUYỆN NÀY:: ", response.data);
        this.detailTruyen = response.data;
        response = await axios.get(`http://localhost:8000/api/story/${this.truyenId}/categories`);
        this.detailTruyen.categories = response.data;
        console.log("Truyện có id là", this.detailTruyen.id + " có thể loại: " + response.data);
      } catch (error) {
        console.error("Error fetching getDetailStory data:", error);
      }
    },
    async checkFavorite() {
      try {
        const response = await axios.get(`http://localhost:8000/api/favorite/${this.currentUser.id}/${this.truyenId}`);
        const data2 = response.data;
        if (data2) {
          this.isFavorite = true;
        }
        else {
          this.isFavorite = false;
        }
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    },
    async postFavorite() {
      if (!this.currentUser) {
        Swal.fire("Bạn chưa đăng nhập!", "Bạn phải đăng nhập mới có thể thêm vào danh sách yêu thích!", "error");
      } else {
        const data = { id_story: this.detailTruyen.id, id_user: this.currentUser.id };
        const response = await axios.post("http://localhost:8000/api/favorite", data);
        console.log("THÊM VÀO YÊU THÍCH::", response.data);
        Swal.fire({
          title: "Đã thêm truyện vào danh sách yêu thích",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          timer: 1000,
        });
        this.isFavorite = true;
      }
    },
    async deleteFavorite() {
      try {
        const response = await axios.delete(`http://localhost:8000/api/favorite/${this.currentUser.id}/${this.truyenId}`);
        console.log("XÓA KHỎI YÊU THÍCH::", response.data);
        Swal.fire({
          title: "Bạn đã bỏ yêu thích truyện này!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          timer: 1000,
        });
        this.isFavorite = false;
      } catch (error) {
        console.error("Error check favorite data:", error);
      }
    },
    async getAllCommentsByStoryId() {
      try {
        const response = await axios.get(`http://localhost:8000/api/comment/${this.truyenId}`);
        this.comments = response.data.reverse();
        console.log("TẤT CẢ COMMENT:: ", response.data);
      } catch (error) {
        console.error("Error fetching all comments data:", error);
      }
    },
    async addNewComment() {
      try {
        if (!this.currentUser) {
          Swal.fire("Bạn chưa đăng nhập!", "Bạn phải đăng nhập mới có thể bình luận!", "error").then(() => {
            window.location.reload();
          });
        } else {
          this.newComment.storyId = this.truyenId;
          this.newComment.userId = this.currentUser.id;
          this.newComment.noidung = this.newComment.noidung;
          console.log("DỮ LIỆU COMMENT:: ", this.newComment);
          await axios.post("http://localhost:8000/api/comment/add", this.newComment);
          this.getAllCommentsByStoryId();
          this.newComment = {
            userId: null,
            storyId: null,
            noidung: null,
          };
          Swal.fire({
            title: "Đã gửi bình luận",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            timer: 1000,
          })
        }
      } catch (error) {
        console.error("Error post comment:", error);
      }
    },
    async fetchChapters() {
      try {
        const reponse = await axios.get(
          this.apiUrl + `/api/chapter/${this.truyenId}`
        );
        this.chapters = reponse.data;
        console.log("DANH SÁCH CHƯƠNG CÓ TRONG TRUYỆN NÀY:: ", this.chapters);
        this.chapters.reverse();
      } catch (error) {
        console.error("Error fetching chapters data:", error);
      }
    },
    formatTimeAgo(timestamp) {
      if (!timestamp || timestamp.length < 6) {
        return ""; // Trả về một giá trị rỗng nếu timestamp không hợp lệ
      }
      const currentDate = new Date();
      const postDate = new Date(timestamp[0], timestamp[1] - 1, timestamp[2], timestamp[3], timestamp[4], timestamp[5]);

      const timeDifference = currentDate - postDate;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} ngày trước`;
      } else if (hours > 0) {
        return `${hours} giờ trước`;
      } else {
        return `${minutes} phút trước`;
      }
    }
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
