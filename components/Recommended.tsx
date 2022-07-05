import React, { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import styles from '../styles/Recommended.module.scss';
import { RECOMMENDED } from '../utils/constants';
import { ProductInterface } from '../types/interfaces';
import ProductPreview from './ProductPreview';

interface Props {
  products: ProductInterface[];
}

export default function Recommended({ products }: Props) {
  return (
    <section className={styles.main}>
      {products &&
        products.map((p, i) => {
          if (i === 0)
            return <ProductPreview key={`${p.title}-${i}`} product={p} />;
          else return null;
        })}
    </section>
  );
}
