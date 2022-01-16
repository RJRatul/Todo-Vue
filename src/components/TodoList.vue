<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="Enter Your Todo Here then click Enter"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <todo-item
        v-for="todo in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!anyRemaining"
        @removedTodo="removeTodo"
        @finishedEdit="finishedEdit"
      >
      </todo-item>
    </transition-group>

    <div class="extra-container">
      <div>
        <label
          ><input
            type="checkbox"
            :checked="!anyRemaining"
            @change="checkAllTodos"
          />
          Check All</label
        >
      </div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">
            Clear Completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
export default {
  name: "todo-list",
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
    };
  },
  computed: {
    remaining() {
      return this.$store.state.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.$store.state.filter == "all") {
        return this.$store.state.todos;
      } 
      return this.$store.state.todos;
    },
    showClearCompletedButton() {
      return (
        this.$store.state.todos.filter((todo) => todo.completed).length > 0
      );
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.$store.state.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(id) {
      const index = this.$store.state.todos.findIndex((item) => item.id == id);
      this.$store.state.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.$store.state.todos.forEach(
        (todo) => (todo.completed = event.target.checked)
      );
    },
    clearCompleted() {
      this.$store.state.todos = this.$store.state.todos.filter(
        (todo) => !todo.completed
      );
    },
    finishedEdit(data) {
      const index = this.$store.state.todos.findIndex(
        (item) => item.id == data.id
      );
      this.$store.state.todos.splice(index, 1, data);
    },
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
}

</style>