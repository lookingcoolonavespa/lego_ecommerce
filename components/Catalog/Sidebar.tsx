import React from 'react';
import styles from '../../styles/Sidebar.module.scss';
import TrashSvg from '../svg/TrashSvg';
import OptionsFilter from './OptionsFilter';
import { PriceFilterInterface } from '../../types/interfaces';
import PriceFilter from './PriceFilter';
import { ProductThemes, AgeGroup } from '../../types/types';
import { isAgeGroup, isProductTheme } from '../../types/typeGuards';

interface Props {
  className: string;
  themeFilters: ProductThemes[];
  ageFilters: AgeGroup[];
  priceFilters: PriceFilterInterface;
  setFilters: (
    type: 'priceMin' | 'priceMax' | 'theme' | 'age',
    payload: number | ProductThemes | AgeGroup
  ) => void;
  resetFilters: () => void;
  themeCount: { [key in ProductThemes]: number };
  ageCount: { [key in AgeGroup]: number };
  toggleFilter: () => void;
}

export default function Sidebar({
  className,
  themeFilters,
  ageFilters,
  priceFilters,
  setFilters,
  resetFilters,
  themeCount,
  ageCount,
  toggleFilter,
}: Props) {
  return (
    <aside className={`${styles.main} ${className}`}>
      <PriceFilter
        className={styles.price_filter}
        min={priceFilters.min}
        max={priceFilters.max}
        setPriceMax={(value: number) => setFilters('priceMax', value)}
        setPriceMin={(value: number) => setFilters('priceMin', value)}
      />
      <OptionsFilter
        title="Theme"
        className={styles.options_filter}
        options={themeCount}
        selected={themeFilters}
        selectOption={(option: string) => {
          if (!isProductTheme(option)) return;
          console.log(option);
          setFilters('theme', option);
        }}
      />
      <OptionsFilter
        title="Age"
        className={styles.options_filter}
        options={ageCount}
        selected={ageFilters}
        selectOption={(option: string) => {
          if (!isAgeGroup(option)) return;
          setFilters('age', option);
        }}
      />
      <section className={styles.btn_ctn}>
        <button
          onClick={toggleFilter}
          type="button"
          className={`${styles.apply_filters} flat_btn`}
        >
          APPLY FILTER
        </button>
        <button
          type="button"
          className={`${styles.remove_filters}`}
          aria-label="remove filters"
          onClick={resetFilters}
        >
          <TrashSvg />
        </button>
      </section>
    </aside>
  );
}
