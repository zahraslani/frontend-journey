<script setup lang="ts">
import { ref, watch } from 'vue'

// ۱. Props: اطلاعات فیلم انتخاب شده رو می‌گیریم
const props = defineProps<{
  imdbID: string | null
}>()

// ۲. Emits: سیگنال برای بستن پنجره
const emit = defineEmits<{
  (e: 'close'): void
}>()

// ۳. State برای نگه داشتن اطلاعات کامل فیلم
const movieDetails = ref<any>(null)
const loading = ref(false)

// ۴. Watch: وقتی imdbID تغییر کرد (یعنی کاربر روی فیلم جدیدی کلیک کرد)، برو API رو صدا بزن
watch(() => props.imdbID, 
async (newID) => {
    if (!newID) return // اگه ID خالی بود، کاری نکن

    loading.value = true
    try {
        // گرفتن جزئیات کامل با i= (نه s=)
        const url = `http://www.omdbapi.com/?apikey=1b2f9ae4&i=${newID}`
        const res = await fetch(url)
        const data = await res.json()
        movieDetails.value = data
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
    }, { immediate: true }) // immediate: true یعنی به محض باز شدن، اجرا شو
</script>

<template>
<!-- اگه imdbID خالی بود، کل مودال رو مخفی کن -->
<div v-if="imdbID" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
        <!-- دکمه بستن -->
        <button class="close-btn" @click="emit('close')">✖</button>
        
        <!-- حالت لودینگ -->
        <div v-if="loading" class="loading">در حال دریافت...</div>

        <!-- نمایش اطلاعات -->
        <div v-else-if="movieDetails" class="details">
        <img :src="movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/200x300'" />
        <div class="info">
            <h2>{{ movieDetails.Title }}</h2>
            <p><strong>سال:</strong> {{ movieDetails.Year }}</p>
            <p><strong>خلاصه:</strong> {{ movieDetails.Plot }}</p>
            <p><strong>کارگردان:</strong> {{ movieDetails.Director }}</p>
            <p><strong>بازیگران:</strong> {{ movieDetails.Actors }}</p>
            <p><strong>امتیاز:</strong> ⭐ {{ movieDetails.imdbRating }}</p>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
/* استایل پس‌زمینه تیره */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* استایل کارت سفید وسط */
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

/* دکمه بستن */
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

/* چیدمان داخل مودال */
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