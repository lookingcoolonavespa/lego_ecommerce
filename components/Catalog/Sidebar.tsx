import React from 'react';
import styles from '../../styles/Sidebar.module.scss';
import LegoLego from '../svg/LegoLogo';
import TrashSvg from '../svg/TrashSvg';
import OptionsFilter from './OptionsFilter';
import { PriceFilterInterface } from '../../types/interfaces';
import PriceFilter from './PriceFilter';

interface Props {
  className: string;
  priceFilters: PriceFilterInterface;
  setPriceFilters: React.Dispatch<React.SetStateAction<PriceFilterInterface>>;
  resetFilters: () => void;
}

export default function Sidebar({
  className,
  priceFilters,
  setPriceFilters,
  resetFilters,
}: Props) {
  return (
    <aside className={`${styles.main} ${className}`}>
      <PriceFilter
        className={styles.price_filter}
        min={priceFilters.min}
        max={priceFilters.max}
        setPriceFilters={setPriceFilters}
      />
      <OptionsFilter
        title="Theme"
        className={styles.options_filter}
        options={['Space', 'Ninja', 'Transport', 'Buildings', 'Homes']}
      />
      <OptionsFilter
        title="Age"
        className={styles.options_filter}
        options={[
          'Up to a year',
          '1 year - 2 years',
          '3 years - 5 years',
          '6 years - 10 years',
          'Older than 12 years',
        ]}
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
