<script setup lang="ts">
  import { useMutation, useQuery } from 'vue-query'
  import TodoRepository from '@/app/todos/repositories/todo.repository'
  import Counter from '@/app/todos/components/counter'

  // Fetch todos from the server
  const {
    data: todos,
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
  } = useQuery('todos', TodoRepository.getAll)

  // Mutate todos
  const { mutate } = useMutation(
    (id: number) => {
      return TodoRepository.deleteOne(id)
    },
    {
      onSuccess: () => {
        console.log('success')
      },
      onError: () => {
        console.log('error')
      },
    }
  )

  const onDelete = (id: number) => {
    mutate(id)
  }

  useHead({
    title: 'Todos',
  })
</script>

<template>
  <Counter />
  <div>This List Todo</div>
  <div v-if="isLoadingTodos">
    <div>Loading...</div>
  </div>
  <div v-else-if="isErrorTodos">
    <div>An error occured</div>
  </div>
  <ul v-else style="height: 200px; overflow: auto">
    <li v-for="todo in todos" :key="todo.id">
      <RouterLink :to="`todos/${todo.id}`">{{ todo.title }}</RouterLink>
      <button @click="onDelete(todo.id)">delete</button>
    </li>
  </ul>
</template>
