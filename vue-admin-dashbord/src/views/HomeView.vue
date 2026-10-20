<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import SalesChart from '@/components/SalesChart.vue';
import DataTable from '@/components/DataTable.vue';
</script>

<template>
  <section class="stats">
    <StatCard title="کاربران" value="۱٬۲۴۸" hint="۱۲٪ رشد این ماه" color="blue">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </template>
    </StatCard>

    <StatCard title="فروش" value="۴۲٬۵۰۰٬۰۰۰" hint="تومان در این ماه" color="green">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </template>
    </StatCard>

    <StatCard title="سفارشات" value="۳۲۶" hint="۱۸ سفارش جدید" color="orange">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </template>
    </StatCard>

    <StatCard title="بازدید" value="۱۸٬۹۴۰" hint="نسبت به دیروز +۸٪" color="purple">
      <template #icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </template>
    </StatCard>
  </section>
  <SalesChart/>
  <DataTable/>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
</style>
