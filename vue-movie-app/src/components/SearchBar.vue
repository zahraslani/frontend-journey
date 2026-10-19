<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movie'

// ۱. اتصال به Store
const store = useMovieStore()

// ۲. متغیری برای نگه داشتن متن تایپ شده
const query = ref('')

// ۳. تابع جستجو
function handleSearch() {
  if (query.value.trim() === '') return
  store.searchMovies(query.value)
}
</script>

<template>
  <div class="search-bar">
    <!-- با زدن Enter یا کلیک روی دکمه، تابع handleSearch اجرا میشه -->
    <input 
      v-model="query" 
      @keydown.enter="handleSearch"
      type="text" 
      placeholder="اسم فیلم رو بنویس..." 
    />
    <button @click="handleSearch">جستجو</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto 30px;
}

input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  font-family: Tahoma;
  outline: none;
}

input:focus {
  border-color: #667eea;
}

button {
  padding: 12px 25px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  font-family: Tahoma;
  transition: background 0.3s;
}

button:hover {
  background: #764ba2;
}
</style>