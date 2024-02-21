<template>
  <div class="bg-blue-50 dark:bg-dark-800">
    <div class="bg-blue-50 dark:bg-dark-800 max-w-2xl mx-auto min-h-screen">
      <header id="top" class="bg-blue-400 dark:bg-blue-900 p-8">
        <router-link :to="{ name: 'establishments' }" class="flex items-center space-x-2 text-xs text-slate-800 dark:text-slate-400">
          <i class="fa-solid fa-arrow-left-long"></i>
          <p class="font-semibold tracking-wider uppercase">Regresar</p>
        </router-link>
        <h1 class="text-2xl font-semibold text-white dark:text-slate-300">Details Establishment | {{ id }}</h1>
      </header>
      <main class="bg-blue-400 dark:bg-blue-900">
        <div class="bg-blue-50 dark:bg-dark-800 rounded-t-3xl p-4 space-y-8">
          <!-- Rango de fechas -->
          <div>
            <h2 class="font-semibold text-[10px] uppercase tracking-wider text-slate-500">Rango de fecha</h2>
            <div class="mt-4 mb-6 w-full">
              <VueDatePicker v-model="date" range :clearable="false" :enable-time-picker="false" />
            </div>
          </div>
          <!-- Informacion general -->
          <section class="flex flex-col min-h-0 space-y-4">
            <div class="flex items-center w-full">
              <!-- Sección -->
              <h2 class="font-semibold text-[10px] uppercase tracking-wider text-slate-500">
                Información general
              </h2>
              <!-- Toggle -->
              <div class="ml-auto">
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-[10px] uppercase tracking-wider text-slate-400 mr-2">Entradas</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="checkbox" type="checkbox" value="" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 dark:bg-dark-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-slate-100 after:border-gray-300 dark:after:border-gray-100 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400 dark:peer-checked:bg-blue-900"></div>
                    <span class="font-semibold text-[10px] uppercase tracking-wider text-slate-400 ms-2">Salidas</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 min-h-0">
              <InfoCard
                  title="Acceso con mayor flujo"
                  :content="plazaWithMostEntries.access_name"
                  :badge="formatTotal(plazaWithMostEntries.total)"
                  icon="fa-solid fa-arrow-trend-up"
                  color="blue"
                  isFirst
              />
              <InfoCard
                  title="Acceso con menor flujo"
                  :content="plazaWithLeastEntries.access_name"
                  :badge="formatTotal(plazaWithLeastEntries.total)"
                  icon="fa-solid fa-arrow-trend-down"
                  color="blue"
              />
              <InfoCard
                  :title="checkbox ? 'Fecha de mayor salidas' : 'Fecha de mayor entradas'"
                  :content="dateWithMostEntries.total"
                  :badge="dateWithMostEntries.date"
                  icon="fa-solid fa-chart-simple"
                  color="blue"
              />
              <InfoCard
                  :title="checkbox ? 'Fecha de menor salidas' : 'Fecha de menor entradas'"
                  :content="dateWithLeastEntries.total"
                  :badge="dateWithLeastEntries.date"
                  icon="fa-solid fa-ranking-star"
                  color="blue"
              />
            </div>
          </section>
          <!-- Navegación -->
          <section class="space-y-2">
            <h2 class="font-semibold text-[10px] uppercase tracking-wider text-slate-500">Gráficas</h2>
            <div>
              <MenuButton @click="toggleGrafica(1)" name="Comportamiento por fechas" :badge="showChart1 ? 'Ocultar gráfica' : 'Ver gráfica'" icon="fa-solid fa-calendar-days" color="blue" />
              <div v-if="showChart1">
                <!-- Gráfica -->
                <div>
                  <div v-if="chartData.labels.length > 0">
                    <Line :data="chartData" :options="chartOptions" />
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
                <!-- CardColumn -->
                <div class="space-y-2 my-2">
                  <div v-for="(item, index) in groupedByDate" :key="index">
                    <InfoCardColumn
                        @click="openModal(index)"
                        :badge="index+1"
                        :plaza="item.fecha"
                        :statName1="checkbox ? 'Salidas' : 'Entradas'"
                        :statValue1="formatTotal(item.entradas)"
                        statName2="Objetivo"
                        statValue2="800,000"
                    />

                    <!-- Modal para mostrar los detalles de los accesos -->
                    <Modal2 :accessData="item" :checkbox="checkbox" :isOpen="modalOpen && currentModalIndex === index" @update:isOpen="handleModalState" />

                  </div>
                </div>
              </div>

            </div>
            <div>
              <MenuButton @click="toggleGrafica(2)" name="Distribución por accesos" :badge="showChart2 ? 'Ocultar gráfica' : 'Ver gráfica'" icon="fa-solid fa-map-location-dot" color="amber" />
              <div v-if="showChart2">
                <!-- Gráfica Doughtnut -->
                <div>
                  <div v-if="doughnutData.labels.length > 0">
                    <DoughnutChart :chartData="doughnutData" />
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
                <!-- CardColumn -->
                <div class="space-y-2 my-2">
                  <div v-for="(item, index) in groupedByAccessID" :key="index">
                    <InfoCardColumn
                        @click="openModal(index)"
                        :badge="index+1"
                        :plaza="getAccessName(item.acceso_id)"
                        :statName1="checkbox ? 'Salidas' : 'Entradas'"
                        :statValue1="formatTotal(item.total)"
                        :color="doughnutColors[index]"
                    />
                    <!-- Modal -->
                    <Modal2 :accessData="item" :checkbox="checkbox" :isOpen="modalOpen && currentModalIndex === index" @update:isOpen="handleModalState" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <MenuButton @click="toggleGrafica(3)" name="Temperatura semanal" :badge="showChart3 ? 'Ocultar gráfica' : 'Ver gráfica'" icon="fa-solid fa-fire" color="red" />
              <div v-if="showChart3">
                <div class="h-fit">
                  <apexchart type="heatmap" :options="heatmapOptions" :series="series" height="350" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
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
import MenuButton from "@/components/MenuButton.vue";

import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import InfoCardColumn from "@/components/InfoCardColumn.vue";
import Modal2 from "@/components/Modal2.vue";
import { useDarkMode } from "@/stores/darkMode";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mostrar en consola el valor de darkmode
const { darkMode } = useDarkMode();
console.log('darkMode', darkMode);

const route = useRoute();
const id = route.params.id;
const authStore = useAuthStore();
const plazaWithMostEntries = ref({ plaza_id: 0, total: 0 });
const plazaWithLeastEntries = ref({ plaza_id: 0, total: 0 });
const showChart1 = ref(false);
const showChart2 = ref(false);
const showChart3 = ref(false);

const modalOpen = ref(false);
const currentModalIndex = ref(0); // Índice del modal que se debe abrir

const openModal = (index) => {
  currentModalIndex.value = index;
  modalOpen.value = true;
}

const handleModalState = (newState) => {
  modalOpen.value = newState;
}


// Toogle para mostrar las graficas
const toggleGrafica = (chart: number) => {
  if (chart === 1) {
    showChart1.value = !showChart1.value;
    showChart2.value = false;
    showChart3.value = false;
  }
  if (chart === 2) {
    showChart2.value = !showChart2.value;
    showChart1.value = false;
    showChart3.value = false;
  }
  if (chart === 3) {
    showChart3.value = !showChart3.value;
    showChart1.value = false;
    showChart2.value = false;
  }
};

// Mostrar en consola el valor del checkbox cuando cambia
const checkbox = ref(false);
watch(checkbox, (value) => {
  variables.value.params.salidas = value ? 1 : 0;
  variables2.value.params.salidas = value ? 1 : 0;
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

const dateWithLeastEntries = ref({})
const dateWithMostEntries = ref({})

// crear variable startDate y endDate
const today = new Date();
// Restar 2 dias a la fecha actual
today.setDate(today.getDate() - 2);
const startDate = today.toISOString().split('T')[0] + ' 00:00:00';
const endDate = today.toISOString().split('T')[0] + ' 23:59:59';
//const date = ref([startDate, endDate]);
const date = ref(["2024-02-11 00:00:00", "2024-02-13 23:59:59"]);

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
    id: id,
    tipo: "days",
    salidas: 0,
    orden: "asc",
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
  variables2.value.params.inicio = formatDate(value[0]);
  variables2.value.params.fin = formatDate(value[1]);
});

// Funcion para agrupar los los accesos por acceso_id y sumar las entradas
const groupByAccess = (data: any[]) => {
  return data.reduce((acc, item) => {
    const index = acc.findIndex((i) => i.acceso_id === item.acceso_id);
    if (index === -1) {
      acc.push({
        acceso_id: item.acceso_id,
        access_name: getAccessName(item.acceso_id),
        total: Number(item.entradas),
        // Agregar las fechas que conforman el acceso y el total de entradas, agregar tambien el nombre del acceso
        dates: data.filter((i) => i.acceso_id === item.acceso_id).map((i) => ({
          date: i.fecha,
          entradas: Number(i.entradas),
        })),
      });
    } else {
      acc[index].total += Number(item.entradas);
    }
    return acc;
  }, []);
};

// Funcion para obtener el nombre del acceso con el acceso_id
const getAccessName = accesoId => {
  const plaza = plazaDetails.value.find(plaza => plaza.accesos.some(acceso => acceso.id === accesoId));
  const acceso = plaza ? plaza.accesos.find(acceso => acceso.id === accesoId) : null;
  return acceso ? acceso.name : 'Nombre no encontrado';
};

// Funcion para obtener la informacion de la plaza con mayor numero de entradas
const getAccesoInfo = (data: any[], comparator: (a: number, b: number) => boolean) => {
  return data.reduce((acc, item) => {
    if (comparator(item.total, acc.total)) {
      return {
        ...item,
        access_name: getAccessName(item.acceso_id),
      };
    }
    return acc;
  }, { acceso_id: 0, total: 0 });
};

const getPlazaWithMostEntries = (data: any[]) => {
  return getAccesoInfo(data, (a, b) => a > b);
};

const getPlazaWithLeastEntries = (data: any[]) => {
  return getAccesoInfo(data, (a, b) => a < b || b === 0);
};

const formatTotal = (total: number) => {
  return total.toLocaleString('es-MX')
};


// Funcion para agrupar por fecha y poder usarlo en la grafica
const groupByDate = (data: any[]) => {
  const grouped = data.reduce((acc, item) => {
    const key = `${item.fecha}`;
    if (!acc[key]) {
      acc[key] = {
        fecha: item.fecha,
        entradas: 0,
        // Mostrar los accesos junto con su nombre y el total de entradas
        accesos: data.filter((i) => i.fecha === item.fecha).map((i) => ({
          access_name: getAccessName(i.acceso_id),
          entradas: Number(i.entradas),
        })),
      };
    }
    acc[key].entradas += Number(item.entradas);
    return acc;
  }, {});
  return Object.values(grouped);
};

// Funcion para obtener la informacion de la fecha con mayor numero de entradas
const getDateWithMostEntries = (data: any[]) => {
  return data.reduce((acc, item) => {
    if (item.entradas > acc.total) {
      return {
        date: item.fecha,
        total: item.entradas,
      };
    }
    return acc;
  }, { date: '', total: 0 });
};

// Funcion para obtener la informacion de la fecha con menor numero de entradas
const getDateWithLeastEntries = (data: any[]) => {
  return data.reduce((acc, item) => {
    if (item.entradas < acc.total || acc.total === 0) {
      return {
        date: item.fecha,
        total: item.entradas,
      };
    }
    return acc;
  }, { date: '', total: 0 });
};

const groupedByDate = ref([]);
const chartData = ref({
  labels: [],
  datasets: [],
});
const doughnutData = ref({
  labels: [],
  datasets: [],
});
const chartOptions = ref({});
const groupedByAccessID = ref({});
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
const heatmapOptions = ref({});
const heatmapSeries = ref([]);
const series = ref([]);

watchEffect(() => {
  // Actualizamos los datos
  accesosDetails.value = accesosDetailsResult.value ? accesosDetailsResult.value.datos : [];
  // Agrupamos los datos por plaza_id
  groupedByAccessID.value = groupByAccess(accesosDetails.value);
  console.log('groupedByAccessID', groupedByAccessID.value)

  // Agrupa los datos por fecha
  groupedByDate.value = groupByDate(accesosDetails.value);

  if (groupedByAccessID.value.length > 0) {
    // Obtenemos la plaza con mayor numero de entradas
    plazaWithMostEntries.value = getPlazaWithMostEntries(groupedByAccessID.value);
    // Obtenemos la plaza con menor numero de entradas
    plazaWithLeastEntries.value = getPlazaWithLeastEntries(groupedByAccessID.value);
    // Obtener la fecha con mayor numero de salidas
    dateWithMostEntries.value = getDateWithMostEntries(groupedByDate.value);
    // Obtener la fecha con menor numero de salidas
    dateWithLeastEntries.value = getDateWithLeastEntries(groupedByDate.value);
  }

  console.log('groupedByDate', groupedByDate.value)

  // Graficamos los datos
  chartData.value = {
    labels: groupedByDate.value.map((item: any) => item.fecha),
    datasets: [
      {
        label: 'Entradas',
        data: groupedByDate.value.map((item: any) => item.entradas),
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // ChartOptions
  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.4,
  };

  // Doughnut Chart

  doughnutData.value = {
    labels: groupedByAccessID.value.map((item: any) => getAccessName(item.acceso_id)),
    datasets: [
      {
        label: 'Entradas',
        data: groupedByAccessID.value.map((item: any) => item.total),
        backgroundColor: doughnutColors,
        borderColor: 'transparent',
        borderWidth: 1,
      },
    ],
  };

})

//////// Grafica de temperatura ////////

const GET_HOURS_DETAILS = gql`
  query Datos($params: DatosArgs!, $token: String!, $accesoId: Int) {
    datos(params: $params, _token: $token, accesoId: $accesoId) {
      plaza_id
      acceso_id
      entradas
      fecha
    },
  }
`;

const variables2 = ref({
  params: {
    id: id,
    tipo: "hours",
    agrupar: true,
    salidas: 0,
    orden: "asc",
    inicio: date.value[0],
    fin: date.value[1],
  },
  token: authStore.apiKey,
});

const { result: accesosDetailsResult2, loading: accesosDetailsLoading2, onError: accesosDetailsOnError2 } = useQuery(GET_HOURS_DETAILS, variables2);

// Error handling for second query
accesosDetailsOnError2((error) => {
  console.error('Error fetching plaza details:', error);
});

// Access plaza details in your template
const accesosDetails2 = ref(accesosDetailsResult2.value ? accesosDetailsResult2.value.datos : []);

// Si darkmode es true, cambiar el color de la grafica
const color = darkMode ? '#dc2626' : '#3b82f6';

watchEffect(() => {
  accesosDetails2.value = accesosDetailsResult2.value ? accesosDetailsResult2.value.datos : [];
  // Obtener la sumatoria de las entradas
  const sumatoriaEntradas = accesosDetails2.value.reduce((acc, item) => acc + Number(item.entradas), 0);

  // Convertir en array de objetos con la fecha y el total de entradas
  const data = accesosDetails2.value.map((item: any) => ({
    fecha: item.fecha,
    entradas: Number(item.entradas),
    // Obtener el porcentaje de entradas con solo dos decimales
    porcentaje: ((Number(item.entradas) / sumatoriaEntradas) * 100).toFixed(2),
  }));

  // AGrupar por día de la semana (lunes, martes, ...) y por hora
  const groupedByDay = data.reduce((acc, item) => {
    const date = new Date(item.fecha);
    const day = date.toLocaleString('es-MX', { weekday: 'long' });
    const hour = date.getHours();
    if (!acc[day]) {
      acc[day] = {
        [hour]: {
          entradas: item.entradas,
          porcentaje: item.porcentaje,
        },
      };
    } else {
      if (!acc[day][hour]) {
        acc[day][hour] = {
          entradas: item.entradas,
          porcentaje: item.porcentaje,
        };
      } else {
        acc[day][hour].entradas += item.entradas;
        acc[day][hour].porcentaje = ((acc[day][hour].entradas / sumatoriaEntradas) * 100).toFixed(2);
      }
    }
    return acc;
  }, {});

  console.log('groupedByDay', groupedByDay);

  // Agrupar por hora
  const groupedByHour = Object.keys(groupedByDay).reduce((acc, day) => {
    const hours = Object.keys(groupedByDay[day]);
    hours.forEach((hour) => {
      if (!acc[hour]) {
        acc[hour] = {
          [day]: {
            entradas: groupedByDay[day][hour].entradas,
            porcentaje: groupedByDay[day][hour].porcentaje,
          },
        };
      } else {
        if (!acc[hour][day]) {
          acc[hour][day] = {
            entradas: groupedByDay[day][hour].entradas,
            porcentaje: groupedByDay[day][hour].porcentaje,
          };
        } else {
          acc[hour][day].entradas += groupedByDay[day][hour].entradas;
          acc[hour][day].porcentaje = ((acc[hour][day].entradas / sumatoriaEntradas) * 100).toFixed(2);
        }
      }
    });
    return acc;
  }, {});

  console.log('groupedByHour', groupedByHour);

  // Formatear los datos para obtener { name: '6 PM', data: [35, 45, 50, 55, 60, 100, 20] },
  series.value = Object.keys(groupedByHour).map((hour) => {
    return {
      name: `${hour} PM`,
      data: Object.keys(groupedByHour[hour]).map((day) => groupedByHour[hour][day].porcentaje),
    };
  });

  // Limitar de 9 a 20 horas
  series.value = series.value.slice(9, 20);
  // Invertir el array
  series.value = series.value.reverse();

  console.log('series', series.value);



  heatmapOptions.value ={
    chart: {
      id: 'heatmap-chart',
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: [darkMode ? '#161A1D' : '#eff6ff'],
      },
    },
    stroke: {
      show: true,
      colors: [darkMode ? '#161A1D' : '#eff6ff'],
    },
    colors: ["#dc2626"],
    xaxis: {
      type: 'category',
      categories: ['Domin', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
      labels: {
        style: {
          colors: darkMode ? '#596773' : '#94a3b8',
        },
      },
    },
    yaxis: {
      type: 'category',
      categories: ['6 PM', '5 PM', '4 PM', '3 PM', '2 PM', '1 PM', '12 PM', '11 AM', '10 AM', '9 AM'],
      labels: {
        style: {
          colors: darkMode ? '#596773' : '#94a3b8',
        },
      },
    }
  };

})

</script>