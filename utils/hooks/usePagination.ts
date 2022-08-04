import { PaginationType } from '../../types/types';

export const DOTS = '...';

function usePagination(currentPage: number, maxPage: number): PaginationType {
  const currentPageSiblings =
    currentPage === 1
      ? [1, 2, 3]
      : [currentPage - 1, currentPage, currentPage + 1];

  if (
    currentPageSiblings.includes(maxPage) &&
    currentPageSiblings.includes(1)
  ) {
    const filtered = currentPageSiblings.map((v) => {
      if (v <= maxPage) return v;

      return '--';
    });

    // need two '--' to replace Dots + maxPage
    filtered.push('--', '--');

    return filtered;
  }

  if (currentPage === 1) {
    return [1, 2, 3, DOTS, maxPage];
  }
  if (currentPage === maxPage) {
    return [1, DOTS, maxPage - 2, maxPage - 1, maxPage];
  }

  let pagination: PaginationType = [];

  if (currentPageSiblings[0] !== 1) pagination.push(1, DOTS);
  pagination = pagination.concat(currentPageSiblings);

  if (currentPageSiblings[2] !== maxPage) pagination.push(DOTS, maxPage);

  return pagination;
}

export default usePagination;
