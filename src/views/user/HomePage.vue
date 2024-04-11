<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="truyendecu">
        <div class="pagetitle">
          <h1 class="fw-bold">TRUYỆN ĐỀ CỬ</h1>
        </div>
        <div class="card">
          <div class="card-body">
            <!-- Slides with captions -->
            <div id="carouselExampleCaptions" class="carousel slide carousel-small mt-3" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                  aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                  aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                  aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active bg-danger-subtle">
                  <img src="../../../public/assets/truyen/1.jpg" class="d-block w-100" alt="..." />
                  <div class="carousel-caption d-none d-md-block"></div>
                </div>
                <div class="carousel-item bg-info-subtle">
                  <img src="../../../public/assets/truyen/2.jpg" class="d-block w-100" alt="..." />
                  <div class="carousel-caption d-none d-md-block"></div>
                </div>
                <div class="carousel-item bg-primary-subtle">
                  <img src="../../../public/assets/truyen/3.jpg" class="d-block w-100" alt="..." />
                  <div class="carousel-caption d-none d-md-block"></div>
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

      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">TRUYỆN MỚI CẬP NHẬT</h1>
        </div>
        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <!-- item -->
          <div class="card mb-0" v-for="story in stories" :key="story.id">
            <div class="card-body col-lg-2 mt-3" style="width: calc((1507px - 40px) / 5)">
              <RouterLink :to="{ path: `/chitiet/${story.id}` }" class="image-link">
                <img :src="`${this.apiUrl}/${story.avt}`" class="card-img-top" alt="..." style="height: 300px" />
              </RouterLink>

              <RouterLink class="card-text text-center d-block mt-3" :to="{ path: `/chitiet/${story.id}` }"> {{
            story.ten }} </RouterLink>
              <div class="d-flex justify-content-between mt-2">
                <RouterLink :to="{ path: `/chitiet/${story.id}/doc-truyen/${getLatestChapterInfo[story.id]?.id}` }"> 
                  Chap {{ getLatestChapterInfo[story.id]?.so }} </RouterLink>
                <span>{{ getLatestChapterInfo[story.id].time }}</span>
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
</template>

<script>
import SideBar from "./Sidebar.vue";
import Header from "../../components/Header.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "HomePage",
  components: { SideBar, Header },
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
          view: null,
        },
      ],
    };
  },
  mounted() {
    this.ShowStories();
  },
  computed: {
    getLatestChapterInfo() {
      const latestChapterInfo = {};
      this.stories.forEach(story => {
        if (story.chapters && story.chapters.length > 0) {
          const reversedChapters = story.chapters.slice().reverse();
          const latestChapterTime = reversedChapters[0].thoi_gian_dang;
          const latestChapterNumber = reversedChapters[0].so;
          const latestChapterId = reversedChapters[0].id;
          latestChapterInfo[story.id] = {
            time: this.formatTimeAgo(latestChapterTime),
            so: latestChapterNumber,
            id: latestChapterId
          };
        } else {
          latestChapterInfo[story.id] = {
            time: "",
            so: "",
            id: ""
          };
        }
      });
      return latestChapterInfo;
    },

  },
  methods: {
    async ShowStories() {
      try {
        const reponse = await axios.get("http://localhost:8000/api/story");
        this.stories = reponse.data.reverse();
        console.log("DANH SÁCH TRUYỆN:: ", this.stories);
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },
    async clickDetail() { },
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
