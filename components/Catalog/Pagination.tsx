import React from 'react';
import styles from '../../styles/Pagination.module.scss';
import usePagination, { DOTS } from '../../utils/hooks/usePagination';

interface Props {
  onPageChange: (pageNo: number) => void;
  currentPage: number;
  maxPage: number;
}

export default function Pagination({
  onPageChange,
  currentPage,
  maxPage,
}: Props) {
  const paginationRange = usePagination(currentPage, maxPage);

  return (
    <aside>
      <ul className={styles.main} aria-label="pagination list">
        <li
          className={styles.text_btn}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <button
            type="button"
            aria-label={`Goto previous page`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {paginationRange.map((pageNumber, key) => {
          if (pageNumber === DOTS) {
            return (
              <li key={key} className="dots">
                &#8230;
              </li>
            );
          }

          const rootClasses = ['paginationItem'];
          if (currentPage === pageNumber) rootClasses.push('active');

          return (
            <li
              key={key}
              className={rootClasses.join(' ')}
              aria-current={currentPage === pageNumber}
              onClick={() => {
                if (typeof pageNumber !== 'number') return;
                onPageChange(pageNumber);
              }}
            >
              <button
                type="button"
                aria-label={`Goto page ${pageNumber}`}
                disabled={typeof pageNumber !== 'number'}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li
          className={styles.text_btn}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <button
            type="button"
            aria-label={`Goto next page`}
            disabled={currentPage === maxPage}
          >
            Next
          </button>
        </li>
      </ul>
    </aside>
  );
}
