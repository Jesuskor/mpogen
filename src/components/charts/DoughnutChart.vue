<template>
  <div class="p-4 mb-8 w-full h-fit">
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, ChartData } from 'vue-chartjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
);

const props = defineProps<{
  chartData: ChartData;
}>();

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  borderWidth: 2,
  borderColor: 'rgb(239 246 255)',
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label + ': ';
          label += props.chartData.datasets[context.datasetIndex].data[context.dataIndex];
          return label;
        }
      }
    },
    legend: {
      position: 'bottom', // Establece la posición de la leyenda a la derecha
      display: false,
    },
  }
});
</script>
