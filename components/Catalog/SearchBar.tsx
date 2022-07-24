import React from 'react';
import SearchSvg from '../svg/SearchSvg';

interface Props {
  value: string;
  setSearchFilter: (val: string) => void;
}

export default function SearchBar({ value, setSearchFilter }: Props) {
  return (
    <div className="search_bar">
      <div className="svg_wrapper">
        <SearchSvg size="18" />
      </div>
      <input
        type="text"
        placeholder="Search"
        name="search"
        aria-label="search"
        value={value}
        onChange={(e) => {
          setSearchFilter(e.target.value);
        }}
      />
    </div>
  );
}
