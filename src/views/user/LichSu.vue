<template>
  <HeaderUser />
  <!-- <SideBar /> -->
  <div>
    <main id="" class="main" style="margin-top: 32px; margin-left: 380px; margin-right: 380px">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">LỊCH SỬ ĐỌC TRUYỆN</h1>
        </div>

        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <div v-if="!this.currentUser" class="mt-3 fw-bold h4">
            <p>Vui lòng đăng nhập để sử dụng tính năng xem lại truyện đã đọc</p>
          </div>
          <div v-else>
            <div v-if="checkHistories" class="mt-3 fw-bold h4">
              <p>Bạn chưa đọc bất kỳ truyện nào</p>
            </div>
            <div v-else class="d-flex flex-wrap" style="gap: 10px">
              <!-- item -->
              <div data-aos="zoom-in" class="card mb-0" v-for="historyStory in historyStories" :key="historyStory.id">
                <div class="card-body col-lg-2" style="width: calc((1143px - 50px) / 6)">
                  <RouterLink :to="{ path: `/chitiet/${historyStory.story.id}` }" class="image-link">
                    <img :src="`${this.apiUrl}/${historyStory.story.avt}`" class="card-img-top rounded-2" alt="..." style="height: 220px" />
                    <a class="card-text text-center d-block mt-2">
                      {{ historyStory.ten }}
                    </a>
                  </RouterLink>
                  <RouterLink class="card-text text-center d-block mt-3" :to="{ path: `/chitiet/${historyStory.story.id}` }"> {{ historyStory.story.ten }} </RouterLink>
                  <div class="d-flex justify-content-between">
                    <a style="font-size: 13px">Lần cuối đọc</a>
                    <span style="font-size: 10px; margin-top: 3px">{{ formatTimeAgo(historyStory.lan_cuoi_doc) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- End item -->
        </div>
        <!-- End list item -->
      </div>
    </main>
    <!-- End #main -->
  </div>
  <Footer />
</template>

<script>
import SideBar from "./Sidebar.vue";
import HeaderUser from "../../components/HeaderUser.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
export default {
  name: "LichSu",
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      historyStories: [
        {
          id: null,
          avt: null,
          ten: null,
          tacgia: null,
          gioithieu: null,
          thoi_gian_dang: null,
        },
      ],
      checkHistories: true,
      currentUser: {
        id: null,
        hoten: null,
        avt: null,
        email: null,
        username: null,
        password: null,
      },
    };
  },
  components: { SideBar, HeaderUser, Footer },
  mounted() {
    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    this.showHistory();
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
    async showHistory() {
      try {
        const response = await axios.get(`http://localhost:8000/api/history/user/${this.currentUser.id}`);
        const historyStories = response.data;

        // Tạo một đối tượng để lưu trữ thời gian gần nhất cho mỗi story.id
        const latestReadTimes = {};

        // Lặp qua lịch sử đọc để lấy thời gian gần nhất cho mỗi story.id
        historyStories.forEach((history) => {
          const storyId = history.story.id;
          const lastReadTime = new Date(...history.lan_cuoi_doc);

          // Kiểm tra xem storyId đã tồn tại trong latestReadTimes hay chưa
          if (latestReadTimes.hasOwnProperty(storyId)) {
            // Nếu đã tồn tại, so sánh với thời gian đã lưu và cập nhật nếu cần
            const storedTime = latestReadTimes[storyId];
            if (lastReadTime > storedTime) {
              latestReadTimes[storyId] = lastReadTime;
            }
          } else {
            // Nếu chưa tồn tại, thêm mới vào đối tượng
            latestReadTimes[storyId] = lastReadTime;
          }
        });

        // Tạo một mảng mới để chỉ chứa lần đọc gần nhất của mỗi story.id
        const latestReadStories = Object.keys(latestReadTimes).map((storyId) => {
          const lastReadTime = latestReadTimes[storyId];
          return historyStories.find((history) => {
            return history.story.id === parseInt(storyId) && new Date(...history.lan_cuoi_doc).getTime() === lastReadTime.getTime();
          });
        });

        // Sắp xếp các lần đọc theo thời gian đọc từ gần nhất đến xa nhất
        latestReadStories.sort((a, b) => {
          const timeA = new Date(...a.lan_cuoi_doc).getTime();
          const timeB = new Date(...b.lan_cuoi_doc).getTime();
          return timeB - timeA; // Sắp xếp từ gần nhất đến xa nhất
        });

        // Cập nhật danh sách lịch sử đọc
        this.historyStories = latestReadStories;
        this.checkHistories = this.historyStories.length === 0;

        console.log("DANH SÁCH TRUYỆN ĐÃ ĐỌC BỞI NGƯỜI DÙNG", this.historyStories);
      } catch (error) {
        if (error.response && error.response.status == 404) {
          this.checkHistories = true;
          console.log("Người dùng này chưa đọc chương nào trong truyện này!");
        } else {
          console.error("Error fetching show history data:", error);
        }
      }
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

.carousel-small,
.carousel-small .carousel-inner,
.carousel-small img {
  height: 500px !important;
}

.carousel-small .carousel-control-prev-icon::after,
.carousel-small .carousel-control-next-icon::after {
  content: "";
}

/* Hiệu ứng khi hover vào ảnh */
.image-link:hover img {
  transform: scale(1.1);
  /* Zoom ảnh lên 110% */
  transition: transform 0.3s ease;
  /* Hiệu ứng chuyển đổi mềm mại */
}

/* Thiết lập hiệu ứng transition cho ảnh */
.card-body img {
  transition: transform 0.3s ease;
  /* Thiết lập transition cho hiệu ứng */
}
</style>
