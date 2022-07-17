import React from 'react';
import styles from '../../styles/PriceFilter.module.scss';
import InputWrapper from '../InputWrapper';
import { PriceFilterInterface } from '../../types/interfaces';

interface Props {
  min: number;
  max: number;
  className: string;
  setPriceFilters: React.Dispatch<React.SetStateAction<PriceFilterInterface>>;
}

export default function PriceFilter({
  min,
  max,
  className,
  setPriceFilters,
}: Props) {
  return (
    <div className={`${styles.main} ${className}`}>
      <header className={styles.title}>Price</header>
      <div className={styles.controls}>
        <InputWrapper
          label="From"
          inputDetails={{
            type: 'number',
            value: min,
            onChange: (e) => {
              const el = e.target as HTMLInputElement;
              setPriceFilters((prev) => ({ ...prev, min: Number(el.value) }));
            },
          }}
          text="$"
        />
        <InputWrapper
          label="Up to"
          inputDetails={{
            type: 'number',
            value: max,
            onChange: (e) => {
              const el = e.target as HTMLInputElement;
              setPriceFilters((prev) => ({ ...prev, max: Number(el.value) }));
            },
          }}
          text="$"
        />
      </div>
    </div>
  );
}
