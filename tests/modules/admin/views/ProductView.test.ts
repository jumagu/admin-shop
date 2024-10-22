/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import type { Mock } from 'vitest';
import { useQuery } from '@tanstack/vue-query';
import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory, useRouter } from 'vue-router';

import ProductView from '@/modules/admin/views/ProductView.vue';

vi.mock('@tanstack/vue-query');
vi.mock('vue-router', async (original) => {
  const originalImpl = await original();
  return {
    ...(originalImpl as any),
    useRouter: vi.fn(),
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: ProductView,
    },
  ],
});

describe('Tests in <ProductView />', () => {
  const replaceSpy = vi.fn();

  (useQuery as Mock).mockReturnValue({
    data: ref(undefined),
    refetch: vi.fn(),
    isError: ref(true),
    isLoading: ref(false),
  });

  (useRouter as Mock).mockReturnValue({
    replace: replaceSpy,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should redirect to /admin/products if product id is not found', () => {
    shallowMount(ProductView, {
      props: {
        id: 'ABC-123',
      },
      global: {
        plugins: [router],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/admin/products');
  });
});
