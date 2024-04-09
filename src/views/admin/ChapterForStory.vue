<template>
  <Header />
  <SideBar />
  <div class="mh-100">
    <main id="main" class="main">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">QUẢN LÝ CHƯƠNG CỦA TRUYỆN</h1>
        </div>
      </div>
      <div class="d-flex mt-3">
        <div class="">
          <button class="btn btn-success fw-bold" data-bs-toggle="modal" data-bs-target="#modalThem">
            Thêm chương mới
          </button>
        </div>
        <div class="w-75">
          <div class="container">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1 fw-bold text-center">Số</div>
                <div class="col col-2 fw-bold">Tên chương</div>
                <div class="col col-1 fw-bold text-center">Nội dung</div>
                <div class="col col-1 fw-bold text-center">Sửa</div>
                <div class="col col-1 fw-bold text-center">Xóa</div>
              </li>
              <div style="max-height: 650px" class="overflow-auto">
                <li class="table-row" v-for="chapter in chapters" :key="chapter?.id">
                  <div class="col col-1 text-center">
                    <div class="so fw-bold h5" data-bs-toggle="modal"
                      data-bs-target="#modalContent" @click="takeChapter(chapter)">{{ chapter?.so }}</div>
                  </div>

                  <div class="col col-2 h5">{{ chapter?.ten }}</div>

                  <div class="col col-1 text-center me-3" data-label="Customer Name">
                    <button class="btn" style="background-color: #1e3a63; color: white" data-bs-toggle="modal"
                      data-bs-target="#modalContent" @click="takeChapter(chapter)">
                      <i class="bi bi-info-circle"></i>
                    </button>
                  </div>
                  <div class="col col-1 text-center me-3" data-label="Customer Name">
                    <button class="btn" style="background-color: #1e3a63; color: white" data-bs-toggle="modal"
                      data-bs-target="#modalUpdate" @click="modalUpdateChap(chapter)">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                  </div>
                  <div class="col col-1 text-center me-3" data-label="Amount">
                    <button class="btn" style="background-color: #1e3a63; color: white"
                      @click="deleteChapter(chapter.id)">
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <!-- End #main -->
  </div>

  <!-- Modal thêm -->
  <div class="modal fade" id="modalThem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title fw-bold" id="staticBackdropLabel">
            Thêm chương mới cho truyện
          </h5>
        </div>
        <div class="modal-body">
          <div class="fw-bold">
            Số chương: <span class="text-danger">*</span>
          </div>
          <input type="text" class="form-control" v-model="newChap.so" />
          <div class="mt-2 fw-bold">
            Tên chương <span class="text-danger">*</span>
          </div>
          <input type="text" class="form-control" v-model="newChap.ten" />
          <div class="mt-2 fw-bold">
            Nội dung: <span class="text-danger">*</span>
          </div>
          <input type="file" class="form-control" @change="uploadFile" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Hủy
          </button>
          <button type="button" class="btn btn-success" id="liveToastBtn" data-bs-dismiss="modal" @click="addChap()">
            Thêm chương
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal nội dung -->
  <div class="modal modal-lg fade" id="modalContent" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title fw-bold" id="staticBackdropLabel">
            Nội dung của truyện
          </h5>
        </div>
        <div class="modal-body overflow-auto" style="height: max-content; max-width: 800px">
          <img :src="`${this.apiUrl}/${selectedChapter?.noidung}`" alt="Chapter Content"
            style="object-fit: contain; width: 100%" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Đóng
          </button>
          <button type="button" class="btn btn-primary" id="liveToastBtn" data-bs-toggle="modal"
            data-bs-target="#modalUpdate">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal cập nhật -->
  <div class="modal fade" id="modalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title fw-bold" id="staticBackdropLabel">
            Cập nhật chương
          </h5>
        </div>
        <div class="modal-body">
          <div class="fw-bold">
            Số chương: <span class="text-danger">*</span>
          </div>
          <input type="text " class="form-control" v-model="updChap.so" />
          <div class="mt-2 fw-bold">
            Tên chương <span class="text-danger">*</span>
          </div>
          <input type="text" class="form-control" v-model="updChap.ten" />
          <div class="mt-2 fw-bold">
            Nội dung: <span class="text-danger">*</span>
          </div>
          <input type="file" class="form-control" @change="uploadFile" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Hủy
          </button>
          <button type="button" class="btn btn-success" id="liveToastBtn" data-bs-dismiss="modal" @click="updateChap()">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- TOAST -->
  <button type="button" class="btn btn-primary" id="liveToastBtn">
    Show live toast
  </button>

  <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Thông báo</strong>
        <small>Ngay bây giờ</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">Thêm thành công</div>
    </div>
  </div>
</template>

<script>
import SideBar from "./SidebarAdmin.vue";
import Header from "../../components/Header.vue";
import axios from "axios";
import swal from "sweetalert2";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ChapterForStory",
  data() {
    return {
      apiUrl: process.env.VUE_APP_URL,
      selectedChapter: null,
      storyId: null,
      chapters: {
        id: null,
        so: null,
        ten: null,
        noidung: null,
      },
      newChap: {
        so: null,
        ten: null,
        noidung: null,
      },
      updChap: {
        so: null,
        ten: null,
        noidung: null,
      },
      imgContent: null,
    };
  },
  components: { SideBar, Header },
  mounted() {
    this.storyId = this.$route.params.id;
    console.log("id story đã chọn::", this.storyId);
    this.fetchChapters();
  },
  methods: {
    uploadFile(e) {
      this.imgContent = e.target.files[0];
    },
    takeChapter(chapter) {
      this.selectedChapter = chapter;
      console.log("Chapter đã chọn ::", this.selectedChapter);
    },
    async fetchChapters() {
      try {
        const reponse = await axios.get(
          this.apiUrl + `/api/chapter/${this.storyId}`
        );
        this.chapters = reponse.data;
        console.log("DANH SÁCH CHƯƠNG", this.chapters);
        this.chapters.reverse();
      } catch (error) {
        console.error("Error fetching chapters data:", error);
      }
    },
    async addChap() {
      try {
        const formData = new FormData();
        formData.append("so", this.newChap.so);
        formData.append("ten", this.newChap.ten);
        formData.append("noidung", this.imgContent);
        console.log("Dữ liệu form data:: ", formData);
        const response = await axios.post(
          this.apiUrl + `/api/chapter/${this.storyId}/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.fetchChapters();
        console.log("Post chapter for story", response.data);
        swal.fire({
          title: "Đã thêm",
          text: "Đã thêm chương mới thành công",
          icon: "success",
        });
        this.newChap = {
          so: null,
          ten: null,
          noidung: null,
        };
      } catch (error) {
        console.error("Error adding chapter for story:", error);
      }
    },
    deleteChapter(chapterId) {
      swal
        .fire({
          title: "Bạn muốn xóa?",
          text: "Bạn có chắc chắn muốn xóa chương này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Có, hãy xóa",
          cancelButtonColor: "#d33",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(this.apiUrl + `/api/chapter/remove/${chapterId}`)
              .then((response) => {
                swal.fire({
                  title: "Đã xóa",
                  text: "Bạn đã xóa truyện thành công",
                  icon: "success",
                });
                this.fetchChapters();
              })
              .catch((error) => {
                swal.fire({
                  title: "Lỗi",
                  text: "Có lỗi xảy ra khi xóa chương!",
                  icon: "error",
                });
                console.error(error);
              });
          }
        });
    },
    modalUpdateChap(chapter) {
      this.updChap = {
        id: chapter.id,
        so: chapter.so,
        ten: chapter.ten,
        noidung: chapter.noidung,
      };
    },
    async updateChap() {
      try {
        console.log("Dữ liệu được cập nhật:: ", this.updChap);
        const formData = new FormData();
        formData.append("so", this.updChap.so);
        formData.append("ten", this.updChap.ten);
        formData.append("noidung", this.imgContent);
        console.log("Dữ liệu form data:: ", formData);
        await axios.put(
          this.apiUrl + `/api/chapter/update/${this.updChap.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multi-part/form-data",
            },
          }
        );
        this.fetchChapters();
        swal.fire({
          title: "Đã cập nhật",
          text: "Cập nhật chương này thành công!",
          icon: "success",
        });
        this.updChap = {
          id: null,
          so: null,
          ten: null,
        };
      } catch (error) {
        console.error("Error update chapter:", error);
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {}

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
    margin-bottom: 10px;
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
    flex-basis: 10%;
  }

  .col-2 {
    flex-basis: 50%;
  }

  .col-3 {
    flex-basis: 15%;
  }

  .col-4 {
    flex-basis: 15%;
  }

  .col-5 {
    flex-basis: 70%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
      color: #ffffff;
    }

    .table-row {}

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

  .so {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.so:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.so:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.so:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
}
</style>
