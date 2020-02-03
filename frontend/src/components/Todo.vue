<template>
  <div>
    <div v-bind:key="todo" v-for="todo in todos">
      <h3>{{ todo.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: ["todos"]
};
</script>

<style lang="css" scoped>
.completed {
  text-decoration: overline;
}
</style>
