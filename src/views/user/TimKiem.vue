<template>
  <HeaderUser />
  <!-- <SideBar /> -->
  <div>
    <main id="" class="main" style="margin-top: 32px; margin-left: 380px; margin-right: 380px">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">DANH SÁCH TÌM KIẾM</h1>
        </div>
        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <div v-if="searchStories.length === 0" class="mt-3 fw-bold h4">
            <p>Không tìm thấy tên truyện phù hợp</p>
          </div>
          <!-- item -->
          <div data-aos="zoom-in" v-else class="card mb-0" v-for="story in searchStories" :key="story.id">
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
        <!-- End list item -->
      </div>
    </main>
    <!-- End #main -->
  </div>
  <Footer />
</template>

<script>
import axios from "axios";
import HeaderUser from "@/components/HeaderUser.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
export default {
  name: "TimKiem",
  components: { HeaderUser, Footer },
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      searchStories: [
        {
          id: null,
          avt: null,
          ten: null,
          tacgia: null,
          gioithieu: null,
          view: null,
        },
      ],
    };
  },
  mounted() {
    this.showsearchList(this.$route.query.key);
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
  watch: {
    "$route.query.key": function (newKey) {
      this.showsearchList(newKey);
    },
  },
  computed: {
    getLatestChapterInfo() {
      const latestChapterInfo = {};
      this.searchStories.forEach((story) => {
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
    async showsearchList(newKey) {
      try {
        const reponse = await axios.get("http://localhost:8000/api/story");
        this.searchStories = reponse.data.filter((story) => {
          // nếu chỉ có tên truyện
          if (newKey) {
            return story.ten.toLowerCase().includes(newKey.toLowerCase());
          }
          return false;
        });
        console.log("DANH SÁCH TRUYỆN:: ", this.searchStories);
      } catch (error) {
        console.error("Error fetching stories data:", error);
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
