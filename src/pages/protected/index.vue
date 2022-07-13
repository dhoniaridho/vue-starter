<script setup lang="ts">
  const name = computed(() => {
    return localStorage.getItem('name')
  })
</script>

<template>
  <div>Hello {{ name }}</div>
</template>

<route>
{
  name: "protected",
  meta: {
    auth: true
  }
}
</route>
