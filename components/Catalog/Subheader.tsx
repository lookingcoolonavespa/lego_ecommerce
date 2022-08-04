import React from 'react';
import { SortMethod } from '../../types/types';
import SearchBar from './SearchBar';
import SortBy from './SortBy';

interface Props {
  className: string;
  active: boolean;
  searchVal: string;
  setSearchVal: (val: string) => void;
  mobile: boolean;
  sortMethod: SortMethod;
  setSortMethod: React.Dispatch<React.SetStateAction<SortMethod>>;
  showFilterOptions: () => void;
}

export default function Subheader({
  className,
  active,
  searchVal,
  setSearchVal,
  mobile,
  sortMethod,
  setSortMethod,
  showFilterOptions,
}: Props) {
  return (
    <div
      className={`${className} ${mobile ? 'mobile' : ''}`}
      style={active ? { marginBottom: '2em' } : undefined}
    >
      <SearchBar value={searchVal} setSearchFilter={setSearchVal} />
      <SortBy sortMethod={sortMethod} setSortMethod={setSortMethod} />
      {mobile && (
        <button className="flat_btn" type="button" onClick={showFilterOptions}>
          Show Filter Options
        </button>
      )}
    </div>
  );
}
