import React from 'react';
import FilterSvg from '../svg/FilterSvg';

export default function SortBy() {
  return (
    <div className="sort_by">
      <div className="svg_wrapper">
        <FilterSvg size="18" />
      </div>
      <select>
        <option>Popular</option>
        <option>Price: High to Low</option>
        <option>Price: Low to High</option>
      </select>
    </div>
  );
}
