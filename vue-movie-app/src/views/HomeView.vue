<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movie'
import SearchBar from '../components/SearchBar.vue'
import MovieCard from '../components/MovieCard.vue'
import MovieModal from '@/components/MovieModal.vue'

const store = useMovieStore()

// متغیری برای نگه داشتن ID فیلمی که روش کلیک شده (برای Modal که بعدا می‌سازیم)
const selectedMovieId = ref<string | null>(null)

// تابعی برای باز کردن مودال
function openModal(id: string) {
  selectedMovieId.value = id
}
</script>

<template>
  <div class="home">
    <h1>🎬 Movie Search</h1>

    <!-- ۱. نوار جستجو -->
    <SearchBar />

    <!-- ۲. وضعیت لودینگ -->
    <p v-if="store.loading" class="loading">در حال جستجو...</p>

    <!-- ۳. نمایش لیست فیلم‌ها -->
    <div v-else class="movie-grid">
      <MovieCard 
        v-for="movie in store.movies" 
        :key="movie.imdbID" 
        :movie="movie" 
        @click="openModal(movie.imdbID)"
      />
    </div>

    <!-- ۴. اگه نتیجه‌ای نبود -->
    <p v-if="!store.loading && store.movies.length === 0" class="empty">
      ! فیلمی پیدا نشد یا هنوز سرچ نکردی
    </p>

    <!-- ۵. مودال -->
    <MovieModal 
    :imdbID="selectedMovieId" 
    @close="selectedMovieId = null" 
    />
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin: 20px 0 30px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .empty {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 40px;
}
</style>
