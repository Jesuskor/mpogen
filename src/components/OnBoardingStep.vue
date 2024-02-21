<script setup>
// Importar el prop type de Vue
import { defineProps } from 'vue';

// Definir los props esperados
const props = defineProps(['title', 'description']);


</script>

<template>
  <div class="text-slate-700 text-center space-y-2">
    <h1 class="text-2xl font-semibold">{{ title }}</h1>
    <div>{{ description }}</div>
  </div>
</template>
