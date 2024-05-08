<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <n-config-provider :theme-overrides="{
    common: {
      primaryColor: '#1c2142',
      primaryColorHover: '#1c2142',
      primaryColorPressed: '#1c2142',
    }
  }" preflight-style-disabled>
    <router-view />
  </n-config-provider>
</template>
