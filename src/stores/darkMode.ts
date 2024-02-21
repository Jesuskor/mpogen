// darkModeStore.ts
import { defineStore } from "pinia";

export const useDarkMode = defineStore("darkMode", {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.updateDarkModeClass();
    },
    updateDarkModeClass() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
  // Añadimos un hook para asegurarnos de que la clase se actualice al iniciar la aplicación
  onInit() {
    this.updateDarkModeClass();
    // Inicializar en darkmode
  },
});
