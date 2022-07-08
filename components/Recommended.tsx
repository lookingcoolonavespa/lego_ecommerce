import React, { useRef } from 'react';

import styles from '../styles/Recommended.module.scss';
import { ProductInterface } from '../types/interfaces';
import { RECOMMENDED } from '../utils/constants';
import ProductPreview from './ProductPreview';
import Slider from './Slider';

interface Props {
  products: ProductInterface[];
}

export default function Recommended({ products }: Props) {
  return (
    <section className={styles.main}>
      <header>
        <h3>Recommended for you</h3>
      </header>
      <Slider className={styles.main_content} slideWidth={290}>
        {products.map((product, i) => {
          return (
            <ProductPreview
              key={i}
              product={product}
              className={styles.product_wrapper}
            />
          );
        })}
      </Slider>
    </section>
  );
}
