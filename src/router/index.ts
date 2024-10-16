import { createRouter, createWebHistory } from 'vue-router';

import { authRoutes } from '@/modules/auth/routes';
import { adminRoutes } from '@/modules/admin/routes';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      beforeEnter: async (_, __, next) => {
        const authStore = useAuthStore();
        if (authStore.isChecking) await authStore.startCheckAuth();
        next();
      },
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/shop/views/HomeView.vue'),
        },
      ],
    },
    authRoutes,
    adminRoutes,
  ],
});

export default router;
