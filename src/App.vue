<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <n-config-provider preflight-style-disabled>
    <router-view />
  </n-config-provider>
</template>
