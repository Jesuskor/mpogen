<template>
  <div class="bg-blue-50 min-h-screen p-4 text-slate-700 space-y-8 dark:bg-dark-800">
    <div class="max-w-2xl mx-auto">
      <div class="py-4 flex justify-center space-x-4 dark:bg-white/30 p-4 rounded-lg">
        <img src="@/assets/images/logo_normal.83efabbf.svg" alt="Logo" class="w-28">
        <ToggleDarkMode />
      </div>
      <div class="grid grid-cols-2 mt-6 mb-12">
        <div>
          <h1 class="font-light text-4xl dark:text-slate-300">Bienvenido, <span class="font-semibold">{{ authStore.userName }}</span>.</h1>
        </div>
        <div class="flex items-center justify-end">
          <div @click.prevent="handleLogout" class="cursor-pointer bg-slate-500 hover:bg-slate-600 transition-colors dark:bg-dark-500 dark:text-slate-300 rounded-full w-12 h-12 text-white flex items-center justify-center">
            <i class="fa-solid fa-arrow-right-from-bracket animate-bounce"></i>
          </div>
        </div>
      </div>
      <div>
        <h2 class="font-semibold text-[10px] uppercase tracking-wider text-slate-500">Rango de fecha</h2>
        <div class="mt-4 mb-6">
          <div class="w-full">
            <VueDatePicker v-model="date" range :clearable="false" :enable-time-picker="false" dark />
          </div>
        </div>
      </div>
      <div class="flex flex-col min-h-0 space-y-4">
        <h2 class="font-semibold text-[10px] uppercase tracking-wider text-slate-500">
          Información general
        </h2>
        <div class="grid grid-cols-2 gap-2 min-h-0">
          <InfoCard
              title="Mayor cantidad de salidas"
              :content="plazaWithMostEntries.plaza_name"
              :badge="formatTotal(plazaWithMostEntries.total)"
              icon="fa-solid fa-arrow-trend-up"
              color="blue"
              isFirst
          />
          <InfoCard
              title="Menor cantidad de salidas"
              :content="plazaWithLeastEntries.plaza_name"
              :badge="formatTotal(plazaWithLeastEntries.total)"
              icon="fa-solid fa-arrow-trend-down"
              color="blue"
          />
          <InfoCard
              title="Gran total de salidas"
              :content="getTotal"
              badge="Rango establecido"
              icon="fa-solid fa-chart-simple"
              color="orange"
          />
          <InfoCard
              title="Promedio de salidas"
              :content="getPromedio"
              badge="General"
              icon="fa-solid fa-ranking-star"
              color="emerald"
          />
        </div>
        <div class="flex flex-col min-h-0 space-y-4">
          <h2 class="font-semibold text-[10px] uppercase tracking-wider text-slate-500">Gráfica</h2>
          <MenuButton @click="toggleGrafica" name="Comportamiento por fechas" :badge="showChart1 ? 'Ocultar gráfica' : 'Ver gráfica'" icon="fa-solid fa-chart-pie" color="amber" />
          <div v-if="showChart1">
            <div>
              <div v-if="doughnutData.labels.length > 0">
                <div>
                  <DoughnutChart :chartData="doughnutData" />
                </div>
                <!-- Mostrar el porcentaje y el nombre de la plaza-->
                <div class="grid grid-cols-2 gap-2 mt-4">
                  <div v-for="(item, index) in doughnutData.labels" :key="index" class="flex items-center space-x-2">
                    <!-- Mostrar el color que corresponde en el grafico -->
                    <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: doughnutData.datasets[0].backgroundColor[index] }"></div>
                    <p class="text-xs">{{ item }} - {{ doughnutData.datasets[0].data[index] }}%</p>
                  </div>
                </div>
              </div>
              <div v-else class="space-y-2">
                <div class="mt-2 bg-black/20 w-full h-40 rounded-lg animate-pulse"></div>
                <div class="bg-black/5 p-4 rounded-xl">
                  <div class="flex space-x-4 items-center">
                    <div class="w-12 h-12 bg-black/20 animate-pulse shadow-app-md rounded-lg flex items-center justify-center text-xl text-slate-400"></div>
                    <div class="space-y-2">
                      <div class="w-28 h-3 bg-black/20 animate-pulse rounded-lg"></div>
                      <div class="flex space-x-1 items-center">
                        <div class="w-24 h-3 bg-black/10 animate-pulse rounded-lg"></div>
                        <div class="w-24 h-3 bg-black/10 animate-pulse rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 class="font-semibold text-[10px] uppercase tracking-wider text-slate-500">Navegación</h2>
          <router-link :to="{name: 'establishments'}">
            <MenuButton name="Lista de establecimientos" badge="Ver listado" icon="fa-solid fa-city" color="blue" />
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import {useQuery} from "@vue/apollo-composable";
import {ref, watch, watchEffect} from "vue";
import {useAuthStore} from "@/stores/token";
import gql from "graphql-tag";
import InfoCard from "@/components/InfoCard.vue";
import ToggleDarkMode from "@/components/ToggleDarkMode.vue";
import MenuButton from "@/components/MenuButton.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import {useDarkMode} from "@/stores/darkMode";

const route = useRoute();
const authStore = useAuthStore();
const plazaWithMostEntries = ref({ plaza_id: 0, total: 0 });
const plazaWithLeastEntries = ref({ plaza_id: 0, total: 0 });
const getTotal = ref(0);
const getPromedio = ref(0);

const showChart1 = ref(false);

const toggleGrafica = () => {
  showChart1.value = !showChart1.value;
};



// Mostrar en consola el valor del checkbox cuando cambia
const checkbox = ref(false);
watch(checkbox, (value) => {
  variables.value.params.salidas = value ? 1 : 0;
});

////////////// PLAZA DETAILS //////////////////

const GET_PLAZA_DETAILS = gql`
  query Query($token: String!, $idPlaza: Int) {
    plazas(_token: $token, idPlaza: $idPlaza) {
      id
      name
      accesos {
        name
        id
      }
    }
  }
`;

const { result: plazaDetailsResult, loading: plazaDetailsLoading, onError: plazaDetailsOnError } = useQuery(GET_PLAZA_DETAILS, {
  token: authStore.apiKey,
});
// Error handling for second query
plazaDetailsOnError((error) => {
  console.error('Error fetching plaza details:', error);
});
// Access plaza details in your template
const plazaDetails = ref(plazaDetailsResult.value ? plazaDetailsResult.value.plazas : []);

watchEffect(() => {
  plazaDetails.value = plazaDetailsResult.value ? plazaDetailsResult.value.plazas : [];
})


////////////// ACCESOS DETAILS //////////////////

// crear variable startDate y endDate
const today = new Date();
// Restar 2 dias a la fecha actual
today.setDate(today.getDate() - 1);
const startDate = today.toISOString().split('T')[0] + ' 00:00:00';
const endDate = new Date().toISOString().split('T')[0] + ' 23:59:59';

const date = ref([startDate, endDate]);

console.log(date.value);

const GET_ACCESOS_DETAILS = gql`
  query Datos($params: DatosArgs!, $token: String!, $accesoId: Int) {
    datos(params: $params, _token: $token, accesoId: $accesoId) {
      plaza_id
      acceso_id
      entradas
      fecha
    },
  }
`;

const variables = ref({
  params: {
    tipo: "days",
    salidas: 1,
    agrupar: true,
    orden: "desc",
    inicio: date.value[0],
    fin: date.value[1],
  },
  token: authStore.apiKey,
});

const { result: accesosDetailsResult, loading: accesosDetailsLoading, onError: accesosDetailsOnError } = useQuery(GET_ACCESOS_DETAILS, variables);

// Error handling for second query
accesosDetailsOnError((error) => {
  console.error('Error fetching plaza details:', error);
});

// Access plaza details in your template
const accesosDetails = ref(accesosDetailsResult.value ? accesosDetailsResult.value.datos : []);

// Funcion para formatear la fecha a formato: "YYYY-MM-DD 00:00:00"
const formatDate = (date: string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day} 00:00:00`;
};

watch(() => date.value, (value) => {
  variables.value.params.inicio = formatDate(value[0]);
  variables.value.params.fin = formatDate(value[1]);
});

// Funcion para agrupar los accesos por plaza_id y sumar las entradas de cada plaza para obtener el promedio
const groupByPlaza = (data: any[]) => {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.plaza_id]) {
      acc[item.plaza_id] = {
        plaza_id: item.plaza_id,
        plaza_name: getPlazaName(item.plaza_id),
        total: 0,
      };
    }
    acc[item.plaza_id].total += Number(item.entradas);
    return acc;
  }, {});

  return Object.values(grouped);
};

// Funcion para obtener el nombre de la plaza con el id
const getPlazaName = (id: number) => {
  const plaza = plazaDetails.value.find((item) => item.id === id);
  return plaza ? plaza.name : '';
};

// Funcion para obtener la informacion de la plaza con mayor numero de entradas
const getPlazaInfo = (data: any[], comparator: (a: number, b: number) => boolean) => {
  return data.reduce((acc, item) => {
    if (comparator(item.total, acc.total)) {
      return {
        ...item,
        plaza_name: getPlazaName(item.plaza_id),
      };
    }
    return acc;
  }, { plaza_id: 0, total: 0 });
};

const getPlazaWithMostEntries = (data: any[]) => {
  return getPlazaInfo(data, (a, b) => a > b);
};

const getPlazaWithLeastEntries = (data: any[]) => {
  return getPlazaInfo(data, (a, b) => a < b || b === 0);
};

const formatTotal = (total: number) => {
  return total.toLocaleString();
};

// Funcion para obtener el gran total de salidas
const getTotalEntradas = (data: any[]) => {
  return formatTotal(data.reduce((acc, item) => acc + Number(item.total), 0));
};

// Funcion para obtener el promedio general de salidas
const getPromedioEntradas = (data: any[]) => {
  const total = data.reduce((acc, item) => acc + Number(item.total), 0);
  return formatTotal(total / data.length);
};

const doughnutData = ref({
  labels: [],
  datasets: [],
  options: {},
});

const doughnutColors = [
  '#451a03',
  '#78350f',
  '#92400e',
  '#b45309',
  '#d97706',
  '#f59e0b',
  '#fbbf24',
  '#fcd34d',
  '#fde68a',
  '#fef3c7',
];

// Generar 30 tonalidades adicionales
for (let i = 0; i < 3; i++) {
  doughnutColors.push(
      ...doughnutColors.map((color) => {
        const rgb = parseInt(color.slice(1), 16); // Convertir el color hexadecimal a decimal
        const r = (rgb >> 16) & 0xff; // Obtener el componente rojo
        const g = (rgb >> 8) & 0xff; // Obtener el componente verde
        const b = (rgb >> 0) & 0xff; // Obtener el componente azul

        // Aplicar una pequeña variación a cada componente
        const variation = 10;
        const newR = Math.max(0, Math.min(255, r + Math.floor(Math.random() * variation) - variation / 2));
        const newG = Math.max(0, Math.min(255, g + Math.floor(Math.random() * variation) - variation / 2));
        const newB = Math.max(0, Math.min(255, b + Math.floor(Math.random() * variation) - variation / 2));

        // Convertir los nuevos componentes a formato hexadecimal y devolver el color
        return `#${(1 << 24 | newR << 16 | newG << 8 | newB).toString(16).slice(1)}`;
      })
  );
}

watchEffect(() => {
  const { darkMode } = useDarkMode();

  // Actualizamos los datos
  accesosDetails.value = accesosDetailsResult.value ? accesosDetailsResult.value.datos : [];
  // Agrupamos los datos por plaza_id
  const groupedByPlazaID = groupByPlaza(accesosDetails.value);

  const totalEntradas = Number(getTotalEntradas(groupedByPlazaID).replace(/,/g, ''));

  // Map groupByPlazaID get porcentaje
  const porcentaje = groupedByPlazaID.map((item) => {
    return {
      ...item,
      porcentaje: (Number(item.total) / totalEntradas * 100).toFixed(2),
    };
  });

  // Doughnut chart data
  doughnutData.value = {
    labels: porcentaje.map((item) => item.plaza_name),
    datasets: [
      {
        label: 'Porcentaje de salidas',
        data: porcentaje.map((item) => item.porcentaje),
        backgroundColor: doughnutColors,
        hoverBackgroundColor: doughnutColors,
        borderColor: [darkMode ? '#161A1D' : '#eff6ff']
      },
    ],
    options: {
      legend: {
        display: false, // Esta opción oculta la leyenda con los labels
      },
    },
  };

  if (groupedByPlazaID.length > 0) {
    // Obtenemos la plaza con mayor numero de entradas
    plazaWithMostEntries.value = getPlazaWithMostEntries(groupedByPlazaID);
    // Obtenemos la plaza con menor numero de entradas
    plazaWithLeastEntries.value = getPlazaWithLeastEntries(groupedByPlazaID);
    getTotal.value = getTotalEntradas(groupedByPlazaID);
    // Obtenemos el promedio general de salidas
    getPromedio.value = getPromedioEntradas(groupedByPlazaID);
  }
})

////////////////////////////////

// Cerrar sesion
const handleLogout = () => {
  authStore.logout();
  // Rederigir al login sin el router
  window.location.href = '/';
};
</script>