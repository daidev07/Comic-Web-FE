<template>
  <HeaderUser />
  <!-- <SideBar /> -->
  <div>
    <main id="" class="main" style="margin-top: 10px; margin-left: 380px; margin-right: 380px">
      <div class="chitiettruyen">
        <div class="pagetitle">
          <h1 class="fw-bold text-white bg-primary p-1 rounded-1 ps-2 text-center">CHI TIẾT</h1>
        </div>
        <!-- Thông tin truyện -->
        <div class="card mb-3">
          <div class="row g-0 align-items-center" style="margin-top: -12px; margin-bottom: 6px">
            <div class="col-md-4">
              <img :src="`${this.apiUrl}/${detailTruyen.avt}`" class="img-fluid rounded-3 mt-3 ms-3" alt="..." style="width: 100%; height: 520px" />
            </div>
            <div class="col-md-8">
              <div class="card-body ms-3">
                <h1 class="card-title fw-bold fs-1">{{ detailTruyen.ten }}</h1>
                <h1 class="card-title fw-bold">Tác giả: {{ detailTruyen.tacgia }}</h1>
                <h1 class="card-title fw-bold">Trạng thái: Đang thực hiện</h1>
                <h1 class="card-title fw-bold">Chương mới nhất: {{ chapters[0]?.so }}</h1>
                <h1 class="card-title fw-bold">Lịch cập nhật: 21h thứ 4 hàng tuần</h1>
                <h1 class="card-title fw-bold">Thể loại:</h1>
                <div class="d-flex gap-2 theloai mb-5">
                  <template v-for="category in detailTruyen.categories" :key="category?.id">
                    <RouterLink :to="{ path: `/theloaitruyen/${category?.id}` }">
                      <button type="button" class="btn btn-outline-primary">{{ category?.ten }}</button>
                    </RouterLink>
                  </template>
                </div>

                <div class="d-flex gap-2">
                  <div class="yeuthich">
                    <button v-if="!isFavorite" type="button" class="btn btn-outline-success" @click="postFavorite()"><i class="bi bi-star me-1"></i> Yêu thích</button>
                    <button v-if="isFavorite" type="button" class="btn btn-outline-danger" @click="deleteFavorite()"><i class="bi bi-star me-1"></i> Bỏ yêu thích</button>
                  </div>
                  <RouterLink :to="{ path: `${truyenId}/doc-truyen/${chapters[chapters.length - 1]?.id}` }">
                    <button type="button" class="btn btn-success" @click="dauCuoiClick(chapters[chapters.length - 1]?.id)">Đọc từ đầu</button>
                  </RouterLink>
                  <RouterLink :to="{ path: `${truyenId}/doc-truyen/${chapters[0]?.id}` }">
                    <button type="button" class="btn btn-primary" @click="dauCuoiClick(chapters[0]?.id)">Đọc chương mới nhất</button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End thông tin truyện -->
        <div class="pagetitle" style="margin-top: -4px">
          <h1 class="fw-bold text-white bg-primary p-1 rounded-1 ps-2 text-center">GIỚI THIỆU</h1>
        </div>
        <!-- Mô tả nội dung -->
        <div data-aos="zoom-in" class="card p-2">
          <h5>{{ detailTruyen.gioithieu }}</h5>
        </div>
        <!-- End Mô tả nội dung -->
        <div data-aos="zoom-in" class="pagetitle" style="margin-top: -18px">
          <h1 class="fw-bold p-1 rounded-1 ps-2 text-center text-white bg-primary">DANH SÁCH CHƯƠNG</h1>
        </div>
        <!-- Danh sách chương -->
        <div class="card p-2">
          <!-- Default Table -->
          <table class="table">
            <thead data-aos="zoom-in">
              <tr class="fs-4">
                <th class="fw-bold" scope="col">Tên chương</th>
                <th class="fw-bold col-2 text-center" scope="col">Trạng thái</th>
                <th class="fw-bold col-2 text-center" scope="col">Cập nhật</th>
                <th class="fw-bold col-2 text-center" scope="col">Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              <tr data-aos="zoom-in" class="fs-8" v-for="chapter in chapters" :key="chapter?.id">
                <td scope="row" style="font-size: 18px" @click="clickChapter(chapter.id)">
                  <RouterLink :to="{ path: `${truyenId}/doc-truyen/${chapter.id}` }" :class="{ 'fw-bold': isChapterRead(chapter.id) }" class="text-black"> Chapter {{ chapter.so }}: {{ chapter.ten }} </RouterLink>
                </td>

                <td class="col-2 text-center" v-if="currentUser && isChapterRead(chapter.id)"><i class="bi bi-eye-slash-fill" style="font-size: 20px"></i></td>
                <td class="col-2 text-center" v-if="currentUser && !isChapterRead(chapter.id)"><i class="bi bi-eye-fill" style="font-size: 20px"></i></td>
                <td class="col-2 text-center" v-if="!currentUser">
                  <RouterLink to="/login"> Đăng nhập để xem </RouterLink>
                </td>
                <td class="col-2 text-center">{{ formatTimeAgo(chapter.thoi_gian_dang) }}</td>
                <td class="col-2 text-center">{{ chapter.view }}</td>
              </tr>
            </tbody>
          </table>
          <!-- End Default Table Example -->
        </div>
        <!-- End Danh sách chương -->

        <div class="pagetitle" style="margin-top: -18px">
          <h1 data-aos="zoom-in" class="fw-bold p-1 rounded-1 ps-2 text-center text-white bg-primary">BÌNH LUẬN</h1>
          <div data-aos="zoom-in" class="mt-2">
            <textarea v-model="newComment.noidung" class="form-control binhluan" rows="3" id="message-text" placeholder="Người tiện tay vẽ hoa vẽ lá, tôi đa tình tưởng đó là mùa xuân..."></textarea>
          </div>
          <div data-aos="zoom-in" class="d-flex justify-content-end mt-1">
            <button @click="addNewComment()" type="button" class="btn btn-success my-1 px-3">Gửi</button>
          </div>

          <div data-aos="zoom-in" class="d-flex w-100" v-for="comment in comments" :key="comment.id">
            <img :src="apiUrl + '/' + comment?.user.avt" alt="Profile" class="rounded-circle mt-2" style="height: 50px; width: 50px" />
            <div class="nguoibinhluan d-flex flex-column mb-2 w-100 ms-2">
              <div class="">
                <label for="" class="fw-bold ms-1" style="color: green">{{ comment?.user.hoten }}</label>
                <label for="" class="ms-2" style="font-size: 14px">{{ formatTimeAgo(comment.thoi_gian_dang) }}</label>
              </div>

              <label for="" class="bg-secondary-subtle p-2 rounded-2">{{ comment.noidung }}</label>

              <div class="d-flex mt-1 align-items-center">
                <div href="" class="ms-2 fs-9 text-primary" @click="likeComment(comment.id)" style="font-size: 14px; cursor: pointer; align-items: center">
                  <svg xmlns="http://www.w3.org/2000/svg" v-if="isLiked(comment)" width="22" height="20" fill="currentColor" class="bi bi-hand-thumbs-up-fill zoom-icon" viewBox="0 0 16 16">
                    <path
                      d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" v-else width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up zoom-icon" viewBox="0 0 16 16">
                    <path
                      d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
                    />
                  </svg>
                  <span style="font-size: 18px; align-items: center; margin-left: 5px">
                    {{ comment.luot_thich }}
                  </span>
                </div>

                <div href="" class="ms-3 fs-9" v-if="isYourCmt(comment)" @click="deleteComment(comment.id)" style="font-size: 14px; color: red; cursor: pointer">Xoá</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- End #main -->
  </div>
  <Footer />
  <!-- TOAST -->
</template>

<script>
import SideBar from "./Sidebar.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderUser from "@/components/HeaderUser.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
export default {
  name: "ChiTietTruyen",
  components: { SideBar, HeaderUser, Footer },
  data() {
    return {
      localUrl: "http://localhost:7777",
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
          luot_thich: null,
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
      histories: [],
      historiesIds: false,
      checkYourComment: false,
    };
  },
  mounted() {
    this.truyenId = this.$route.params.id;
    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    this.getDetailStory();
    this.getAllCommentsByStoryId();
    this.checkFavorite();
    this.fetchChapters();
    this.fetchHistory();
    this.isYourCmt();
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 800, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
  },
  methods: {
    async getDetailStory() {
      try {
        let response = await axios.get(`http://localhost:8000/api/story/${this.truyenId}`);
        this.detailTruyen = response.data;
        response = await axios.get(`http://localhost:8000/api/story/${this.truyenId}/categories`);
        this.detailTruyen.categories = response.data;
      } catch (error) {
        console.error("Error fetching getDetailStory data:", error);
      }
    },
    async checkFavorite() {
      try {
        if (this.currentUser) {
          const response = await axios.get(`http://localhost:8000/api/favorite/${this.currentUser.id}/${this.truyenId}`);
          const data2 = response.data;
          if (data2) {
            this.isFavorite = true;
          } else {
            this.isFavorite = false;
          }
        }
      } catch (error) {
        if (error.response && error.response.status == 404) {
          console.log("Người dùng này chưa yêu thích truyện này!");
        } else {
          console.error("Error fetching favorites data:", error);
        }
      }
    },
    async postFavorite() {
      if (!this.currentUser) {
        Swal.fire("Bạn chưa đăng nhập!", "Bạn phải đăng nhập mới có thể thêm vào danh sách yêu thích!", "error");
      } else {
        const data = { id_story: this.detailTruyen.id, id_user: this.currentUser.id };
        await axios.post("http://localhost:8000/api/favorite", data);
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
        await axios.delete(`http://localhost:8000/api/favorite/${this.currentUser.id}/${this.truyenId}`);
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
      } catch (error) {
        console.error("Error fetching all comments data:", error);
      }
    },
    async addNewComment() {
      try {
        if (!this.currentUser) {
          Swal.fire("Bạn chưa đăng nhập!", "Bạn phải đăng nhập mới có thể bình luận!", "error");
        } else {
          this.newComment.storyId = this.truyenId;
          this.newComment.userId = this.currentUser.id;
          this.newComment.noidung = this.newComment.noidung;
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
          });
        }
      } catch (error) {
        console.error("Error post comment:", error);
      }
    },
    async fetchChapters() {
      try {
        const reponse = await axios.get(this.apiUrl + `/api/chapter/${this.truyenId}`);
        this.chapters = reponse.data;
        this.chapters.reverse();
      } catch (error) {
        console.error("Error fetching chapters data:", error);
      }
    },
    async fetchHistory() {
      try {
        if (this.currentUser) {
          const response = await axios.get(this.apiUrl + `/api/history/get/${this.currentUser.id}/${this.truyenId}`);
          this.histories = response.data;
          console.log("DANH SÁCH CHƯƠNG ĐÃ ĐỌC BỞI NGƯỜI DÙNG:: ", this.histories);
          this.historiesIds = this.histories.map((history) => history.id);
          console.log("DANH SÁCH ID CHƯƠNG ĐÃ ĐỌC BỞI NGƯỜI DÙNG:: ", this.historiesIds);
          this.histories.reverse();
        }
      } catch (error) {
        if (error.response && error.response.status == 404) {
          console.log("Người dùng này chưa đọc chương nào trong truyện này!");
        } else {
          console.error("Error fetching histories data:", error);
        }
      }
    },
    isChapterRead(chapterId) {
      if (this.currentUser) {
        if (this.historiesIds && this.historiesIds.length > 0) {
          return !this.historiesIds.includes(chapterId);
        } else {
          return true;
        }
      } else return true;
    },
    async tangView(chapterId) {
      try {
        const response = await axios.get(this.apiUrl + `/api/chapter/get/${chapterId}`);
        const chapterData = response.data;
        chapterData.view += 1;
        await axios.put(this.apiUrl + `/api/chapter/increase-view/${chapterId}`, chapterData);
      } catch (error) {
        console.error("Error increase view:: ", error);
      }
    },
    async clickChapter(chapterId) {
      try {
        if (this.currentUser) {
          await this.addHistory(this.currentUser.id, this.truyenId, chapterId);
        }
        this.tangView(chapterId);
      } catch (error) {
        console.error("Error clickChapter:: ", error);
      }
    },
    async addHistory(userId, storyId, chapterId) {
      try {
        await axios.post(this.apiUrl + `/api/history/add/${userId}/${storyId}/${chapterId}`);
      } catch (error) {
        console.error("Error adding history:: ", error);
      }
    },
    async dauCuoiClick(chapterId) {
      try {
        if (this.currentUser) {
          await this.addHistory(this.currentUser.id, this.truyenId, chapterId);
        }
        this.tangView(chapterId);
      } catch (error) {
        console.error("Error daucuoi button:: ", error);
      }
    },
    isYourCmt(comment) {
      if (!this.currentUser) {
        return false;
      } else if (this.currentUser.is_admin) {
        return true;
      } else {
        return comment?.user.id === this.currentUser.id;
      }
    },
    deleteComment(commentId) {
      Swal.fire({
        title: "Bạn muốn xóa bình luận này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có, hãy xóa",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(this.apiUrl + `/api/comment/remove/${commentId}`)
            .then((response) => {
              Swal.fire({
                text: "Xóa thành công",
                icon: "success",
                timer: 1000,
              });
              this.getAllCommentsByStoryId();
            })
            .catch((error) => {
              Swal.fire({
                title: "Lỗi khi xóa bình luận",
                icon: "error",
              });
              console.log(error);
            });
        }
      });
    },
    async likeComment(commentId) {
      try {
        if (!this.currentUser) {
          Swal.fire({
            title: "Bạn phải đăng nhập để có thể thích hoặc bình luận",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Đăng nhập",
          }).then((result) => {});
        } else {
          const responseLikeComment = await axios.get(this.apiUrl + `/api/checklikecomment/get/${this.currentUser.id}/${commentId}`);
          const likeCommentData = responseLikeComment.data;
          if (!likeCommentData) {
            const likePost = {
              id_user: this.currentUser.id,
              id_binhluan: commentId,
              thich: 1,
            };
            await axios.post(this.apiUrl + `/api/checklikecomment/add`, likePost);
          } else {
            await axios.delete(this.apiUrl + `/api/checklikecomment/remove/${this.currentUser.id}/${commentId}`);
          }
          this.getAllCommentsByStoryId();
        }
      } catch (error) {
        console.error("Error like comment:: ", error);
      }
    },
    isLiked(comment) {
      if (!this.currentUser || !comment.likeComments) return false;
      const likeCommentIndex = comment.likeComments.findIndex((likeComment) => likeComment.user.id === this.currentUser.id);
      return likeCommentIndex !== -1;
    },
    formatTimeAgo(timestamp) {
      if (!timestamp || timestamp.length < 6) {
        return "";
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

.zoom-icon:hover {
  transform: scale(1.3);
  color: #dead6f;
}
</style>
