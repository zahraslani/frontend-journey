<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movie'
import { searchMovies } from '@/api/omdb'
import type { Movie } from '@/types/movie'

//  اتصال به Store
const store = useMovieStore()

//  متغیری برای نگه داشتن متن تایپ شده
const query = ref('')

const suggestions = ref<Movie []> ([])
const showSuggestions = ref (false)

//گرفتن پیشنهاد از API
async function fetchSeggestions (term: string){
  if(term.trim().length < 3){
    suggestions.value = []
    return
  }
  try{
    const data = await searchMovies(term)
    // فقط 5 تا پیشنهاد اول رو نشون بده
    suggestions.value = data.Search ? data.Search.slice(0, 5) : [] 
    showSuggestions.value = true
  }catch (error){
    console.log(error)
  }
}

// پاک کردن لیست فیلم ها
let timer: ReturnType<typeof setTimeout> | undefined

watch(query, (newValue) => {
  clearTimeout(timer)

  if (newValue === '') {
    store.movies = []
    suggestions.value = []
    showSuggestions.value = false
    return
  }

  timer = setTimeout(() => {
    fetchSeggestions(newValue)
  }, 300)
})


//وقتی روی پیشنهاد کلیک میشه
function selectSuggestion(title: string){
  query.value = title
  showSuggestions.value = false
  store.searchMovies(title)
}

//  تابع جستجو
function handleSearch() {
  if (query.value.trim() === '') return
  showSuggestions.value = false
  store.searchMovies(query.value)
}

</script>


<template>
<div class="search-container">
  <div class="search-box">
    <input 
    v-model="query" 
    @keydown.enter="handleSearch"
    type="text" 
    placeholder="اسم فیلم رو بنویس..." 
    />
    <button @click="handleSearch">نمایش نتایج
      <i class="fas fa-search"></i>
    </button>
    </div>
    
    <!-- لیست کشویی پیشنهادات -->
    <ul v-if="showSuggestions && suggestions.length > 0" class="suggestions-list">
      <li 
      v-for="movie in suggestions" 
      :key="movie.imdbID"
      @click="selectSuggestion(movie.Title)"
      >
      <img :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/30x45'" />
      <span>{{ movie.Title }} ({{ movie.Year }})</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column; /* برای اینکه لیست زیر باکس بیاد */
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
  position: relative; /* برای اینکه لیست نسبت به این کانتینر موقعیت بگیره */
}

.search-box {
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

/* استایل لیست کشویی */
.suggestions-list {
  position: absolute;
  top: 60px; /* دقیقا زیر باکس */
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  z-index: 100; /* روی بقیه عناصر باشه */
  max-height: 300px;
  overflow-y: auto;
}

.suggestions-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestions-list li:hover {
  background: #f0f2f5;
}

.suggestions-list img {
  width: 30px;
  height: 45px;
  object-fit: cover;
  border-radius: 5px;
}

.suggestions-list span {
  font-size: 14px;
  color: #333;
}

</style>