import React from 'react';
import styles from '../../styles/PriceFilter.module.scss';
import InputWrapper from '../InputWrapper';

interface Props {
  min: number;
  max: number;
  className: string;
}

export default function PriceFilter({ min, max, className }: Props) {
  return (
    <div className={`${styles.main} ${className}`}>
      <header className={styles.title}>Price</header>
      <div className={styles.controls}>
        <InputWrapper
          label="From"
          inputDetails={{
            type: 'number',
            value: min,
          }}
          text="$"
        />
        <InputWrapper
          label="Up to"
          inputDetails={{
            type: 'number',
            value: max,
          }}
          text="$"
        />
      </div>
    </div>
  );
}
