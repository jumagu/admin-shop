/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import type { Mock } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { useMutation } from '@tanstack/vue-query';

import { PRODUCTS } from '../../../../../tests/data/products.data';
import type { Size } from '@/modules/products/interfaces/product.interface';
import ProductForm from '@/modules/admin/components/product/ProductForm.vue';

vi.mock('@tanstack/vue-query');
vi.mock('vue-router', async (original) => {
  const originalImpl = await original();
  return {
    ...(originalImpl as any),
    useRouter: vi.fn(),
  };
});

describe('Tests in <ProductForm />', () => {
  const fakeProduct = PRODUCTS[0];

  const mutateSpy = vi.fn();
  (useMutation as Mock).mockReturnValue({
    mutate: mutateSpy,
    isPending: ref(false),
    isSuccess: ref(false),
    isError: ref(false),
    error: ref(null),
    data: ref({ msg: 'created', product: fakeProduct }),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should render a product if prop is defined', () => {
    const wrapper = shallowMount(ProductForm, {
      props: {
        product: fakeProduct,
      },
    });

    const productValues = Object.values(fakeProduct);
    const customInputs = wrapper.findAllComponents({ name: 'CustomInput' });
    const customTextAreas = wrapper.findAllComponents({ name: 'CustomTextarea' });

    expect(customInputs).toHaveLength(4);
    customInputs.forEach((input) => {
      const modelValue = input.props('modelValue');
      expect(productValues).toContain(modelValue);
    });

    expect(customTextAreas).toHaveLength(1);
    customTextAreas.forEach((textarea) => {
      const modelValue = textarea.props('modelValue');
      expect(productValues).toContain(modelValue);
    });

    const sizeButtons = wrapper.findAll('button.p-2.rounded.w-14.flex-grow');

    sizeButtons.forEach((button) => {
      if (fakeProduct.sizes.includes(button.text() as Size)) {
        expect(button.classes()).toContain('bg-blue-500');
      } else {
        expect(button.classes()).toContain('bg-blue-100');
      }
    });
  });

  test('Should trigger the form submission if form values are valid', async () => {
    const wrapper = shallowMount(ProductForm, {
      props: {
        product: fakeProduct,
      },
    });

    const form = wrapper.find('form');
    await form.trigger('submit');

    await new Promise((r) => setTimeout(r, 100));

    expect(mutateSpy).toHaveBeenCalled();
    expect(mutateSpy).toHaveBeenCalledWith(fakeProduct);
  });

  test('Should not trigger the form submission if form values are invalid', async () => {
    const wrapper = shallowMount(ProductForm, {
      props: {
        product: fakeProduct,
      },
    });

    const titleInput = wrapper.findComponent({ name: 'CustomInput' });
    titleInput.vm.$emit('update:modelValue', '');

    const form = wrapper.find('form');
    await form.trigger('submit');

    await new Promise((r) => setTimeout(r, 100));

    console.log(wrapper.html());

    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
