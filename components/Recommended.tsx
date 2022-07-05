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
  const prevPage = useRef(0);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const springRef = useSpringRef();
  const transitions = useTransition(page, {
    from: {
      transform: 'translateX(100vw)',
    },
    enter: {
      transform: 'translateX(0)',
    },
    leave: {
      transform: 'translateX(-100vw)',
    },
  });

  function pageUp() {
    setPage((prev) => prev + 1);
  }

  function pageDown() {
    setPage((prev) => prev - 1);
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
        {transitions((animation, page) => {
          return (
            <animated.div className={styles.products_ctn} style={animation}>
              {products.map((p, i) => {
                const prevPageMax = (page - 1) * 3;
                const pageMax = page * 3;
                if (i >= prevPageMax && i < pageMax)
                  return <ProductPreview key={`${p.title}-${i}`} product={p} />;

                return null;
              })}
            </animated.div>
          );
        })}
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
