<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="bi bi-grid"></i>
          <span>Trang chủ</span>
        </a>
      </li>
      <!-- End Dashboard Nav -->

      <li class="nav-item">
        <RouterLink class="nav-link collapsed" :to="{path: '/admin/theloai'}">
          <i class="bi bi-card-list"></i>
          <span>Thể loại</span>
        </RouterLink>
      </li>
      <!-- End Lịch sử -->

      <li class="nav-item">
        <RouterLink class="nav-link collapsed" :to="{path: '/admin/user'}">
          <i class="bi bi-person"></i>
          <span>User</span>
        </RouterLink>
      </li>
      <!-- End Favourite -->
    </ul>
  </aside>
  <!-- End Sidebar-->
</template>
<script>

import { RouterLink } from 'vue-router';

export default {
  name: "SideBar",
  components: {RouterLink},
};
</script>
