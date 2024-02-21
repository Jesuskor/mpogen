<template>
  <div :class="{
  'bg-orange-100': currentStep === 1,
  'bg-emerald-100': currentStep === 2,
  'bg-blue-100': currentStep === 3
}" class=" min-h-screen">
    <div class="h-screen w-full">
      <div class="grid grid-rows-2 h-full">
        <div class="row-span-1 flex items-center justify-center p-4">
          <div v-if="currentStep === 1">
            <img src="@/assets/images/smart-using-touch-id-to-unlock-phone.png" alt="">
          </div>
          <div v-else-if="currentStep === 2">
            <img src="@/assets/images/smart-analytical-data-on-an-open-laptop-1.png" alt="">
          </div>
          <div v-else-if="currentStep === 3">
            <img src="@/assets/images/smart-social-media-marketing-and-metrics.png" alt="">
          </div>
        </div>
        <div class="row-span-1 grid grid-rows-3">
          <div class="row-span-2 p-4 my-auto">
            <div v-if="currentStep === 1">
              <OnboardingStep title="Bienvenido" description="Descripción" />
            </div>
            <div v-else-if="currentStep === 2">
              <OnboardingStep title="OnBoarding #2" description="Estás en el segundo paso" />
            </div>
            <div v-else-if="currentStep === 3">
              <OnboardingStep title="Términos & Condiciones" description=" " />

              <div class="flex items-center justify-center mt-4">
                <input v-model="checkbox" id="checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox" class="ms-2 text-sm font-medium text-slate-400">Estoy de acuerdo con los <button @click="toggleModal" class="text-blue-600 dark:text-blue-500 hover:underline">términos y condiciones</button>.</label>
              </div>

            </div>
          </div>
          <div class="row-span-1 my-auto p-4">
            <div class="flex space-x-2" v-if="currentStep < 3">
              <button v-if="currentStep !== 1" @click="previousStep" :class="{
                'bg-orange-200 text-orange-400': currentStep === 1,
                'bg-emerald-200 text-emerald-400 ': currentStep === 2,
                'bg-blue-200 text-blue-400': currentStep === 3
              }" class="w-full font-semibold rounded-lg py-2 text-center">
                Anterior
              </button>
              <button @click="nextStep" :class="{
                'bg-orange-400': currentStep === 1,
                'bg-emerald-400': currentStep === 2,
                'bg-blue-400': currentStep === 3
              }" class="w-full text-white font-semibold rounded-lg py-2 text-center">
                Siguiente
              </button>
            </div>
            <div v-else>
              <button :disabled="!checkbox" :class="{ 'opacity-50': !checkbox, 'opacity-100': checkbox }" @click="nextStep" class="w-full bg-blue-400 text-white font-semibold rounded-lg py-2 text-center">
                Ir a la aplicación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="fixed inset-0 overflow-y-auto" v-if="showModal">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="toggleModal"></div>
      <div class="relative bg-white w-full max-w-lg min-w-fit rounded-lg shadow-xl p-6 space-y-4">
        <header class="flex w-full">
          <div>
            <div class="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Fecha seleccionada</div>
            <h2 class="text-2xl font-semibold text-slate-600">asd</h2>
          </div>
          <div @click="toggleModal" class="cursor-pointer text-xs text-red-400 ml-auto w-8 h-8 bg-red-400/10 rounded-lg flex items-center justify-center">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </header>
        <main>
          Aqui conenido xd
        </main>
        <footer>
          <button @click="acceptTerms" class="w-full bg-blue-400 text-white font-semibold rounded-lg py-2 text-center">
            Aceptar
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import { useRouter } from 'vue-router';
import OnboardingStep from '@/components/OnboardingStep.vue';
import { useAuthStore } from '@/stores/token';

const authStore = useAuthStore();

const currentStep = ref(1);
const router = useRouter();

const checkbox = ref(false);

const acceptTerms = () => {
  checkbox.value = true
  showModal.value = false
};

// Obtener el valor del checkbox cuando cambie
watch(checkbox, (value) => {
  console.log(value);
});

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value += 1;
  } else {
    // Marcar el onboarding como completado
    authStore.setOnboardingCompleted(true);
    // Guardar el estado del onboarding en el almacenamiento local
    localStorage.setItem('onboarding_completed', 'true');

    if (authStore.onboardingCompleted) {
      // Si el onboarding está completado, redirigir directamente al dashboard
      router.push({ name: 'login' });
    }
  }
};

const showModal = ref(false);
const toggleModal = () => showModal.value = !showModal.value;
</script>

