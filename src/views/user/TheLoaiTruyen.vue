<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold" @click="reload()">THỂ LOẠI: {{ category.ten ? category.ten.toUpperCase() : "" }}</h1>
        </div>
        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <!-- item -->
          <div class="card mb-0" v-for="story in category.stories" :key="story.id">
            <div class="card-body col-lg-2 mt-3" style="width: calc((1543px - 40px) / 5)">
              <RouterLink :to="{ path: `/chitiet/${story.id}` }" class="image-link">
                <img :src="`${this.apiUrl}/${story.avt}`" class="card-img-top" alt="..." style="height: 300px" />
              </RouterLink>

              <RouterLink class="card-text text-center d-block mt-3" :to="{ path: `/chitiet/${story.id}` }"> {{ story.ten }} </RouterLink>
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
  name: "TheLoaiTruyen",
  components: { SideBar, Header },
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      categoryId: null,
      category: {
        id: null,
        ten: null,
        stories: [
          {
            id: null,
            avt: null,
            ten: null,
            tacgia: null,
            gioithieu: null,
            view: null,
          },
        ],
      },
    };
  },
  mounted() {
    this.categoryId = this.$route.params.id;
    this.ShowCategory();
  },
  methods: {
    async ShowCategory() {
      try {
        let response = await axios.get(`http://localhost:8000/api/category/${this.categoryId}`);
        this.category = response.data;
        response = await axios.get(`http://localhost:8000/api/story-category/${this.categoryId}/story`);
        console.log("test::", response.data);
        this.category.stories = response.data;
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },
    async clickDetail() {},
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
