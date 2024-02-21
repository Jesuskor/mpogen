<template>
  <div :class="'bg-'+color+'-400 dark:bg-'+color+'-900'" class="h-24 rounded-lg grid grid-cols-4 overflow-hidden">
    <div class="space-y-3 p-4 col-span-3">
      <h3 class="text-white dark:text-slate-400 font-semibold">{{ name }}</h3>
      <button :class="'text-'+color+'-400'" class="bg-white dark:bg-white/10 dark:text-slate-300 rounded-full px-2 py-1 text-[10px] uppercase tracking-wider font-semibold">
        {{ badge }}
      </button>
    </div>
    <div class="text-8xl overflow-hidden pt-2 text-black/20 ml-auto">
      <i :class="icon"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  name: String,
  badge: String,
  icon: String,
  color: String,
});
</script>