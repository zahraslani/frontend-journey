<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movie'

// 1. اتصال به Store
const store = useMovieStore()

// 2. متغیری برای نگه داشتن متن تایپ شده
const query = ref('')

// 3. تابع جستجو
function handleSearch() {
  if (query.value.trim() === '') return
  store.searchMovies(query.value)
}
//4. پاک کردن لیست فیلم ها
watch (query, (newValue) => {
  if (newValue === ''){
    store.movies = []
  }
})

</script>

<template>
  <div class="search-bar">
    <!-- با زدن Enter یا کلیک روی دکمه، تابع handleSearch اجرا میشه -->
    <input 
      v-model="query" 
      @keydown.enter="handleSearch"
      type="text" 
      placeholder="نام فیلم یا سریال را بنویسید..." 
    />
    <button @click="handleSearch">نمایش نتایج</button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  direction: rtl;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto 30px;
  background: white;
  padding: 8px;
  border-radius: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  font-family: Tahoma;
  outline: none;
  direction: rtl;
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