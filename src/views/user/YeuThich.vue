<template>
  <HeaderUser />
  <!-- <SideBar /> -->
  <div>
    <main id="" class="main" style="margin-top: 32px; margin-left: 380px; margin-right: 380px">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">DANH SÁCH YÊU THÍCH</h1>
        </div>
        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <div v-if="!this.currentUser" class="mt-3 fw-bold h4">
            <p>Vui lòng đăng nhập để sử dụng tính năng thêm vào yêu thích</p>
          </div>
          <div v-else>
            <div v-if="checkFavorites" class="mt-3 fw-bold h4">
              <p>Bạn chưa thêm yêu thích truyện nào</p>
            </div>
            <div v-else class="d-flex flex-wrap" style="gap: 10px">
              <!-- item -->
              <div data-aos="zoom-in" class="card mb-0" v-for="story in favoriteStories" :key="story.id">
                <div class="card-body col-lg-2" style="width: calc((1143px - 50px) / 6)">
                  <RouterLink :to="{ path: `/chitiet/${story.id}` }" class="image-link">
                    <img :src="`${this.apiUrl}/${story.avt}`" class="card-img-top rounded-2" alt="..." style="height: 220px" />
                  </RouterLink>

                  <RouterLink class="card-text text-center d-block mt-3" :to="{ path: `/chitiet/${story.id}` }"> {{ story.ten }} </RouterLink>
                  <div class="d-flex justify-content-between">
                    <RouterLink :to="{ path: `/chitiet/${story.id}/doc-truyen/${getLatestChapterInfo[story.id]?.id}` }"> Chap {{ getLatestChapterInfo[story.id]?.so }} </RouterLink>
                    <span style="font-size: 10px; margin-top: 6px">{{ getLatestChapterInfo[story.id].time }}</span>
                  </div>
                </div>
              </div>
              <!-- End item -->
            </div>
          </div>
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
import Header from "../../components/Header.vue";
import axios from "axios";
import HeaderUser from "@/components/HeaderUser.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
export default {
  name: "YeuThich",
  components: { SideBar, HeaderUser, Footer },
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      favoriteStories: [
        {
          id: null,
          avt: null,
          ten: null,
          tacgia: null,
          gioithieu: null,
          view: null,
        },
      ],
      currentUser: null,
      checkFavorites: true,
    };
  },
  mounted() {
    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    this.showFavoriteStory();
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
  computed: {
    getLatestChapterInfo() {
      const latestChapterInfo = {};
      this.favoriteStories.forEach((story) => {
        if (story.chapters && story.chapters.length > 0) {
          const reversedChapters = story.chapters.slice().reverse();
          const latestChapterTime = reversedChapters[0].thoi_gian_dang;
          const latestChapterNumber = reversedChapters[0].so;
          const latestChapterId = reversedChapters[0].id;
          latestChapterInfo[story.id] = {
            time: this.formatTimeAgo(latestChapterTime),
            so: latestChapterNumber,
            id: latestChapterId,
          };
        } else {
          latestChapterInfo[story.id] = {
            time: "",
            so: "",
            id: "",
          };
        }
      });
      return latestChapterInfo;
    },
  },
  methods: {
    async showFavoriteStory() {
      try {
        const reponse = await axios.get(`http://localhost:8000/api/favorite/${this.currentUser.id}`);
        this.favoriteStories = reponse.data.reverse();
        this.checkFavorites = false;
        console.log("DANH SÁCH TRUYỆN NGƯỜI DÙNG YÊU THÍCH:: ", this.favoriteStories);
      } catch (error) {
        if (error.response && error.response.status == 404) {
          this.checkFavorites = true;
          console.log("Người dùng này chưa yêu thích truyện nào");
        } else {
          console.error("Error fetching show favorites data:", error);
        }
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
