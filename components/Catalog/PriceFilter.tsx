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
            value: min.toString(),
            min: 0,
            max: 9999,
            name: 'From',
            'aria-label': 'From',
            onChange: (e) => {
              const el = e.target as HTMLInputElement;
              setPriceFilters((prev) => {
                if (Number(el.value) < 0) return prev;
                if (Number(el.value) > 9999) return prev;

                return { ...prev, min: Number(el.value) };
              });
            },
          }}
          text="$"
        />
        <InputWrapper
          label="Up to"
          className={min > max ? 'error' : ''}
          inputDetails={{
            type: 'number',
            value: max.toString(),
            min: 0,
            max: 9999,
            name: 'To',
            'aria-label': 'To',
            onChange: (e) => {
              const el = e.target as HTMLInputElement;
              setPriceFilters((prev) => {
                if (Number(el.value) < 0) return prev;
                if (Number(el.value) > 9999) return prev;
                return { ...prev, max: Number(el.value) };
              });
            },
          }}
          text="$"
        />
      </div>
    </div>
  );
}
