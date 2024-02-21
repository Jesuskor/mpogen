<template>
  <div class="bg-black/5 dark:bg-dark-700 p-4 rounded-xl cursor-pointer group hover:bg-blue-400 dark:hover:bg-blue-900 transition-colors">
    <div class="flex space-x-4">
      <div class="w-12 h-12 bg-white dark:bg-dark-500 dark:shadow-none shadow-app-md rounded-lg flex items-center justify-center text-xl text-slate-400">
        <!-- Saber si badge es un número o un string -->
        <span v-if="isNumber(badge)" class="text-sm font-semibold">#{{ badge }}</span>
        <i v-else :class="badge"></i>
      </div>
      <div class="text-slate-600">
        <div class="flex items-center space-x-2">
          <div v-if="color" class="h-4 w-4 rounded" :style="{backgroundColor: color}"></div>
          <p class="font-semibold dark:text-slate-400 group-hover:text-white dark:group-hover:text-slate-400">
            {{ plaza }}
          </p>
        </div>
        <p class="text-sm text-slate-400 dark:text-slate-500 group-hover:text-white/80 dark:group-hover:text-slate-500">
          <strong>{{ statName1 }}: </strong>{{ statValue1 }}
          <strong v-if="statName2"> | {{ statName2 }}: </strong>{{ statValue2 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import {isNumber} from "chart.js/helpers";

const props = defineProps({
  plaza: Object | String,
  badge: Object | String | Number,
  statName1: String,
  statValue1: String | Number,
  statName2: String,
  statValue2: String,
  color: String,
});

</script>