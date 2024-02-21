<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center p-4">
    <div @click="closeModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="relative bg-white dark:bg-dark-900 w-full max-w-lg min-w-fit rounded-lg shadow-xl p-6">
      <header class="flex w-full mb-4">
        <div>
          <div class="font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider text-[10px]">{{ accessData.fecha ? 'Fecha' : 'Nombre del acceso'}}</div>
          <h2 class="text-2xl font-semibold text-slate-600 dark:text-slate-400">{{ accessData.fecha || accessData.access_name }}</h2>
        </div>
        <div @click="closeModal" class="cursor-pointer text-xs text-red-400 ml-auto w-8 h-8 bg-red-400/10 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </header>
      <main class="overflow-y-auto h-fit max-h-[calc(90vh-7rem)]">
        <div class="space-y-2 items-center pr-2">
          <div v-for="(date, index) in accessData.dates || accessData.accesos" :key="index">
            <InfoCardColumn
                :badge="index+1"
                :plaza="date.date || date.access_name"
                :statName1="checkbox ? 'Salidas' : 'Entradas'"
                :statValue1="date.entradas"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import InfoCardColumn from "@/components/InfoCardColumn.vue";

const props = defineProps({
  accessData: Array | Object,
  isOpen: Boolean,
  checkbox: Boolean
})

console.log(props.accessData)

const emits = defineEmits(['update:isOpen'])

const closeModal = () => {
  emits('update:isOpen', false)
}
</script>
