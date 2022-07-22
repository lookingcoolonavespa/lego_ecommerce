import React from 'react';
import styles from '../../styles/Sidebar.module.scss';
import LegoLego from '../svg/LegoLogo';
import TrashSvg from '../svg/TrashSvg';
import OptionsFilter from './OptionsFilter';
import { PriceFilterInterface } from '../../types/interfaces';
import PriceFilter from './PriceFilter';
import { ProductThemes, AgeGroup } from '../../types/types';

interface Props {
  className: string;
  priceFilters: PriceFilterInterface;
  setFilters: (
    type: 'priceMin' | 'priceMax' | 'theme' | 'age',
    payload: number | ProductThemes | AgeGroup
  ) => void;
  resetFilters: () => void;
  themeCount: { [key: string]: number };
  ageCount: { [key: string]: number };
}

export default function Sidebar({
  className,
  priceFilters,
  setFilters,
  resetFilters,
  themeCount,
  ageCount,
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
      />
      <OptionsFilter
        title="Age"
        className={styles.options_filter}
        options={ageCount}
      />
      <section className={styles.btn_ctn}>
        <button type="button" className={`${styles.apply_filters} flat_btn`}>
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
