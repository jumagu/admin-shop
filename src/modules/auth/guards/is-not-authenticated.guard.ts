import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';

import { useAuthStore } from '../stores/auth.store';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  if (authStore.isChecking) await authStore.startCheckAuth();
  return authStore.isUnauthenticated ? next() : next({ name: 'home', replace: true });
};

export default isNotAuthenticatedGuard;
