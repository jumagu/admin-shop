import { defineComponent, type PropType } from 'vue';
import { useForm, useFieldArray } from 'vee-validate';

import * as yup from 'yup';

import CustomInput from '@/modules/common/components/ui/CustomInput.vue';
import CustomSelect from '@/modules/common/components/ui/CustomSelect.vue';
import CustomTextarea from '@/modules/common/components/ui/CustomTextarea.vue';
import type { Product } from '../../../products/interfaces/product.interface';

const validationSchema = yup.object({
  title: yup.string().trim().min(5).required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  setup(props) {
    const { defineField, errors, handleSubmit } = useForm({
      validationSchema,
      initialValues: props.product,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: sizes, push: pushSize, remove: removeSize } = useFieldArray<string>('sizes');
    const { fields: images } = useFieldArray<string>('images');

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
      console.log(values);
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
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const,
      submitHandler,
      selectSizeHandler,
    };
  },
  components: {
    CustomInput,
    CustomSelect,
    CustomTextarea,
  },
});
