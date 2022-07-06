import React, { useRef } from 'react';

import styles from '../styles/Recommended.module.scss';
import { ProductInterface } from '../types/interfaces';
import { RECOMMENDED } from '../utils/constants';
import ProductPreview from './ProductPreview';
import Slider from './Slider';

interface Props {
  products: ProductInterface[];
}

export default function Recommended({ products = RECOMMENDED }: Props) {
  const productsCtn = useRef<HTMLDivElement | null>(null);
  const productsCtnWidth = useRef('100vw');

  return (
    <section className={styles.main}>
      <header>
        <h3>Recommended for you</h3>
      </header>
      <Slider
        className={styles.main_content}
        lastPage={products.length / 3 + (products.length % 3) ? 0 : -1}
      >
        {products
          // split into sections of 3 products
          .reduce<JSX.Element[][]>(
            (acc, curr, i) => {
              if (acc[acc.length - 1].length < 3)
                acc[acc.length - 1].push(
                  <ProductPreview key={i} product={curr} />
                );
              else {
                acc.push([]);
                acc[acc.length - 1].push(
                  <ProductPreview key={i} product={curr} />
                );
              }
              return acc;
            },
            [[]]
          )
          .map((productPreviews, i) => {
            return (
              <div key={'product_slide' + i} className={styles.product_slide}>
                {productPreviews}
              </div>
            );
          })}
      </Slider>
      {/* <div className={styles.scroller}>
        {products &&
          products.map((p, i) => {
            return <ProductPreview key={`${p.title}-${i}`} product={p} />;
          })}
      </div> */}
    </section>
  );
}
