<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  imdbID: string | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const movieDetails = ref<any>(null)
const loading = ref(false)

// Watch: هر وقت ID عوض شد، برو API رو صدا بزن
watch(() => props.imdbID, 
async (newID) => {
  if (!newID) return 
  
  loading.value = true
  try {
    const url = `https://www.omdbapi.com/?apikey=1b2f9ae4&i=${newID}`
    const res = await fetch(url)
    const data = await res.json()
    movieDetails.value = data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}, { immediate: true })
</script>

<template>
  <div v-if="imdbID" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="emit('close')">✖</button>

      <div v-if="loading" class="loading">در حال دریافت...</div>

      <div v-else-if="movieDetails" class="details">
        <img :src="movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/200x300'" />
        
        <div class="info">
          <h2>{{ movieDetails.Title }}</h2>
          <p><strong>Year:</strong> {{ movieDetails.Year }}</p>
          <p><strong>Summary:</strong> {{ movieDetails.Plot }}</p>
          <p><strong>Director:</strong> {{ movieDetails.Director }}</p>
          <p><strong>Cast:</strong> {{ movieDetails.Actors }}</p>
          <p><strong>Score:</strong> ⭐ {{ movieDetails.imdbRating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  padding: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px; height: 30px;
  cursor: pointer;
  font-weight: bold;
}

.details {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.details img {
  width: 150px;
  border-radius: 10px;
  object-fit: cover;
}

.info p {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.5;
}

.loading {
  text-align: center;
  padding: 20px;
  font-weight: bold;
}
</style>