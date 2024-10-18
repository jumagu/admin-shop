import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { getPageNumber } from '../utils/get-page-number.util';

export const usePagination = () => {
  const route = useRoute();
  const page = ref(getPageNumber(route.query.page as string));

  watch(
    () => route.query.page,
    (newPage) => {
      page.value = getPageNumber(newPage as string);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );

  return { page };
};
