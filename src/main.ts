import { createApp } from 'vue'
import './index.css'
import { createRouter, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import Home from '../src/components/Home.vue'
import Establishments from '../src/components/Establishments.vue'

const routes = [
    {
        path: '/', component: Home,
    },
    {
        path: '/establishments', component: Establishments,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
