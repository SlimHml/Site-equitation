<template>
  <div class="home">
    <HelloWorld msg="Salut" />
    <Todo v-bind:todos="todos" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";
import Todo from "@/components/Todo";

export default {
  name: "home",
  components: {
    HelloWorld,
    Todo
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "Todo 1",
          completed: false
        }
      ]
    };
  }
};
</script>
