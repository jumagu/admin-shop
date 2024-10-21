import { shallowMount } from '@vue/test-utils';

import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';

describe('Tests in <ShopLayout />', () => {
  test('Should render router-view, nav-bar and footer correctly', () => {
    const wrapper = shallowMount(ShopLayout, {
      global: {
        stubs: ['router-view'],
      },
    });

    expect(wrapper.findComponent({ name: 'nav-bar' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'my-footer' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'router-view' }).exists()).toBe(true);
  });
});
