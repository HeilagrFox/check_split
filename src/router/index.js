import { createWebHashHistory, createRouter } from 'vue-router'
import Final from "/src/views/Final.vue"
import Users from "/src/views/Users.vue"
import Products from "/src/views/Products.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        { path: '/users', component: Users, alias:'/' },
        { path: '/products', component: Products},
        { path: '/results', component: Final},
     ],
})

export default router
