<script setup lang="ts">
  import { $ref } from 'vue/macros'

  const count = $ref(0)
</script>

<template>
  <div>
    <h1>Counter</h1>
    <p>This is a simple example of a Vue.js component.</p>
    <p>Current count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
