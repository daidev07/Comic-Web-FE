<template>
  <Header />
  <SideBar />
  <div>
    <main id="main" class="main">
      <div class="truyenmoicapnhat">
        <div class="pagetitle">
          <h1 class="fw-bold">TOP NGÀY</h1>
        </div>
        <!-- list item -->
        <div class="d-flex flex-wrap" style="gap: 10px">
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
                <span>10 phút trước</span>
              </div>
            </div>
          </div>
          <!-- End item -->
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
                <span>10 phút trước</span>
              </div>
            </div>
          </div>
          <!-- End item -->
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
                <span>10 phút trước</span>
              </div>
            </div>
          </div>
          <!-- End item -->
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
                <span>10 phút trước</span>
              </div>
            </div>
          </div>
          <!-- End item -->
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
                <span>10 phút trước</span>
              </div>
            </div>
          </div>
          <!-- End item -->
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
                <span>10 phút trước</span>
              </div>
            </div>
          </div>
          <!-- End item -->
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
                <span>10 phút trước</span>
              </div>
            </div>
          </div>
          <!-- End item -->
          <!-- item -->
          <div class="card mb-0">
            <div
              class="card-body col-lg-2 mt-3"
              style="width: calc((1543px - 40px) / 5)"
            >
              <img
                src="/assets/img/card.jpg"
                class="card-img-top"
                alt="..."
                style="height: 300px"
              />
              <a class="card-text text-center d-block mt-2">
                Cốt binh trở lại
              </a>
              <div class="d-flex justify-content-between mt-2">
                <a>Chap 01</a>
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
export default {
  name: "TopTruyen",
  components: { SideBar, Header },
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
