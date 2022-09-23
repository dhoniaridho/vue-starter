<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from '@components/HelloWorld.vue'
  import Icons from '@components/Icons.vue'

  const router = useRouter()

  const getName = computed(() => {
    return localStorage.getItem('name')
  })

  const name = $ref('')
  const isLogin = ref(getName.value ? true : false)

  const onSubmit = () => {
    isLogin.value = true

    localStorage.setItem('name', name)
  }
  const onLogout = () => {
    isLogin.value = false

    localStorage.removeItem('name')
    router.push('/')
  }
</script>

<template>
  <header>
    <Icons name="logo" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <form v-if="!isLogin" @submit.prevent="onSubmit">
        <input v-model="name" type="text" name="" />
        <button type="submit">login</button>
      </form>
      <button v-else @click="onLogout">Clear Session</button>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/todos">Todos</RouterLink>
        <RouterLink to="/protected">Protected</RouterLink>
      </nav>
    </div>
  </header>

  <div class="wrapper"><RouterView /></div>
</template>
