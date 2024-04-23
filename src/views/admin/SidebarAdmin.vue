<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">

        <RouterLink class="nav-link" :to="{ path: '/admin' }">
          <i class="bi bi-grid"></i>
          <span>Truyện</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink class="nav-link collapsed" :to="{ path: '/admin/theloai' }">
          <i class="bi bi-card-list"></i>
          <span>Thể loại</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink class="nav-link collapsed" :to="{ path: '/admin/slide' }">
          <i class="bi bi-card-image"></i>
          <span>Slide</span>
        </RouterLink>
        
      </li>
    </ul>
  </aside>
  <!-- End Sidebar-->
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  name: "SideBar",
  components: { RouterLink },
};
</script>
