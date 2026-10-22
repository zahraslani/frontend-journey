<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import AppHeader from './components/AppHeader.vue'

const route = useRoute()
</script>

<template>
  <div class="layout">
    <Sidebar />

    <div class="content">
      <AppHeader :title="(route.meta.title as string) || 'داشبورد'" />
      <main class="main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.main {
  flex: 1;
  padding: 24px;
}
</style>
