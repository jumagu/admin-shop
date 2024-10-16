import type { RouteRecordRaw } from 'vue-router';
import isAdminGuard from '../guards/is-admin.guard';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAdminGuard],
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
  children: [],
};
