import {ref} from 'vue'
import { defineStore } from 'pinia'

export const useMovieStore = defineStore ('movies', () => {
    
    const movies = ref <any[]> ([])

    const favorites = ref<any[]> (JSON.parse(localStorage.getItem('favorites') || '[]'))

    const loading = ref(false)

    async function searchMovies(query:string) {

        loading.value = true //شروع لودینگ
        
        try{
            const url = `http://www.omdbapi.com/?apikey=1b2f9ae4&s=${query}`
            const response = await fetch(url)
            const data =await response.json()
            movies.value = data.Search || []
        }catch(error){
            console.log(error)
        }finally {
            loading.value = false
        }
    }

    function toggleFavorite(movie: any){

        const index = favorites.value.findIndex( f => f.imdbID === movie.imdbID)

        if(index === -1){
            favorites.value.push(movie)
        }else{
            favorites.value.splice(index, 1)
        }

        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    return{ movies, favorites, loading, searchMovies, toggleFavorite}
})