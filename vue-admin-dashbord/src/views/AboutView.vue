<script setup lang="ts">
</script>

<template>
  <div class="about-container">
    <h1>درباره داشبورد مدیریتی</h1>
    
    <div class="card">
      <h2>📊 این پروژه چیه؟</h2>
      <p>
        این یک داشبورد مدیریتی مدرن است که با استفاده از Vue 3، TypeScript و Vite ساخته شده است.
        هدف از این پروژه، نمایش توانایی در ساخت رابط‌های کاربری پیچیده، مدیریت داده‌ها و استفاده از کتابخانه‌های نمودار است.
      </p>
    </div>

    <div class="card">
      <h2>🛠 تکنولوژی‌های استفاده شده</h2>
      <ul>
        <li><strong>Vue 3 (Composition API):</strong> برای ساخت کامپوننت‌های واکنشی</li>
        <li><strong>TypeScript:</strong> برای تایپ‌دهی قوی و جلوگیری از خطا</li>
        <li><strong>Vue Router:</strong> برای مدیریت صفحات (داشبورد، درباره)</li>
        <li><strong>Chart.js:</strong> برای رسم نمودارهای فروش</li>
        <li><strong>CSS Grid & Flexbox:</strong> برای دیزاین ریسپانسیو و مدرن</li>
      </ul>
    </div>

    <div class="card">
      <h2>👩‍💻 توسعه‌دهنده</h2>
      <p>
        این پروژه توسط <strong>زهرا اصلانی</strong> طراحی و پیاده‌سازی شده است.
        برای مشاهده سایر پروژه‌ها می‌توانید به 
        <a href="https://github.com/zahraslani" target="_blank">گیت‌هاب من</a> مراجعه کنید.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 24px;
  text-align: center;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h2 {
  color: #4F46E5;
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 18px;
}

p, li {
  color: #475569;
  line-height: 1.8;
}

ul {
  padding-right: 20px;
}

a {
  color: #4F46E5;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>