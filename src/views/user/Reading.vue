<template>
  <HeaderUser />
  <!-- <SideBar /> -->
  <div>
    <main id="" class="main" style="margin-top: 32px; margin-left: 380px; margin-right: 380px">
      <div class="reading">
        <div class="menuChapter bg-primary p-1 ps-2 d-flex justify-content-center sticky-top" style="top: 0px; margin-top: -23px; z-index: 99">
          <RouterLink :to="{ path: '/' }">
            <button class="btn btn-success m-1 homepage">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
              </svg>
            </button>
          </RouterLink>
          <RouterLink :to="{ path: detailPath }"
            ><button class="btn btn-success m-1 backDetailStory">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-columns-reverse" viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5m-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
                />
              </svg></button
          ></RouterLink>
          <button class="btn btn-danger m-1" @click="preChapter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </button>
          <select class="form-select w-25" aria-label="Default select example" @change="changeChapter" :value="chapterId">
            <option v-for="chapter in chapters" :key="chapter?.id" :value="chapter?.id">Chapter {{ chapter.so }}</option>
          </select>
          <button class="btn btn-danger m-1" @click="nextChapter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </button>
        </div>
        <div class="mt-2">
          <img class="w-100 rounded-2" :src="`${this.apiUrl}/${chapter?.noidung}`" alt="" />
        </div>
      </div>
    </main>
    <!-- End #main -->
  </div>
  <Footer />
</template>

<script>
import SideBar from "./Sidebar.vue";
import axios from "axios";
import Footer from "@/components/Footer.vue";
import "vue3-toastify/dist/index.css";
import swal from "sweetalert2";
import HeaderUser from "@/components/HeaderUser.vue";

export default {
  name: "Reading",
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      chapterId: null,
      chapter: [],
      detailPath: null,
    };
  },
  components: { SideBar, HeaderUser, Footer },
  mounted() {
    this.storyId = this.$route.params.id;
    console.log("ID STORY CỦA CHƯƠNG NÀY:: ", this.storyId);
    this.fetchChapters();

    this.currentUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

    this.chapterId = this.$route.params.chapterId;
    this.fetchContent();
    console.log("ID CHAPTER ĐÃ CHỌN ĐỂ XEM:: ", this.chapterId);

    console.log("PATH HIỆN TẠI:: ", this.$route.path);
    this.detailPath = this.$route.path.split("/doc-truyen")[0];
  },
  methods: {
    async fetchContent() {
      try {
        const reponse = await axios.get(this.apiUrl + `/api/chapter/get/${this.chapterId}`);
        this.chapter = reponse.data;
        console.log("THÔNG TIN CHAPTER:: ", this.chapter);
      } catch (error) {
        console.error("Error fetching one chapter data:", error);
      }
    },
    async fetchChapters() {
      try {
        const reponse = await axios.get(this.apiUrl + `/api/chapter/${this.storyId}`);
        this.chapters = reponse.data;
        console.log("DANH SÁCH CHƯƠNG:: ", this.chapters);
      } catch (error) {
        console.error("Error fetching chapters data:", error);
      }
    },
    async changeChapter(e) {
      this.chapterId = e.target.value;
      console.log("SELECT OPTION CHUYỂN SANG CHAPTER CÓ ID:: ", this.chapterId);
      this.fetchContent();
      this.$router.push({ path: `/chitiet/${this.storyId}/doc-truyen/${this.chapterId}` });
      if (this.currentUser) {
        this.addHistory(this.currentUser.id, this.storyId, this.chapterId);
      }
      this.tangView(this.chapterId);
    },
    async preChapter() {
      const currentIndex = this.chapters.findIndex((chapter) => chapter.id == this.chapterId);
      console.log("CHUYỂN SANG CHAPTER ID:: ", this.chapterId);
      if (currentIndex > 0) {
        const previousChapterId = this.chapters[currentIndex - 1].id;
        this.chapterId = previousChapterId;
        this.fetchContent();
        this.$router.push({ path: `/chitiet/${this.storyId}/doc-truyen/${this.chapterId}` });
      } else {
        swal.fire({
          title: "Không có chapter trước đó",
          icon: "warning",
          timer: 1000,
        });
      }
      if (this.currentUser) {
        this.addHistory(this.currentUser.id, this.storyId, this.chapterId);
      }
      this.tangView(this.chapterId);
    },
    async nextChapter() {
      const currentIndex = this.chapters.findIndex((chapter) => chapter.id == this.chapterId);
      if (currentIndex < this.chapters.length - 1) {
        const nextChapterId = this.chapters[currentIndex + 1].id;
        this.chapterId = nextChapterId;
        console.log("CHUYỂN SANG CHAPTER ID:: ", nextChapterId);
        this.fetchContent();
        this.$router.push({ path: `/chitiet/${this.storyId}/doc-truyen/${this.chapterId}` });
      } else {
        swal.fire({
          title: "Đã là chương mới nhất, vui lòng đợi!",
          icon: "warning",
          timer: 1000,
        });
      }
      if (this.currentUser) {
        this.addHistory(this.currentUser.id, this.storyId, this.chapterId);
      }
      this.tangView(this.chapterId);
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
    async addHistory(userId, storyId, chapterId) {
      try {
        console.log("ID USER:: ", userId);
        console.log("ID STORY:: ", storyId);
        console.log("ID STORY:: ", chapterId);
        await axios.post(this.apiUrl + `/api/history/add/${userId}/${storyId}/${chapterId}`);
        console.log("ĐÃ THÊM CHƯƠNG NÀY VÀO LỊCH SỬ CỦA USER:: ");
      } catch (error) {
        console.error("Error adding history:: ", error);
      }
    },
    async tangView(chapterId) {
      try {
        const response = await axios.get(this.apiUrl + `/api/chapter/get/${chapterId}`);
        const chapterData = response.data;
        chapterData.view += 1;
        await axios.put(this.apiUrl + `/api/chapter/increase-view/${chapterId}`, chapterData);
        console.log("ĐÃ TĂNG SỐ LƯỢT XEM CHO CHƯƠNG");
      } catch (error) {
        console.error("Error increase view:: ", error);
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
</style>
