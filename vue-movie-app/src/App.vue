<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <!-- منوی بالا -->
    <nav class="navbar">
      <RouterLink to="/">جستجو</RouterLink>
      <RouterLink to="/favorites">علاقه‌مندی‌ها ❤️</RouterLink>
    </nav>

    <!-- اینجا صفحات عوض می‌شن -->
    <RouterView />
  </div>
</template>

<style>
body {
  margin: 0;
  background: #f0f2f5;
  font-family: Tahoma;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 8px;
}

.navbar a.router-link-active {
  background: #667eea;
  color: white;
}
</style>