<script setup lang="ts">
import {onMounted} from 'vue';
import { useRouter, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/token';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {

  const storedToken = localStorage.getItem('api_key');
  if (storedToken) {
    authStore.setApiKey(storedToken);
  }

  const storedUserName = localStorage.getItem('user_name');
  if (storedUserName) {
    authStore.setUserName(storedUserName);
  }

});


</script>

<template>
  <RouterView />
</template>
