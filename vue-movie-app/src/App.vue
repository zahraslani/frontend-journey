<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- منوی بالا -->
    <nav class="navbar" aria-label="ناوبری اصلی">
      <RouterLink to="/"><span aria-hidden="true">🔍</span> Search</RouterLink>
      <RouterLink to="/favorites"><span aria-hidden="true">❤️</span> Favorites </RouterLink>
    </nav>

    <!-- اینجا صفحات عوض می‌شن -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root { 
  --color-primary: #59a6e6; 
  --radius-lg: 20px; 
}
*, *::before, *::after { 
  box-sizing: border-box; 
}
body {
  margin: 0;
  background: linear-gradient(135deg, #e0eafc 0%, #94b6e6 100%);
  font-family: Tahoma, Vazirmatn, system-ui, sans-serif;
  min-height: 100vh;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
</style>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 20px;
  margin-bottom: 50px;
  z-index: 100;
  width: 100%;
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
  color: var(--color-primary); 
}

.main-content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 480px) {
  .navbar { gap: 8px; padding: 10px; top: 10px; margin-bottom: 30px; }
  .navbar a { font-size: 16px; padding: 8px 12px; }
}
</style>