<template>
  <div class="todo-item" v-bind:class="{ 'is-complete': todo.completed }">
    <p>{{ todo.title }} {{ todo.id }}</p>
  </div>
</template>

<script>
// Le props "todo" est le nom du v-bind dans Todo.vue, qui permet la transmission de données

// Le V-BIND ci-dessus lie la div et son contenu à la classe CSS is-complete ci-dessous
export default {
  name: "TodoItem",
  props: ["todo"]
};
</script>

<style lang="css" scoped>
.todo-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

.is-complete {
  text-decoration: line-through;
}

.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
