<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="p-4 mb-8">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';
import { ref, defineProps } from 'vue';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps({
  title: String,
  labels: Array,
  datasets: Array,
  options: Object,
});

const chartData = ref({
  labels: props.labels,
  datasets: props.datasets,
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  tension: 0.4,
});
</script>
