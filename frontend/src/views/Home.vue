<template>
  <div class="home">
    <Todo v-bind:todos="todos" />
  </div>
</template>

<script>
// Le V-BIND todos veut dire: Todo(la balise dans template), je souhaite qu'on transmette nos données
import Todo from "@/components/Todo";

export default {
  name: "home",
  components: {
    Todo
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "Todo Une ||",
          completed: true
        }
      ]
    };
  }
};
</script>
