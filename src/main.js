import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp, provide, h } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';
import VueApexCharts from "vue3-apexcharts";
import '@vuepic/vue-datepicker/dist/main.css'
import { useDarkMode } from "@/stores/darkMode";

import App from './App.vue'
import router from './router'

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'https://ql.pogendata.com/',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    //headers: { "Authorization": "Bearer S1hzMzA4TTJMaG9yY1E3WGRReFVsSDBWUVMwV3pGRE9FaTZDNG5PSA==" }
})


const app = createApp({
    setup () {
        const apolloClient = new ApolloClient({
            link: httpLink,
            cache,
            //headers: { "Authorization": "Bearer S1hzMzA4TTJMaG9yY1E3WGRReFVsSDBWUVMwV3pGRE9FaTZDNG5PSA==" }
        })

        provide(DefaultApolloClient, apolloClient)
        provideApolloClient(apolloClient)
    },
    render: () => h(App),
})

app.use(createPinia())
const darkModeStore = useDarkMode();
app.provide('darkMode', darkModeStore);
app.use(router)
app.use(VueApexCharts)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
