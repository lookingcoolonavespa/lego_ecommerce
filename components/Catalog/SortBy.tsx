import React, { useRef } from 'react';
import FilterSvg from '../svg/FilterSvg';

interface Props {
  setSortMethod: React.Dispatch<
    React.SetStateAction<
      'Popular' | 'Price: High to Low' | 'Price: Low to High'
    >
  >;
  sortMethod: 'Popular' | 'Price: High to Low' | 'Price: Low to High';
}

const sortMethods = ['Popular', 'Price: High to Low', 'Price: Low to High'];

export default function SortBy({ setSortMethod, sortMethod }: Props) {
  const select = useRef<HTMLSelectElement | null>(null);
  return (
    <div className="sort_by">
      <div className="svg_wrapper">
        <FilterSvg size="18" />
      </div>
      <select
        ref={select}
        value={sortMethod}
        onChange={() => {
          if (!select.current) return;
          const value = select.current.value as
            | 'Popular'
            | 'Price: High to Low'
            | 'Price: Low to High';
          setSortMethod(value);
        }}
      >
        {sortMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
  );
}
