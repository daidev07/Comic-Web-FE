<template>
  <HeaderUser />
  <!-- <SideBar /> -->
  <div>
    <main id="" class="main" style="margin-top: 32px; margin-left: 380px; margin-right: 380px">
      <div class="truyendecu">
        <div class="card">
          <div class="card-body">
            <!-- Slides with captions -->
            <div id="carouselExampleCaptions" class="carousel slide carousel-small" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" v-for="(slide, index) in slides" :key="index"
                  data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index" :class="{ active: index === 0 }"
                  aria-current="true" :aria-label="'Slide ' + (index + 1)"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item bg-danger-subtle" v-for="(slide, index) in slides" :key="index"
                  :class="{ active: index === 0 }">
                  <RouterLink :to="{ path: `/chitiet/${slide.story.id}` }">
                    <img :src="`${this.apiUrl}/${slide.story.avt}`" class="d-block w-100" alt="..." />
                  </RouterLink>
                  <div class="carousel-caption d-none d-md-block fs-2" style="text-shadow: -1px -1px 0 rgba(0,
                    0, 0, 1), 1px -1px 0 rgba(0, 0, 0, 1), -1px 1px 0 rgba(0, 0, 0, 1), 1px 1px 0 rgba(0, 0,
                    0, 1);">{{
                  slide.story.ten }}</div>
                </div>
              </div>

              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <!-- End Slides with captions -->
          </div>
        </div>
      </div>

      <div class="top10">
        <div class="pagetitle">
          <h1 class="fw-bold mb-2"><i class="bi bi-stars me-2"></i>TOP TRUYỆN ĐỌC NHIỀU</h1>
          <div class="swiper-container overflow-x-hidden position-relative">
            <div class="swiper-wrapper">
              <!-- Loop through stories -->
              <div class="swiper-slide" v-for="story in topViewStories" :key="story.id">
                <div class="card">
                  <div class="card-body col-lg-2" style="width: calc((1143px - 50px) / 6)">
                    <RouterLink :to="{ path: `/chitiet/${story.id}` }" class="image-link text-center mt-3">
                      <img :src="`${this.apiUrl}/${story.avt}`" class="card-img-top rounded-2" alt="..."
                        style="height: 220px" @mouseover="hoveredImg = true" @mouseleave="hoveredImg = false" />
                      <div class="text-center mt-3">
                        {{ story.ten }}
                      </div>
                    </RouterLink>
                    <div class="text-center d-flex align-items-center justify-content-center">
                      <i class="bi bi-eye-fill me-2" style="font-size: 20px"></i>
                      <div style="font-size: 20px">
                        {{ story.view }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End Loop -->
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
          <!-- Add Navigation Buttons -->
        </div>
      </div>

      <div class="truyenmoicapnhat" style="position: relative">
        <div class="pagetitle">
          <h1 class="fw-bold">TRUYỆN MỚI CẬP NHẬT</h1>
        </div>
        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <!-- item -->
          <div class="card mb-0" v-for="story in stories" :key="story.id">
            <div class="card-body col-lg-2" style="width: calc((1143px - 50px) / 6)">
              <RouterLink :to="{ path: `/chitiet/${story.id}` }" class="image-link text-center mt-3">
                <img :src="`${this.apiUrl}/${story.avt}`" class="card-img-top rounded-2" alt="..."
                  style="height: 220px" />
                <div class="text-center mt-3" @mouseover="showOverlay = true" @mouseleave="showOverlay = false">
                  {{ story.ten }}
                </div>
              </RouterLink>
              <div class="d-flex justify-content-between">
                <RouterLink :to="{ path: `/chitiet/${story.id}/doc-truyen/${getLatestChapterInfo[story.id]?.id}` }">
                  Chap {{ getLatestChapterInfo[story.id]?.so }} </RouterLink>
                <span style="font-size: 10px; margin-top: 6px">{{ getLatestChapterInfo[story.id].time }}</span>
              </div>
            </div>
          </div>
          <!-- End item -->
        </div>
        <!-- <div class="image-overlay bg-white" v-show="showOverlay"
          :style="{ top: 122 + 'px', left: 200 + 'px', zIndex: 99, position: 'absolute' }">
          <div class="overlay-content">
            Your overlay content here
          </div>
        </div> -->
        <!-- End list item -->
      </div>
    </main>
    <!-- End #main -->
  </div>
  <Footer/>
</template>

<script>
import SideBar from "./Sidebar.vue";
import Swiper from "swiper/bundle";
import HeaderUser from "../../components/HeaderUser.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "HomePage",
  components: { SideBar, HeaderUser, Footer },
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      stories: [
        {
          id: null,
          avt: null,
          ten: null,
          tacgia: null,
          gioithieu: null,
          thoi_gian_dang: null,
          chapters: [],
          view: null,
        },
      ],
      storiesolds: [],
      timkiem: {
        ten_truyen: null,
        id_truyen: "0",
      },
      showOverlay: false,
    };
  },
  mounted() {
    this.ShowStories();
    new Swiper(".swiper-container", {
      slidesPerView: "6",
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    this.FetchSlides();
  },
  computed: {
    topViewStories() {
      return this.stories
        .map((story) => {
          const totalViews = story.chapters.reduce((acc, chapter) => acc + chapter.view, 0);
          return { ...story, view: totalViews };
        })
        .sort((a, b) => b.view - a.view)
        .slice(0, 10);
    },
    getLatestChapterInfo() {
      const latestChapterInfo = {};
      this.stories.forEach((story) => {
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
    async FetchSlides() {
      try {
        const response = await axios.get(this.apiUrl + "/api/slide/getAll");
        this.slides = response.data;
        console.log("DỮ LIỆU SLIDES:: ", this.slides);
      } catch (error) {
        console.error("Error fetching slides data:", error);
      }
    },
    async ShowStories() {
      try {
        const reponse = await axios.get("http://localhost:8000/api/story");
        this.stories = reponse.data.reverse();
        this.storiesolds = this.stories;
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },
    search() {
      // include so sánh tìm kiếm cùng ký tự trong chuỗi
      this.stories = this.storiesolds.filter((story) => {
        // nếu chỉ có tên truyện
        if (this.$route.query.key) {
          return story.ten.toLowerCase().includes(this.$route.query.key.toLowerCase());
        }
        return true;
      });
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

/* .image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
} */

/* Hiển thị hộp thoại khi hover vào ảnh */
.card-img-top:hover+.image-overlay {
  display: block;
}

.swiper-container {
  width: 100%;
}

.swiper-button-prev {
  color: grey;
}

.swiper-button-next {
  color: grey;
}
</style>
