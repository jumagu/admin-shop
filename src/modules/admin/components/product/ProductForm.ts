import { watch, defineComponent, type PropType, ref } from 'vue';
import { useForm, useFieldArray } from 'vee-validate';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

import * as yup from 'yup';

import { createUpdateProduct } from '@/modules/products/actions';
import CustomInput from '@/modules/common/components/ui/CustomInput.vue';
import CustomSelect from '@/modules/common/components/ui/CustomSelect.vue';
import CustomTextarea from '@/modules/common/components/ui/CustomTextarea.vue';
import type { Product } from '../../../products/interfaces/product.interface';

const validationSchema = yup.object({
  title: yup.string().trim().min(5).required(),
  slug: yup.string().trim().min(5).required(),
  description: yup.string().trim().min(20).required(),
  price: yup.number().min(0).required(),
  stock: yup.number().min(1).required(),
  gender: yup.string().required().oneOf(['men', 'women', 'kid', 'unisex']),
});

export default defineComponent({
  props: {
    product: Object as PropType<Product | null>,
  },

  setup(props) {
    const router = useRouter();
    const toast = useToast();

    const {
      mutate,
      isPending,
      isSuccess,
      isError,
      error,
      data: mutatedProduct,
    } = useMutation({
      mutationFn: createUpdateProduct,
    });

    // Form refs
    const { defineField, errors, handleSubmit, resetForm } = useForm({
      validationSchema,
      initialValues: props.product ? props.product : { sizes: [], images: [] },
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: sizes, push: pushSize, remove: removeSize } = useFieldArray<string>('sizes');
    const { fields: images } = useFieldArray<string>('images');
    const imageFiles = ref<File[]>([]);

    const hasSize = (size: string) => sizes.value.map((s) => s.value).includes(size);

    const selectSizeHandler = (size: string) => {
      const actualSizes = sizes.value.map((s) => s.value);
      const hasSize = actualSizes.includes(size);

      if (hasSize) {
        removeSize(actualSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const submitHandler = handleSubmit((values) => {
      const formValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };
      mutate(formValues);
    });

    const fileChangeHandler = (event: Event) => {
      const fileList = (event.target as HTMLInputElement).files;

      if (!fileList || !fileList.length) return;

      for (const imgFile of fileList) {
        imageFiles.value.push(imgFile);
      }
    };

    const tempImgUrl = (imgFile: File) => {
      return URL.createObjectURL(imgFile);
    };

    // Listening product prop changes
    watch(
      () => props.product,
      (product) => {
        if (!product) return;
        resetForm({ values: product });
      },
      { deep: true, immediate: true },
    );

    // Listening success submission
    watch(isSuccess, (value) => {
      if (!value) return;

      if (mutatedProduct.value?.msg === 'created') {
        router.replace({ name: 'admin-product', params: { id: mutatedProduct.value?.product.id } });
        toast.success('Product successfully created.');
      } else {
        resetForm({ values: mutatedProduct.value?.product });
        toast.success('Product successfully updated.');
      }

      imageFiles.value = [];
    });

    // Listening error submission
    watch(isError, (value) => {
      if (!value) return;
      return error.value?.message && toast.error(error.value.message);
    });

    return {
      errors,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      sizes,
      hasSize,
      images,
      imageFiles,
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const,
      isPending,
      submitHandler,
      selectSizeHandler,
      fileChangeHandler,
      tempImgUrl,
    };
  },
  components: {
    CustomInput,
    CustomSelect,
    CustomTextarea,
  },
});
