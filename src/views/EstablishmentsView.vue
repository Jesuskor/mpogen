<template>
  <div class="bg-blue-50 dark:bg-dark-800">
    <div class="bg-blue-50 dark:bg-dark-800 max-w-2xl mx-auto min-h-screen">
      <header id="top" class="bg-blue-400 dark:bg-blue-900 p-8">
        <router-link :to="{ name: 'dashboard' }" class="flex items-center space-x-2 text-xs text-slate-800">
          <i class="fa-solid fa-arrow-left-long"></i>
          <p class="font-semibold tracking-wider uppercase">Regresar</p>
        </router-link>
        <h1 class="text-2xl font-semibold text-white">Lista de establecimientos</h1>
      </header>
      <main class="bg-blue-400 dark:bg-blue-900">
        <div class="bg-blue-50 dark:bg-dark-800 rounded-t-3xl p-4 space-y-8">
          <!-- Buscador -->
          <section class="space-y-2">
            <h2 class="uppercase text-[10px] font-semibold tracking-wider text-slate-400 px-1">Buscador</h2>
            <div class="bg-white dark:bg-dark-500 rounded-xl p-4">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-slate-500 dark:bg-dark-200 rounded-lg flex items-center justify-center text-xl text-white">
                  <i class="fa-solid fa-search"></i>
                </div>
                <div class="flex-1">
                  <input v-model="searchTerm" @input="handleSearch" type="text" class="dark:bg-dark-500 dark:text-slate-300 w-full border-none focus:ring-0 focus:outline-none" placeholder="Buscar establecimiento">
                </div>
              </div>
            </div>
          </section>
          <section class="space-y-2">
            <!-- Lista de establecimientos -->
            <h2 class="uppercase text-[10px] font-semibold tracking-wider text-slate-400 px-1">Lista</h2>
            <!---->
            <div class="space-y-2" v-if="loading">
              <div v-for="skeleton in 4" :key="skeleton.index" class="bg-black/5 dark:bg-dark-100/5 p-4 rounded-xl">
                <div class="flex space-x-4 items-center">
                  <div class="w-12 h-12 bg-black/20 dark:bg-dark-600 dark:shadow-none animate-pulse shadow-app-md rounded-lg flex items-center justify-center text-xl text-slate-400"></div>
                  <div class="space-y-2">
                    <div class="w-28 h-3 bg-black/20 dark:bg-dark-600 animate-pulse rounded-lg"></div>
                    <div class="flex space-x-1 items-center">
                      <div class="w-24 h-3 bg-black/10 dark:bg-dark-600 animate-pulse rounded-lg"></div>
                      <div class="w-24 h-3 bg-black/10 dark:bg-dark-600 animate-pulse rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="space-y-2" v-for="plaza in data" :key="plaza.id">
              <router-link :to="{ name: 'details_establishment', params: { id: plaza.id } }">
                <InfoCardColumn
                    badge="fa-solid fa-building"
                    :plaza="plaza.name"
                    statName1="Total"
                    statValue1="460,000"
                    statName2="Objetivo"
                    statValue2="800,000"
                />
              </router-link>
            </div>

<!--            <div>
              &lt;!&ndash; Hover &ndash;&gt;
              <router-link :to="{ name: 'details_establishment', params: { id: 1 } }">
                <div class="bg-blue-100 p-4 rounded-xl">
                  <div class="flex space-x-4">
                    <div class="w-12 h-12 bg-white shadow-app-md rounded-lg flex items-center justify-center text-xl text-blue-400">
                      <i class="fa-solid fa-building"></i>
                    </div>
                    <div class="text-blue-400">
                      <p class="font-semibold">AV - Las Torres</p>
                      <p class="text-sm">Algo más aqui</p>
                    </div>
                  </div>
                </div>
              </router-link>
              &lt;!&ndash; Lista de establecimientos &ndash;&gt;
              <div v-for="item in items" :key="item.id" class="bg-black/5 p-4 rounded-xl">
                <div class="flex space-x-4">
                  <div class="w-12 h-12 bg-white shadow-app-md rounded-lg flex items-center justify-center text-xl text-slate-400">
                    <i class="fa-solid fa-building"></i>
                  </div>
                  <div class="text-slate-600">
                    <p class="font-semibold">AV - Las Torres</p>
                    <p class="text-sm text-slate-400"><strong>Total:</strong>460,000 | <strong>Objetivo: </strong>800,000</p>
                  </div>
                </div>
              </div>
              <div v-for="item in items" :key="item.id" class="bg-black/5 p-4 rounded-xl">
                <div class="flex space-x-4">
                  <div class="w-12 h-12 bg-white shadow-app-md rounded-lg flex items-center justify-center text-xl text-slate-400">
                    <i class="fa-solid fa-building"></i>
                  </div>
                  <div class="text-slate-600 space-y-1">
                    <p class="font-semibold">AV - Las Torres</p>
                    <p class="text-xs space-x-1 text-slate-400">
                            <span class="bg-blue-400 text-white rounded-full px-2 py-1">
                              <strong>Total:</strong>460,000
                            </span>
                      <span class="bg-orange-400 text-white rounded-full px-2 py-1">
                              <strong>Objetivo:</strong>460,000
                            </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>-->

          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import InfoCardColumn from "@/components/InfoCardColumn.vue";

import { useAuthStore } from '@/stores/token';

const authStore = useAuthStore();
const searchTerm = ref('');

const GET_DATA = gql`
  query Plazas($token: String!, $nombrePlaza: String, $salidas: Int) {
    plazas(_token: $token, nombrePlaza: $nombrePlaza, salidas: $salidas) {
      id
      name
      salidas
      accesos {
        name
      }
    }
  }
`;

const storedToken = localStorage.getItem('api_key') || '';
if (storedToken) {
  authStore.setApiKey(storedToken);
}

const { result, loading, onError } = useQuery(GET_DATA, {
  token: authStore.apiKey,
  nombrePlaza: searchTerm.value, // Modificado para usar la variable de búsqueda
  salidas: null,
});

onError((error) => {
  console.error('Error en la consulta:', error);
});

const data = ref(result.value ? result.value.plazas : []);

watchEffect(() => {
  data.value = result.value ? result.value.plazas : [];

  // Filtrar por nombre de plaza
  if (searchTerm.value) {
    data.value = data.value.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    });
  }
});

</script>