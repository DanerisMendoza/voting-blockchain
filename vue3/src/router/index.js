import { createRouter, createWebHistory } from '@ionic/vue-router';
import ionic from '@/components/ionic.vue';


const routes = [
    {
        path: '/',
        redirect: '/ionic',
      },
      {
        path: '/ionic',
        component: () => ionic, // Update the path based on your project structure
      },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;