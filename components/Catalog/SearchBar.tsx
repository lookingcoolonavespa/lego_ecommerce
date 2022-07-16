import React from 'react';
import SearchSvg from '../svg/SearchSvg';

export default function SearchBar() {
  return (
    <div className="search_bar">
      <div className="svg_wrapper">
        <SearchSvg size="18" />
      </div>
      <input type="text" placeholder="Search" />
    </div>
  );
}
