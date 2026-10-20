<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="sidebar">
    <h1 class="brand">پنل ادمین</h1>
    <nav>
      <RouterLink to="/">داشبورد</RouterLink>
      <RouterLink to="/about">درباره</RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: #0f172a;
  color: #cbd5e1;
  padding: 24px 16px;
}

.brand {
  color: #fff;
  font-size: 20px;
  margin-bottom: 32px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

nav a {
  padding: 10px 14px;
  border-radius: 10px;
}

nav a.router-link-active {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
}
</style>
