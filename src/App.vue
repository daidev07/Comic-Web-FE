<template>
  <RouterView />
</template>

<script>
import HomePage from "./views/user/HomePage.vue";

export default {
  name: "App",
  components: {
    HomePage,
  },
};
</script>

<style>
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
