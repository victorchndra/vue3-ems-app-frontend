import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ListEmployeeComponent from "./components/ListEmployeeComponent.vue"
import EmployeeComponent from "./components/EmployeeComponent.vue"

const routes = [
    {
        path: '/',
        component: ListEmployeeComponent
    },
    {
        path: '/employees',
        component: ListEmployeeComponent
    },
    {
        path: '/add-employee',
        component: EmployeeComponent
    },
    {
        path: '/edit-employee/:id',
        component: EmployeeComponent
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

createApp(App).use(router).mount('#app')
