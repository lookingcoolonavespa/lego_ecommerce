import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

import styles from '../styles/Recommended.module.scss';
import { ProductInterface } from '../types/interfaces';
import ProductPreview from './ProductPreview';
import ArrowSvg from './svg/ArrowSvg';

interface Props {
  products: ProductInterface[];
}

export default function Recommended({ products }: Props) {
  const productsCtn = useRef<HTMLDivElement | null>(null);
  const productsCtnWidth = useRef('100vw');

  const [page, setPage] = useState(0);
  const lastPage = page === products.length / 3 + (products.length % 3) ? 1 : 0;

  const [slideProps, slidePropsApi] = useSpring(() => ({
    offset: 0,
  }));

  useEffect(() => {
    slidePropsApi.update(() => ({ offset: 0 - page })).start();
  }, [page, slidePropsApi]);

  function pageUp() {
    setPage((prev) => {
      if (lastPage) return prev;
      return prev + 1;
    });
  }

  function pageDown() {
    setPage((prev) => {
      if (page === 0) return prev;
      return prev - 1;
    });
  }

  return (
    <section className={styles.main}>
      <header>
        <h3>Recommended for you</h3>
      </header>
      <div className={styles.Main_content}>
        <button type="button" onClick={pageDown}>
          <ArrowSvg dir="left" />
        </button>
        <div className={styles.slide_frame}>
          <animated.div
            className={styles.products_ctn}
            style={{
              transform: slideProps.offset.to(
                (offsetX) => `translateX(${offsetX * (772 + 40)}px)`
              ),
              willChange: 'transform',
            }}
          >
            {products
              // split into sections of 3 products
              .reduce<JSX.Element[][]>(
                (acc, curr, i) => {
                  if (acc[acc.length - 1].length < 3)
                    acc[acc.length - 1].push(<ProductPreview product={curr} />);
                  else {
                    acc.push([]);
                    acc[acc.length - 1].push(<ProductPreview product={curr} />);
                  }
                  return acc;
                },
                [[]]
              )
              .map((productPreviews, i) => {
                return (
                  <div key={i} className={styles.product_slide}>
                    {productPreviews}
                  </div>
                );
              })}
          </animated.div>
        </div>
        <button type="button" onClick={pageUp}>
          <ArrowSvg dir="right" />
        </button>
      </div>
      {/* <div className={styles.scroller}>
        {products &&
          products.map((p, i) => {
            return <ProductPreview key={`${p.title}-${i}`} product={p} />;
          })}
      </div> */}
    </section>
  );
}
