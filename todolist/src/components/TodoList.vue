<template>
  <div id="todo-list">
      <h1>TODO リスト</h1>
    <p v-if="state.alertMessage">{{ state.alertMessage }}</p>
      <ol>
          <li v-for="todo in state.todos" v-bind:key="todo.id">
              <input type="checkbox" v-model="todo.done" @change="event => todoStatusChanged(todo)" />
              {{ todo.text }}
          </li>
      </ol>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, reactive } from 'vue';
import TodoItem from '@/models/TodoItem';
import todoService from '@/services/TodoService';

export default defineComponent({
    setup() {
        const state = reactive({
            alertMessage: '',
            todos: [] as TodoItem[],
        });

        onMounted(async () => {
            try {
                state.todos = await todoService.getAll();
            } catch {
                state.alertMessage = 'TODO リストの取得中にエラーが発生しました。'
            }
        });

        async function todoStatusChanged(updatedTodoItem: TodoItem) {
          await todoService.update(updatedTodoItem);
        }

        return {
            state,
            todoStatusChanged,
        };
    }
});

</script>

<style>
    li {
      list-style-type: none;
    }
</style>