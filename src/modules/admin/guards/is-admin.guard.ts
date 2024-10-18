import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';

import { useAuthStore } from '@/modules/auth/stores/auth.store';

const isAdminGuard = (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  return !!authStore.isAdmin ? next() : next({ name: 'home', replace: true });
};

export default isAdminGuard;
