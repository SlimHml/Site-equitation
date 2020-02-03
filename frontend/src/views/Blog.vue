<template>
  <div class="blog">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Blog msg="Salut, c'est un Blog" />
  </div>
</template>

<script>
import Blog from "@/components/Blog.vue";
export default {
  name: "blog",

  components: {
    Blog
  }
};
</script>

<style lang="scss" scoped></style>
