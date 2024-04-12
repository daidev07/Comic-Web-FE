<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">LỊCH SỬ ĐỌC TRUYỆN</h1>
        </div>

        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <div v-if="checkHistories" class=" mt-3 fw-bold h4">
            <p>Bạn chưa đọc bất kỳ truyện nào</p>
          </div>
          <!-- item -->
          <div v-else class="card mb-0" v-for="historyStory in historyStories" :key="historyStory.id">
            <div class="card-body col-lg-2 mt-3" style="width: calc((1543px - 40px) / 5)">
              <RouterLink :to="{ path: `/chitiet/${historyStory.id}` }" class="image-link">
                <img :src="`${this.apiUrl}/${historyStory.avt}`" class="card-img-top" alt="..." style="height: 300px" />
                <a class="card-text text-center d-block mt-2">
                  {{ historyStory.ten }}
                </a>
              </RouterLink>
              <div class="d-flex justify-content-between mt-2">
                <a>Lần cuối đọc</a>
                <span></span>
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
        }
      ],
      checkHistories: true,
    }
  },
  components: { SideBar, Header },
  mounted() {
    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
    this.showHistory();
  },
  methods: {
    async showHistory() {
      try {
        const reponse = await axios.get(`http://localhost:8000/api/history/get/${this.currentUser.id}`);
        this.historyStories = reponse.data.reverse();
        this.checkHistories = false;
        console.log("DANH SÁCH TRUYỆN ĐÃ ĐỌC BỞI NGƯỜI DÙNG", this.historyStories);
      } catch (error) {
        if (error.response && error.response.status == 404) {
          this.checkHistories = true;
          console.log("Người dùng này chưa đọc chương nào trong truyện này!");
        }
        else {
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
    }
  }
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
</style>
