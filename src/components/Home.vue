<template>
  <div>
    <section class="p-4 flex items-center">
      <div>
        <img class="w-24" src="https://m.pogendata.com/img/logo_normal.83efabbf.svg" alt="">
      </div>
      <div class="ml-auto flex space-x-3 items-center">
        <div class="flex items-center space-x-1">
          <span class="font-semibold text-[10px] uppercase tracking-wider">Vista:</span>
          <select class="rounded-full p-1 text-[10px] font-semibold text-red-500 tracking-wider uppercase" name="view" id="">
            <option value="" selected>General</option>
            <option value="">Retail</option>
          </select>
        </div>
        <div class="bg-slate-100 w-11 h-11 rounded-lg p-4 flex items-center justify-center">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </section>
    <section class="p-4 text-slate-700 space-y-4">
      <header class="flex items-center">
        <div>
          <h1 class="text-2xl font-bold">Información general</h1>
          <span class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">13 Diciembre 2023</span>
        </div>
        <div class="ml-auto">
          <div class="bg-slate-100 w-11 h-11 flex items-center justify-center rounded-lg">
            <i class="fa-regular fa-calendar"></i>
          </div>
        </div>
      </header>
      <main>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-slate-100 rounded-lg p-4 space-y-3">
            <div class=" flex items-center font-semibold text-[10px] uppercase">
              <h5>Mayor cantidad de entradas</h5> 
              <span class="text-sm ml-auto">
                <i class="fa-solid fa-chart-simple"></i>
              </span>
            </div>

            <div class="grid grid-cols-4 items-center">
              <div class="col-span-3">
                <p class="text-xs text-slate-400">
                Nombre: 
                <span class="text-slate-700 font-semibold">
                  F Uno
                </span>
                </p>
                <p class="text-xs text-slate-400">
                  Plaza: 
                  <span class="text-slate-700 font-semibold">
                    Centrika
                  </span>
                </p>
              </div>
              <div class="mx-auto">
                <div class="bg-blue-400 rounded-lg p-4 text-white w-11 h-11 flex items-center justify-center">0</div>
              </div>
            </div>
          </div>

          <div class="bg-slate-100 rounded-lg p-4 space-y-3">
            <div class=" flex items-center font-semibold text-[10px] uppercase">
              <h5>Menor cantidad de entradas</h5> 
              <span class="text-sm ml-auto">
                <i class="fa-solid fa-chart-simple"></i>
              </span>
            </div>

            <div class="grid grid-cols-4 items-center">
              <div class="col-span-3">
                <p class="text-xs text-slate-400">
                Nombre: 
                <span class="text-slate-700 font-semibold">
                  F Uno
                </span>
                </p>
                <p class="text-xs text-slate-400">
                  Plaza: 
                  <span class="text-slate-700 font-semibold">
                    Centrika
                  </span>
                </p>
              </div>
              <div class="mx-auto">
                <div class="bg-blue-400 rounded-lg p-4 text-white w-11 h-11 flex items-center justify-center">0</div>
              </div>
            </div>
          </div>

          <div class="bg-slate-100 rounded-lg p-4 space-y-3">
            <div class=" flex items-center font-semibold text-[10px] uppercase">
              <h5>Gran total de entradas</h5> 
              <span class="text-sm ml-auto">
                <i class="fa-solid fa-chart-simple"></i>
              </span>
            </div>

            <div class="grid grid-cols-4 items-center">
              <div class="col-span-3">
                <p class="text-xs text-slate-400">
                Nombre: 
                <span class="text-slate-700 font-semibold">
                  F Uno
                </span>
                </p>
                <p class="text-xs text-slate-400">
                  Plaza: 
                  <span class="text-slate-700 font-semibold">
                    Centrika
                  </span>
                </p>
              </div>
              <div class="mx-auto">
                <div class="bg-blue-400 rounded-lg p-4 text-white w-11 h-11 flex items-center justify-center">0</div>
              </div>
            </div>
          </div>

          <div class="bg-slate-100 rounded-lg p-4 space-y-3">
            <div class=" flex items-center font-semibold text-[10px] uppercase">
              <h5>Promedio general de entradas</h5> 
              <span class="text-sm ml-auto">
                <i class="fa-solid fa-chart-simple"></i>
              </span>
            </div>

            <div class="grid grid-cols-4 items-center">
              <div class="col-span-3">
                <p class="text-xs text-slate-400">
                Nombre: 
                <span class="text-slate-700 font-semibold">
                  F Uno
                </span>
                </p>
                <p class="text-xs text-slate-400">
                  Plaza: 
                  <span class="text-slate-700 font-semibold">
                    Centrika
                  </span>
                </p>
              </div>
              <div class="mx-auto">
                <div class="bg-blue-400 rounded-lg p-4 text-white w-11 h-11 flex items-center justify-center">0</div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </section>
    <div>
      <BottomNav />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BottomNav from './BottomNav.vue';
</script>