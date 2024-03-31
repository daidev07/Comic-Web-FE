<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">TẤT CẢ TRUYỆN</h1>
        </div>
      </div>
      <div class="d-flex mt-5">
        <div class="">
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalThem"
          >
            Thêm truyện
          </button>
        </div>
        <div class="w-75">
          <div class="container">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-3 text-center">Ảnh</div>
                <div class="col col-2">Tên truyện</div>
                <div class="col col-1 text-center">Xem</div>
                <div class="col col-1 text-center">Sửa</div>
                <div class="col col-1 text-center">Xóa</div>
              </li>
              <li class="table-row" v-for="story in stories" :key="stories.id">
                <div class="col col-3">{{ story.avt }}</div>
                <div class="col col-2">{{ story.ten }}</div>
                <div class="col col-1 text-center" data-label="Customer Name">
                  <button
                    class="btn"
                    style="background-color: #1e3a63; color: white"
                  >
                    <i class="bi bi-info-circle"></i>
                  </button>
                </div>
                <div class="col col-1 text-center" data-label="Customer Name">
                  <button
                    class="btn"
                    style="background-color: #1e3a63; color: white"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </div>
                <div class="col col-1 text-center" data-label="Amount">
                  <button
                    class="btn"
                    style="background-color: #1e3a63; color: white"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <!-- End #main -->
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="modalThem"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Thêm truyện mới</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="fw-bold">
            Ảnh đại diện truyện <span class="text-danger">*</span>
          </div>
          <input type="file" class="form-control" @change="uploadFile" />
          <div class="mt-2 fw-bold">
            Tên truyện <span class="text-danger">*</span>
          </div>
          <input type="text" class="form-control" v-model="newName" />
          <div class="mt-2 fw-bold">
            Tác giả <span class="text-danger">*</span>
          </div>
          <input type="text" class="form-control" v-model="newName" />
          <div class="mt-2 fw-bold">
            Thể loại <span class="text-danger">*</span>
          </div>
          <div
            class="form-check form-check-inline"
            v-for="category in categories"
            :key="categories.id"
          >
            <input
              class="form-check-input"
              type="checkbox"
              @change="updateSelectedCategoryIds(category.id)"
            />
            <label class="form-check-label">{{ category.ten }}</label>
          </div>
          <div class="mt-2 fw-bold">
            Giới thiệu <span class="text-danger">*</span>
          </div>
          <textarea class="form-control" v-model="newName"></textarea>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
          <button type="button" class="btn btn-primary" @click="addStory">
            Thêm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./SidebarAdmin.vue";
import Header from "../../components/Header.vue";
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      stories: [],
      categories: [],
      cateOptions: [],
      selectedCategoryIds: [],
      newStory: {
        avt: null,
      },
    };
  },
  components: { SideBar, Header },
  mounted() {
    this.ShowStories();
    this.ShowCate();
  },
  methods: {
    uploadFile(e) {
      const file = e.target.files[0];
      let blob = null;
      let reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        const byteString = atob(imageData.split(",")[1]);
        const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        blob = new Blob([ab], { type: mimeString });
      };
      reader.readAsDataURL(file);

      this.newStory.avt = blob;
    },

    updateSelectedCategoryIds(id) {
      const idIndex = this.selectedCategoryIds.findIndex(
        (categoryId) => categoryId === id
      );
      if (idIndex === -1) {
        this.selectedCategoryIds.push(id);
      } else {
        this.selectedCategoryIds.splice(idIndex, 1);
      }
      console.log(this.selectedCategoryIds);
    },

    async ShowStories() {
      try {
        const reponse = await axios.get("http://localhost:8000/api/home");
        this.stories = reponse.data;
        console.log(1111, this.stories);
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },
    async ShowCate() {
      try {
        console.log(2222, this.categories);
        const reponse = await axios.get("http://localhost:8000/api/category");
        this.categories = reponse.data;
      } catch (error) {
        console.error("Error fetching stories data:", error);
      }
    },
    async addStory() {
      try {
        const newStoryData = {
          avt: this.newAvt,
          ten: this.newName,
        };
        const response = await axios.post(
          "http://localhost:8000/api/home/add",
          newStoryData
        );
        console.log(response.data);
        this.ShowStories();
      } catch (error) {
        console.error("Error adding story:", error);
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

body {
  font-family: "lato", sans-serif;
}

.container {
  border-radius: 15px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  font-family: "Nunito", sans-serif;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;

  small {
    font-size: 0.5em;
  }
}

.responsive-table {
  li {
    border-radius: 3px;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .table-header {
    border-radius: 10px;
    color: #ffffff;
    background-color: #1e3a63;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .table-row {
    border-radius: 10px;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }

  .col-1 {
    flex-basis: 5%;
  }

  .col-2 {
    flex-basis: 50%;
  }

  .col-3 {
    flex-basis: 15%;
  }

  .col-4 {
    flex-basis: 25%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
      color: #ffffff;
    }

    .table-row {
    }

    li {
      display: block;
    }

    .col {
      flex-basis: 100%;
    }

    .col {
      display: flex;
      padding: 10px 0;

      &:before {
        color: #6c7a89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
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
