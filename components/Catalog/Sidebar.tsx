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
  setFilters: React.Dispatch<
    | {
        type: 'priceMin' | 'priceMax';
        payload: number;
      }
    | {
        type: 'theme';
        payload: ProductThemes;
      }
    | {
        type: 'age';
        payload: AgeGroup;
      }
    | {
        type: 'search';
        payload: string;
      }
    | { type: 'reset'; payload?: null }
  >;
  resetFilters: () => void;
  themeCount: { [key in ProductThemes]: number };
  ageCount: { [key in AgeGroup]: number };
  applyFilter: () => void;
  close: () => void;
  mobile: boolean;
}

export default function Sidebar({
  className,
  priceFilters,
  themeFilters,
  ageFilters,
  setFilters,
  resetFilters,
  themeCount,
  ageCount,
  applyFilter,
  close,
  mobile,
}: Props) {
  return (
    <aside className={`${styles.main} ${className}`}>
      <PriceFilter
        className={styles.price_filter}
        min={priceFilters.min}
        max={priceFilters.max}
        setPriceMax={(value: number) =>
          setFilters({ type: 'priceMax', payload: value })
        }
        setPriceMin={(value: number) =>
          setFilters({ type: 'priceMin', payload: value })
        }
      />
      <OptionsFilter
        title="Theme"
        className={styles.options_filter}
        options={themeCount}
        selected={themeFilters}
        name="themes"
        selectOption={(option: string) => {
          if (!isProductTheme(option)) return;
          setFilters({ type: 'theme', payload: option });
        }}
      />
      <OptionsFilter
        title="Age"
        className={styles.options_filter}
        options={ageCount}
        selected={ageFilters}
        name="age groups"
        selectOption={(option: string) => {
          if (!isAgeGroup(option)) return;
          setFilters({ type: 'age', payload: option });
        }}
      />
      <section className={styles.btn_ctn}>
        <button
          onClick={applyFilter}
          type="button"
          aria-label="apply filters"
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
      <section className="centered">
        {mobile && (
          <button
            className={`${styles.close_btn} flat_btn`}
            type="button"
            onClick={close}
          >
            Close Filter Options
          </button>
        )}
      </section>
    </aside>
  );
}
