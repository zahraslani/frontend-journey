<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from './stores/movie';
import SearchBar from './components/SearchBar.vue';
import MovieCard from './components/MovieCard.vue';
import MovieModel from './components/MovieModel.vue';

const store = useMovieStore()

const selectedMovieId = ref <string | null> (null)

function openModel (id:string){
  selectedMovieId.value = id
}

function closeModel (){
  selectedMovieId.value = null
}

</script>

<template>
<div class="app">
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
    @click="openModel(movie.imdbID)"
    />
  </div>

  <!-- ۴. اگه نتیجه‌ای نبود -->
  <p v-if="!store.loading && store.movies.length === 0" class="empty">
    فیلمی پیدا نشد یا هنوز سرچ نکردی!
  </p>
  
  <MovieModel
  :imdbID="selectedMovieId"
  @close="closeModel"
  />
</div>
</template>

<style>
/* استایل کلی صفحه */
body {
  margin: 0;
  background: #f0f2f5;
  font-family: Tahoma;
}

.app {
  padding: 40px 20px;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

/* چیدمان کارت‌ها (Grid) */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* متن‌های وضعیت */
.loading, .empty {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 40px;
}
</style>