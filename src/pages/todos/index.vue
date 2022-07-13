<script setup lang="ts">
  import Counter from './component/counter.vue'
  import { useQuery } from 'vue-query'
  import TodoRepository from './repositories/todo.repositories'

  const { data, isLoading, isError } = useQuery('todos', TodoRepository.getAll)
</script>

<template>
  <Counter />
  <div>This List Todo</div>
  <div v-if="isLoading">
    <div>Loading...</div>
  </div>
  <div v-else-if="isError">
    <div>An error occured</div>
  </div>
  <ul v-else style="height: 200px; overflow: auto">
    <li v-for="item in data" :key="item.id">
      <RouterLink :to="`todos/${item.id}`">{{ item.title }}</RouterLink>
    </li>
  </ul>
</template>
