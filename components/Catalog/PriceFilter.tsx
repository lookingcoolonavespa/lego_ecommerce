import React from 'react';
import styles from '../../styles/PriceFilter.module.scss';
import InputWrapper from '../InputWrapper';
import { PriceFilterInterface } from '../../types/interfaces';

interface Props {
  min: number;
  max: number;
  className: string;
  setPriceMax: (value: number) => void;
  setPriceMin: (value: number) => void;
}

export default function PriceFilter({
  min,
  max,
  className,
  setPriceMax,
  setPriceMin,
}: Props) {
  if (min && !max) max = Infinity;
  if (max && !min) min = -Infinity;
  return (
    <div className={`${styles.main} ${className}`}>
      <header className={styles.title}>Price</header>
      <div className={styles.controls}>
        <InputWrapper
          label="From"
          inputDetails={{
            type: 'number',
            value: min === -Infinity ? 0 : min.toString(),
            min: 0,
            max: 9999,
            name: 'From',
            'aria-label': 'From',
            onChange: (e) => {
              const el = e.target as HTMLInputElement;
              setPriceMin(Number(el.value));
            },
          }}
          text="$"
        />
        <InputWrapper
          label="Up to"
          className={min > max ? 'error' : ''}
          inputDetails={{
            type: 'number',
            value: max === Infinity ? 0 : max.toString(),
            min: 0,
            max: 9999,
            name: 'To',
            'aria-label': 'To',
            onChange: (e) => {
              const el = e.target as HTMLInputElement;
              setPriceMax(Number(el.value));
            },
          }}
          text="$"
        />
      </div>
    </div>
  );
}
