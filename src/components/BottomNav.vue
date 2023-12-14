<!-- BottomMenu.vue -->
<template>
    <div class="fixed bottom-0 left-0 w-full bg-white py-2 px-8 text-slate-700 shadow-top">
      <!-- Contenido del menú aquí -->
      <ul class="flex justify-between items-center">
        <li><a href="#"><i class="hover:text-blue-400 transition-colors fas fa-chart-simple"></i></a></li>
        <li><router-link to="/establishments"><i class="hover:text-blue-400 transition-colors fa-solid fa-building-flag"></i></router-link></li>
        <li class="w-11 h-11 bg-blue-400 rounded-full flex items-center justify-center text-white"><router-link to="/"><i class="hover:text-blue-400 transition-colors fas fa-home"></i></router-link></li>
        <li><a href="#"><i class="hover:text-blue-400 transition-colors fas fa-cog"></i></a></li>
      </ul>
    </div>
  </template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.css';
</script>
  