<script setup lang="ts">
defineProps<{
  title: string
  value: string
  hint: string
  color: 'blue' | 'green' | 'orange' | 'purple'
}>()
</script>

<template>
  <article class="stat-card" :class="color">
    <div class="icon">
      <slot name="icon" />
    </div>
    <div class="info">
      <p class="title">{{ title }}</p>
      <strong class="value">{{ value }}</strong>
      <span class="hint">{{ hint }}</span>
    </div>
  </article>
</template>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
}

.icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title {
  color: #64748b;
  font-size: 14px;
}

.value {
  font-size: 24px;
  color: #0f172a;
}

.hint {
  color: #94a3b8;
  font-size: 12px;
}

.blue .icon {
  background: #dbeafe;
  color: #2563eb;
}

.green .icon {
  background: #dcfce7;
  color: #16a34a;
}

.orange .icon {
  background: #ffedd5;
  color: #ea580c;
}

.purple .icon {
  background: #f3e8ff;
  color: #9333ea;
}
</style>
