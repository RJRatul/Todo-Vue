import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: "all",
        todos: [
                {
                  id: 1,
                  title: "Edit a todo by double clicking on it",
                  completed: false,
                  editing: false,
                },
                {
                  id: 2,
                  title: "Remove a todo by clicking the X icon",
                  completed: false,
                  editing: false,
                },
                {
                  id: 2,
                  title: "Remove all todos by selecting all",
                  completed: false,
                  editing: false,
                },
          ],

    }
})