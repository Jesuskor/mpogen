// store.js

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        apiKey: null,
        userName: '', // Nueva propiedad para almacenar el nombre de usuario
        onboardingCompleted: false,
    }),
    actions: {
        setApiKey(apiKey) {
            this.apiKey = apiKey;
        },
        setUserName(userName) {
            this.userName = userName;
        },
        setOnboardingCompleted(onboardingCompleted) {
            this.onboardingCompleted = onboardingCompleted;
        },
        logout() {
            this.apiKey = '';
            this.userName = ''; // También limpiar el nombre de usuario al cerrar sesión
            this.onboardingCompleted = false;
            localStorage.removeItem('api_key');
            localStorage.removeItem('user_name'); // También limpiar el nombre de usuario al cerrar sesión
            localStorage.removeItem('onboarding_completed');
        },
    },
});
