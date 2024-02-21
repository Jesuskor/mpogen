<template>
  <div>
    <button @click="toggleModal" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Abrir modal</button>

    <div class="fixed inset-0 overflow-y-auto" v-if="showModal">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
        <div class="relative bg-white w-full max-w-lg min-w-fit rounded-lg shadow-xl p-6 space-y-4">
          <header class="flex w-full">
            <div>
              <div class="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Fecha seleccionada</div>
              <h2 class="text-2xl font-semibold text-slate-600">{{ year }}</h2>
            </div>
            <div @click="closeModal" class="cursor-pointer text-xs text-red-400 ml-auto w-8 h-8 bg-red-400/10 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </header>
          <main>
            <slot></slot>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const { year } = defineProps({
  year: Number
});

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const closeModal = () => {
  showModal.value = false;
};
</script>
