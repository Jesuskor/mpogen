<!-- DarkModeToggle.vue -->
<template>
  <button @click="toggleDarkMode" :class="{ 'dark-mode-button': true, 'dark-mode-active': darkMode }">
    <i v-if="darkMode" class="fa-solid fa-moon"></i>
    <i v-else class="fa-solid fa-sun"></i>
  </button>
</template>

<script lang="ts" setup>
import { useDarkMode } from "@/stores/darkMode";

const { darkMode, toggleDarkMode } = useDarkMode();

</script>
