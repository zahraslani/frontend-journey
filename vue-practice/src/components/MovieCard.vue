<script setup lang="ts">
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movie';

// ۱. گرفتن اطلاعات فیلم از والد
const props = defineProps<{
  movie: any
}>()

// ۲. اتصال به Store برای چک کردن علاقه‌مندی‌ها
const store = useMovieStore()

// ۳. آیا این فیلم توی علاقه‌مندی‌ها هست یا نه؟
const isFavorite = computed(() => {
  return store.favorites.some(f => f.imdbID === props.movie.imdbID)
})

// ۴. فرستادن سیگنال به والد (برای Modal)
const emit = defineEmits<{
  (e: 'click'): void
}>()

// ۵. تابع کلیک روی قلب
function toggleFav() {
  store.toggleFavorite(props.movie)
}
</script>

<template>
  <div class="movie-card" @click="emit('click')">
    <img :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'" :alt="movie.Title" />
    
    <div class="info">
      <h3>{{ movie.Title }}</h3>
      <p>{{ movie.Year }}</p>
    </div>

    <!-- دکمه قلب -->
    <button 
      class="fav-btn" 
      :class="{ 'is-fav': isFavorite }"
      @click.stop="toggleFav"
    >
      {{ isFavorite ? '❤️' : '🤍' }}
    </button>
  </div>
</template>

<style scoped>
/* استایل‌های قبلی رو حفظ کن... */
.movie-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.info {
  padding: 10px;
  text-align: center;
}

.info h3 {
  font-size: 16px;
  margin: 0;
  color: #333;
}

.info p {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.fav-btn:hover {
  transform: scale(1.1);
}
</style>