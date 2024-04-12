<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">DANH SÁCH YÊU THÍCH</h1>
        </div>
        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <div v-if="checkFavorites" class=" mt-3 fw-bold h4">
            <p>Bạn chưa thêm yêu thích truyện nào</p>
          </div>
          <!-- item -->
          <div v-else class="card mb-0" v-for="story in favoriteStories" :key="story.id">
            <div class="card-body col-lg-2 mt-3" style="width: calc((1543px - 40px) / 5)">
              <RouterLink :to="{ path: `/chitiet/${story.id}` }" class="image-link">
                <img :src="`${this.apiUrl}/${story.avt}`" class="card-img-top" alt="..." style="height: 300px" />
              </RouterLink>

              <RouterLink class="card-text text-center d-block mt-3" :to="{ path: `/chitiet/${story.id}` }"> {{
            story.ten }} </RouterLink>
              <div class="d-flex justify-content-between mt-2">
                <RouterLink :to="{ path: '/reading' }"> Chap 01 </RouterLink>
                <span>10 phút trước</span>
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
export default {
  name: "YeuThich",
  components: { SideBar, Header },
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
  },
  methods: {
    async showFavoriteStory() {
      try {
        const reponse = await axios.get(`http://localhost:8000/api/favorite/${this.currentUser.id}`);
        this.favoriteStories = reponse.data.reverse();
        this.checkFavorites = false
        console.log("DANH SÁCH TRUYỆN NGƯỜI DÙNG YÊU THÍCH:: ", this.favoriteStories);
      } catch (error) {
        if (error.response && error.response.status == 404) {
          this.checkFavorites = true;
          console.log("Người dùng này chưa yêu thích truyện nào");
        }
        else {
          console.error("Error fetching show favorites data:", error);
        }
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
