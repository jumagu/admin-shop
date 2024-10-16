import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';

import { useAuthStore } from '../stores/auth.store';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  if (authStore.isChecking) await authStore.startCheckAuth();
  return authStore.isAuthenticated ? next() : next({ name: 'login', replace: true });
};

export default isAuthenticatedGuard;
