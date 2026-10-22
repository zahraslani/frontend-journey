<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <header class="header">
    <h2>{{ title ?? 'داشبورد' }}</h2>
    <span class="user">مدیر سیستم</span>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.user {
  background: #e0f2fe;
  color: #0369a1;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
}
</style>
