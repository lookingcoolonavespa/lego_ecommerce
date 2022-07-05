import React, { useState, useRef, useLayoutEffect } from 'react';
import { animated, useTransition, useSpringRef } from 'react-spring';

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

  const [page, setPage] = useState(1);
  const transitions = useTransition(
    products.filter((p, i) => {
      const pageMin = (page - 1) * 3;
      const pageMax = page * 3;

      return i >= pageMin && i < pageMax;
    }),
    {
      from: {
        transform: `translateX(${productsCtnWidth.current})`,
      },
      enter: {
        transform: 'translateX(0px)',
      },
      leave: {
        transform: `translateX(-${productsCtnWidth.current})`,
      },
      exitBeforeEnter: true,
    }
  );

  function pageUp() {
    setPage((prev) => prev + 1);
  }

  function pageDown() {
    setPage((prev) => prev - 1);
  }

  useLayoutEffect(() => {
    if (!productsCtn.current) return;

    productsCtnWidth.current = window.getComputedStyle(
      productsCtn.current
    ).width;
    console.log(window.getComputedStyle(productsCtn.current).width);
  }, [page]);
  return (
    <section className={styles.main}>
      <header>
        <h3>Recommended for you</h3>
      </header>
      <div className={styles.Main_content}>
        <button type="button" onClick={pageDown}>
          <ArrowSvg dir="left" />
        </button>
        <div ref={productsCtn} className={styles.products_ctn}>
          {transitions((animation, item) => {
            return (
              item && (
                <animated.div
                  className={styles.product_wrapper}
                  style={animation}
                >
                  <ProductPreview product={item} />
                </animated.div>
              )
            );
          })}
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
