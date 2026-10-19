<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movie.ts'
import MovieCard from '../components/MovieCard.vue'
import MovieModal from '../components/MovieModal.vue'

const store = useMovieStore()
const selectedMovieId = ref<string | null>(null)
</script>

<template>
  <div class="favorites-page">
    <h1>❤️ favorites</h1>

    <div v-if="store.favorites.length === 0" class="empty">
     ! هنوز هیچ فیلمی رو به علاقه‌مندی‌ها اضافه نکردی
    </div>

    <div v-else class="movie-grid">
      <MovieCard 
        v-for="movie in store.favorites" 
        :key="movie.imdbID" 
        :movie="movie" 
        @click="selectedMovieId = movie.imdbID"
      />
    </div>

    <MovieModal 
      :imdbID="selectedMovieId" 
      @close="selectedMovieId = null" 
    />
  </div>
</template>

<style scoped>
.favorites-page {
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

.empty {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 40px;
}
</style>