import { defineStore } from "pinia";

export const useOnBoardingStore = defineStore("onBoardingScreen", {
    state: () => ({
        onBoardingScreen: false,
    }),
    actions: {
        setOnBoardingScreen(onBoardingScreen) {
        this.onBoardingScreen = onBoardingScreen;
        },
    },
});