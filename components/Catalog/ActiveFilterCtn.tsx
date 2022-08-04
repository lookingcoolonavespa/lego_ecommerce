import React from 'react';
import { AgeGroup, ProductThemes } from '../../types/types';
import ActiveFilter from './ActiveFilter';

interface Props {
  className: string;
  priceMinFilter: number;
  priceMaxFilter: number;
  themeFilters: ProductThemes[];
  ageFilters: AgeGroup[];
  closeAgeFilter: (val: AgeGroup) => () => void;
  closeThemeFilter: (val: ProductThemes) => () => void;
  closeMinFilter: () => void;
  closeMaxFilter: () => void;
  priceMaxActive: boolean;
  priceMinActive: boolean;
}

export default function ActiveFilterCtn({
  className,
  priceMinFilter,
  priceMaxFilter,
  themeFilters,
  ageFilters,
  closeAgeFilter,
  closeThemeFilter,
  closeMaxFilter,
  closeMinFilter,
  priceMaxActive,
  priceMinActive,
}: Props) {
  return (
    <div className={className}>
      {priceMinActive && (
        <ActiveFilter
          text={`From ${priceMinFilter} $`}
          close={closeMinFilter}
        />
      )}
      {priceMaxActive && (
        <ActiveFilter text={`To ${priceMaxFilter} $`} close={closeMaxFilter} />
      )}
      {themeFilters.map((v) => (
        <ActiveFilter key={v} text={v} close={closeThemeFilter(v)} />
      ))}
      {ageFilters.map((v) => (
        <ActiveFilter key={v} text={v} close={closeAgeFilter(v)} />
      ))}
    </div>
  );
}
