import type { Mock } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { createRouter, createWebHashHistory } from 'vue-router';

import { PRODUCTS } from '../../../../tests/data/products.data';
import ProductsView from '@/modules/admin/views/ProductsView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      component: ProductsView,
    },
  ],
});

vi.mock('@tanstack/vue-query', () => ({
  useQueryClient: vi.fn().mockReturnValue({
    prefetchQuery: vi.fn(),
  }),
  useQuery: vi.fn(),
}));

describe('Tests in <ProductView />', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  (useQuery as Mock).mockReturnValue({
    data: PRODUCTS,
    error: null,
    isLoading: false,
  });

  window.scrollTo = vi.fn();

  const wrapper = shallowMount(ProductsView, {
    global: {
      plugins: [router],
      stubs: ['router-link'],
    },
  });

  test('Should be rendered with default values', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Should prefetch query onMounted', async () => {
    await router.replace('/?page=2');

    expect(useQueryClient().prefetchQuery).toHaveBeenCalledTimes(3);
    expect(useQueryClient().prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['products', { page: 3 }],
      queryFn: expect.any(Function),
      staleTime: 1000 * 60,
    });
    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
    });
  });
});
