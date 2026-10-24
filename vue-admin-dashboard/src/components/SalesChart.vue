<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart } from 'chart.js/auto'

const chartCanvas = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

onMounted(() => {
  if (chartCanvas.value) {
    chart = new Chart(chartCanvas.value, {
      type: 'line', // نوع نمودار (خطی)
      data: {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
        datasets: [
          {
            label: 'فروش (میلیون تومان)',
            data: [12, 19, 15, 25, 22, 30],
            borderColor: '#4F46E5', // رنگ خط
            backgroundColor: 'rgba(79, 70, 229, 0.1)', // رنگ پشت خط
            fill: true,
            tension: 0.4 // انحنای خط
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                family: 'Tahoma' // فونت فارسی
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
})
onUnmounted(() => {
  chart?.destroy()
})
</script>

<template>
  <div class="chart-container">
    <h3>📈 نمودار فروش ۶ ماه گذشته</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
}
</style>