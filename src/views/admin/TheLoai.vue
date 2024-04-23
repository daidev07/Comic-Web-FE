<template>
    <Header />
    <SideBar />
    <div>
        <main id="main" class="main">
            <div class="truyenmoicapnhat">
                <div class="pagetitle">
                    <h1 class="fw-bold">TẤT CẢ THỂ LOẠI</h1>
                </div>
            </div>
            <div class="mt-5">
                <div class="">
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalThem">
                        Thêm thể loại
                    </button>
                </div>
                <div class="mt-5 w-100">
                    <div class="container w-100">
                        <ul class="responsive-table d-flex flex-wrap w-100">
                            <li class="table-row" v-for="category in categories" :key="category.id">
                                <div class="h5 align-items-center">{{ category.ten }}</div>
                                <div class="d-flex">
                                    <div class="col text-center" data-label="Amount">
                                        <button class="btn ms-2" style="background-color: #1e3a63; color: white"
                                            @click=deleteCate(category.id)>
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>

                            </li>
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
                    <h5 class="modal-title fw-bold" id="staticBackdropLabel">Thêm thể loại mới</h5>
                </div>
                <div class="modal-body">
                    <div class="mt-2 fw-bold">
                        Tên thể loại <span class="text-danger">*</span>
                    </div>
                    <input type="text" class="form-control" v-model="newCate.ten" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Hủy
                    </button>
                    <button type="button" class="btn btn-primary" id="liveToastBtn" data-bs-dismiss="modal"
                        @click="addCate()">
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
import swal from 'sweetalert2';
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css'

export default {
    name: "HomePage",
    data() {
        return {
            apiUrl: process.env.VUE_APP_URL,
            categories: [],
            newCate: {
                ten: null
            },
            categoriesForStory: [],
            selected: null,


        };
    },
    components: { SideBar, Header },
    mounted() {
        this.ShowCates();
    },
    methods: {
        async ShowCates() {
            try {
                const reponse = await axios.get("http://localhost:8000/api/category");
                this.categories = reponse.data;
            } catch (error) {
                console.error("Error fetching categories data:", error);
            }
        },
        async addCate() {
            try {
                await axios.post("http://localhost:8000/api/category/add", this.newCate);
                this.ShowCates();
                swal.fire({
                    title: "Đã thêm",
                    text: "Đã thêm truyện thể loại thành công",
                    icon: "success"
                });
                this.newCate.ten = null
            } catch (error) {
                console.error("Error adding category:", error);
            }
        },
        deleteCate(ctgId) {
            this.selected = this.categories.find(category => category.id === ctgId)
            const deleteCateId = this.selected.id
            swal.fire({
                title: "Bạn muốn xóa?",
                text: "Bạn có chắc chắn muốn xóa truyện không?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Có, hãy xóa",
                cancelButtonColor: "#d33",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(this.apiUrl + `/api/category/remove/${deleteCateId}`)
                        .then(response => {
                            swal.fire({
                                title: "Đã xóa",
                                text: "Bạn đã xóa thể loại thành công",
                                icon: "success"
                            });
                            this.ShowCates();
                        })
                        .catch(error => {
                            swal.fire({
                                title: "Lỗi",
                                text: "Có lỗi xảy ra khi xóa thể loại",
                                icon: "error"
                            });
                            console.error(error);
                        });
                }
            });
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
