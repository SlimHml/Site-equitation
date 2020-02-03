<template>
  <div class="about">
    <About msg="C'est une à propos page :)" />
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
import About from "@/components/About.vue";

export default {
  name: "about",

  components: {
    About
  }
};
</script>
