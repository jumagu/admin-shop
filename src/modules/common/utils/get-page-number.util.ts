export const getPageNumber = (page: string): number => {
  const pageNumber = Number(page);

  if (isNaN(pageNumber)) return 1;

  if (pageNumber < 1) return 1;

  return pageNumber;
};
