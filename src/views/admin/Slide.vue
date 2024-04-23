<template>
    <Header />
    <SideBar />
    <div>
        <main id="main" class="main">
            <div class="pagetitle">
                <h1 class="fw-bold">ẢNH SLIDE CỦA TRANG WEB</h1>
            </div>
            <div class="mh-100">
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalThem">Thêm slide</button>
            </div>
            <ul class="responsive-table w-50" style="margin-left: 200px;">
                <li class="table-header">
                    <div class="col col-3 fw-bold text-center">Ảnh</div>
                    <div class="col col-2 fw-bold">Tên truyện</div>
                    <div class="col col-1 fw-bold text-center me-5">Xóa</div>
                </li>
                <div style="max-height: 650px;" class="overflow-auto">
                    <li class="table-row" v-for="slide in slides" :key="slide.id">
                        <div class="col col-3 text-center">
                            <img :src="`${this.apiUrl}/${slide.story.avt}`" alt="Story Avatar"
                                style="max-width: 100px; max-height: 50px;">
                        </div>
                        <div class="col col-2 h5 ">{{ slide.story.ten }}</div>
                        <div class="col col-1 text-center me-3" data-label="Amount">
                            <button class="btn" style="background-color: #1e3a63; color: white">
                                <i class="bi bi-trash3" @click="deleteSlide(slide.id)"></i>
                            </button>
                        </div>
                    </li>
                </div>
            </ul>
            <!-- End list item -->
        </main>
        <!-- End #main -->
        <div class="modal fade" id="modalThem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header justify-content-center">
                        <h5 class="modal-title fw-bold" id="staticBackdropLabel">Thêm slide</h5>
                    </div>
                    <table style="margin-left: 50px; text-align: center; justify-content: center;">
                        <th>Ảnh truyện</th>
                        <th>Thêm vào slide</th>

                        <tbody v-for="story in stories" :key="story.id">
                            <tr>
                                <td class="ms-5">
                                    <img :src="`${this.apiUrl}/${story.avt}`" alt="Story Avatar"
                                        style="max-width: 100px; max-height: 50px;">
                                </td>
                                <td>
                                    <button class="btn" style="background-color: #1e3a63; color: white"
                                        @click="addSlide(story.id)" data-bs-dismiss="modal">
                                        <i class="bi bi-file-plus"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import SideBar from "./SidebarAdmin.vue";
import Header from "../../components/Header.vue";
import axios from "axios";
import swal from "sweetalert2";
import { RouterLink } from "vue-router";
export default {
    name: "HomePage",
    components: { SideBar, Header, RouterLink },
    data() {
        return {
            apiUrl: process.env.VUE_APP_URL,
            stories: [],
            slides: []
        }
    },
    mounted() {
        this.ShowStories();
        this.FetchSlides();
    },
    methods: {
        async FetchSlides() {
            try {
                const response = await axios.get(this.apiUrl + "/api/slide/getAll");
                this.slides = response.data;
                console.log("DỮ LIỆU SLIDES:: ", this.slides);
            } catch (error) {
                console.error("Error fetching slides data:", error);
            }
        },
        async ShowStories() {
            try {
                const reponse = await axios.get("http://localhost:8000/api/story");
                this.stories = reponse.data;
                console.log(this.stories);
            } catch (error) {
                console.error("Error fetching stories data:", error);
            }
        },
        async addSlide(storyId) {
            try {
                await axios.post(this.apiUrl + `/api/slide/add/${storyId}`);
                swal.fire({
                    title: "Thêm vào slide thành công",
                    icon: "success",
                    timer: 1000
                })
                this.FetchSlides();
            } catch (error) {
                console.error("Error add slide::", error);
            }
        },
        async deleteSlide(slideId){
            try {
                await axios.delete(this.apiUrl + `/api/slide/remove/${slideId}`);
                swal.fire({
                    title: "Xóa slide thành công",
                    icon: "success",
                    timer: 1000
                })
                this.FetchSlides();
            } catch (error) {
                console.error("Error add slide::", error);
            }
        }
    }
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
        flex-basis: 5%;
    }

    .col-2 {
        flex-basis: 35%;
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



        li {
            display: block;
        }

        .col-2 {
            flex-basis: 35%;
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