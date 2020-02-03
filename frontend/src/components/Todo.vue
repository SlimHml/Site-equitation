<template>
  <div>
    <div v-bind:key="todo.id" v-for="todo in todos">
      <TodoItem v-bind:todo="todo" />
    </div>
  </div>
</template>

<script>
// Le props "todos" veut dire "Home, j'ai vu que tu me proposais de communiquer, voilà ma clé"

// Le V-BIND de TodoItem (la balise dans le template)
// veut dire: TodoItem, je souhaite qu'on transmette nos données
import TodoItem from "@/components/TodoItem";
export default {
  name: "Todo",
  props: ["todos"],
  components: {
    TodoItem
  }
};
</script>

<style lang="css" scoped>
.completed {
  text-decoration: overline;
}
</style>
