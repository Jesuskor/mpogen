<template>
  <div :class="{ 'bg-blue-400 dark:bg-blue-900': isFirst, 'bg-white dark:bg-dark-700': !isFirst }" class="rounded-lg p-4 h-40 space-y-1">
    <header class="grid grid-cols-4">
      <div class="col-span-3">
        <h3 :class="{ 'text-white dark:text-slate-400' : isFirst, 'text-slate-400': !isFirst}" class="text-[10px] uppercase tracking-wider font-semibold">
          {{ title }}
        </h3>
      </div>
      <div class="col-span-1 flex items-center justify-end">
        <div :class="{ 'text-blue-400 dark:text-slate-400 bg-white dark:bg-white/10': isFirst, 'text-slate-400 bg-blue-50 dark:bg-dark-400': !isFirst}" class="w-8 h-8 rounded-lg flex items-center justify-center text-xs">
          <i :class="icon"></i>
        </div>
      </div>
    </header>
    <main class="text-center h-24 flex flex-col justify-center space-y-2">
      <div>
        <p v-if="content" :class="{ 'text-white': isFirst, 'text-slate-400': !isFirst}" class="font-semibold text-slate-500 dark:text-slate-400 text-lg line-clamp-1">
          {{ isNumber(content) ? content.toLocaleString() : content }}
        </p>
        <div v-else :class="{'bg-gray-200 dark:bg-black/20': isFirst, 'bg-gray-200 dark:bg-dark-300': !isFirst}" class="w-16 h-5 mx-auto rounded-full animate-pulse"></div>
      </div>
      <div>
        <div v-if="badge && badge != 0"
             :class="{
          'bg-blue-50': color === 'blue',
          'bg-orange-400 text-white': color === 'orange',
          'bg-emerald-400 text-white': color === 'emerald',
          'text-blue-400 dark:bg-white/10': isFirst,
          'text-slate-400 dark:bg-dark-400': !isFirst
        }" class="dark:text-slate-300 w-fit mx-auto rounded-full px-3 py-2 text-xs font-semibold">
          {{ badge }}
        </div>
        <div v-else :class="{'bg-gray-200 dark:bg-black/20': isFirst, 'bg-blue-50 dark:bg-dark-200': !isFirst}" class="w-fit mx-auto text-slate-400 rounded-full px-3 py-2 text-xs font-semibold">
          <div :class="{'bg-gray-300 dark:bg-white/10': isFirst, 'bg-slate-300 dark:bg-dark-300': !isFirst}" class="w-16 h-3 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import {isNumber} from "chart.js/helpers";

const props = defineProps({
  title: String,
  content: String | Number,
  badge: String | Number,
  icon: String,
  color: String,
  isFirst: Boolean,
});


</script>