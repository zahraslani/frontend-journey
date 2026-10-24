import { ref } from 'vue'
import { defineStore } from 'pinia'
import { searchMovies as searchMoviesApi } from '@/api/omdb'
import type { Movie } from '@/types/movie'

export const useMovieStore = defineStore('movies', () => {
  // ۱. State (داده‌ها)
  const movies = ref<Movie[]>([])
  const favorites = ref<Movie[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))
  const loading = ref(false)

  // ۲. Action (جستجو در API)
  async function searchMovies(query: string) {
    loading.value = true
    try {
      const data = await searchMoviesApi(query)
      movies.value = data.Search || []
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  // ۳. Action (اضافه/حذف علاقه‌مندی)
  function toggleFavorite(movie: Movie) {
    const index = favorites.value.findIndex(f => f.imdbID === movie.imdbID)
    if (index === -1) {
      favorites.value.push(movie)
    } else {
      favorites.value.splice(index, 1)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  // ۴. در دسترس قرار دادن برای کامپوننت‌ها
  return { movies, favorites, loading, searchMovies, toggleFavorite }
})