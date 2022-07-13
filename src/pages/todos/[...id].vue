<script setup lang="ts">
  import { useQuery } from 'vue-query'
  import TodoRepository from './repositories/todo.repositories'

  const route = useRoute()

  const counter = ref(Number(route.params.id))
  const counterComputed = computed(() => counter.value.toString())

  const { data, isLoading, isError } = useQuery(
    ['todo', counterComputed],
    ({ queryKey }) => {
      return TodoRepository.getOne(queryKey[1])
    }
  )

  const increment = () => {
    counter.value++
  }

  const decrement = () => {
    if (counter.value <= 1) return
    counter.value--
  }
</script>

<template>
  <div v-if="isError">
    <div>An error occured</div>
  </div>
  <div v-else-if="isLoading">
    <div>loading...</div>
  </div>
  <div v-else>
    <p>
      {{ data?.id }}
    </p>
    <h1>
      {{ data?.title }}
    </h1>
    <p>
      {{ data?.completed }}
    </p>
  </div>
  <button @click="increment">next todo</button>
  <button @click="decrement">prev todo</button>
</template>
