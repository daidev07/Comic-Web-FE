<template>
    <Header />
    <SideBar />
    <div>
        <main id="main" class="main">

            <div class="truyenmoicapnhat">
                <div class="pagetitle">
                    <h1 class="fw-bold">TẤT CẢ NGƯỜI DÙNG</h1>
                </div>
                <!-- list item -->
                <div class="d-flex flex-wrap" style="gap: 10px">

                </div>
                <!-- End list item -->
            </div>
        </main>
        <!-- End #main -->
    </div>
</template>

<script>
import SideBar from "./SidebarAdmin.vue";
import Header from "../../components/Header.vue";
export default {
    name: "User",
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