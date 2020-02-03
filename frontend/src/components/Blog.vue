<template>
  <div class="blog">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "Blog",
  props: {
    msg: String
  }
};
</script>

<style lang="scss" scoped></style>
