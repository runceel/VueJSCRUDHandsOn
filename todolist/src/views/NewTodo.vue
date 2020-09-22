<template>
  <form @submit.prevent="submitNewTodo">
    <div v-if="state.errors.length">
      <h3>入力内容にエラーがあります</h3>
      <ul>
        <li v-for="error in state.errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </div>
    <div>
      <label>やること</label>
      <input type="text" v-model="state.text" />
    </div>
    <div>
      <input type="submit" value="登録" />
    </div>
  </form>
</template>
    
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import todoService from '@/services/TodoService';
import router from '../router';

export default defineComponent({
    setup() {
        const state = reactive({
            errors: [] as string[],
            text: '',
        });

        async function submitNewTodo() {
            state.errors = [];
            if (!state.text) {
                state.errors.push('やることを入力してください');
                return;
            }

            await todoService.add({
                id: 0,
                text: state.text,
                done: false,
            });

            router.push({ name: 'Home' });
        }

        return {
            state,
            submitNewTodo,
        };
    }
});
</script>

<style>
ul {
  list-style-type: none;
}
</style>
