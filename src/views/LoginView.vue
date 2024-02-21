<template>
  <div class="bg-blue-50">
    <div class="max-w-2xl mx-auto bg-blue-400 h-screen flex flex-col">
    <header class="h-1/3 flex items-center justify-center">
      <img src="@/assets/images/logo_normal.83efabbf.svg" class="w-1/2">
    </header>
    <main class="bg-blue-50 rounded-t-3xl flex-grow p-4 text-slate-600">
      <form @submit.prevent="validate" class="w-full mx-auto max-w-md space-y-8 flex flex-col items-center">
        <div class="w-full">
          <div class="mb-4">
            <label for="username" class="font-semibold text-[10px] uppercase tracking-wider text-slate-400">Username</label>
            <div class="relative">
              <div class="text-slate-400 absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <i class="fa-solid fa-user"></i>
              </div>
              <input v-model="username" type="email" id="username" class="ps-12 bg-gray-50 w-full rounded-xl p-4" placeholder="username">
              <span v-if="submitPressed && !username" class="text-red-500 text-xs">El nombre de usuario es obligatorio</span>
            </div>
          </div>
          <div class="mb-4">
            <label for="password" class="font-semibold text-[10px] uppercase tracking-wider text-slate-400">Password</label>            
            <div class="relative">
              <div class="text-slate-400 absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <i class="fa-solid fa-lock"></i>
              </div>
              <input v-model="password" type="password" id="password" class="ps-12 bg-gray-50 w-full rounded-xl p-4" placeholder="**********">
              <span v-if="submitPressed && !password" class="text-red-500 text-xs">La contraseña es obligatoria</span>
            </div>
          </div>

        </div>

        <!-- Submit -->
        <button type="submit" class="w-full py-4 bg-slate-500 hover:bg-blue-600 rounded-lg text-white text-sm transition-all duration-300 ease-in-out focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
          <span class="font-medium">Iniciar sesión</span>
        </button>
      </form>

      <div class="w-full text-center mt-4">
        <a class="text-slate-400 font-semibold tracking-wider uppercase text-xs text-center" href="#">Recuperar contraseña</a>
      </div>

    </main>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useAuthStore } from '@/stores/token';
import {ref, watchEffect} from "vue";

const authStore = useAuthStore();

// Verifica si el onboarding está completado en el almacen local
const onboardingCompleted = localStorage.getItem('onboarding_completed');
if (!onboardingCompleted) {
  // Si el onboarding está completado, redirigir directamente al dashboard
  router.push({ name: 'onboarding' });
}

// Verificar si existe token en almacen local
const api_key = localStorage.getItem('api_key');
if (api_key) {
  // Si existe token, redirigir directamente al dashboard
  router.push({ name: 'dashboard' });
}

const username = ref('');
const password = ref('');
const submitPressed = ref(false);

// Define tu consulta GraphQL
const GET_LOGIN = gql`
  query Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      api_key
      name
    }
  }
`;

const { result, loading, error } = useQuery(GET_LOGIN, {
  username: username,
  password: password,
});

// Accede directamente a result.value.plazas
const data = ref(result.value ? result.value.login : []);

const validate = () => {

  submitPressed.value = true;
  // Validar campos no vacíos
  if (!username.value || !password.value) {
    // Mostrar mensajes de error si los campos están vacíos
    if (!username.value) {
      // Puedes personalizar el mensaje de error según tus necesidades
      console.log("El nombre de usuario es obligatorio");
    }
    if (!password.value) {
      // Puedes personalizar el mensaje de error según tus necesidades
      console.log("La contraseña es obligatoria");
    }
    return;
  }

  if (result.value) {
    if (result.value && result.value.login.api_key) {
      authStore.setApiKey(result.value.login.api_key);
      authStore.setUserName(result.value.login.name); // Actualiza el nombre de usuario en el estado
      localStorage.setItem('api_key', result.value.login.api_key);
      localStorage.setItem('user_name', result.value.login.name); // Actualiza el nombre de usuario en el localStorage
      // redirigir a dashboard sin usar router.push
      router.push({ name: 'dashboard' });
    }
    data.value = result.value ? result.value.login : [];
    //console.log(data.value.api_key);
  }
};

</script>
