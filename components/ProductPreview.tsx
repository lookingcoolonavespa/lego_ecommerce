import React, { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/ProductPreview.module.scss';
import { ProductInterface } from '../types/interfaces';
import CartSvg from './svg/CartSvg';

interface Props {
  product: ProductInterface;
}

export default function ProductPreview({ product }: Props) {
  const [cartSize, setCartSize] = useState('24px');
  const priceNode = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    if (!priceNode.current) return;

    const priceSize = window.getComputedStyle(priceNode.current).fontSize;
    setCartSize(priceSize);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.image_row}>
        <a className={styles.img_wrapper}>
          <Image
            src={product.imgSrc}
            alt={product.title}
            layout="fill"
            objectFit="contain"
          />
        </a>
      </div>
      <div className={styles.details_ctn}>
        <div className={styles.top_row}>
          <a className={styles.title_wrapper}>{product.title}</a>
        </div>
        <div className={styles.bottom_row}>
          <div className={styles.price_wrapper}>
            <h5 ref={priceNode}>{product.price} $</h5>
          </div>
          <button type="button" className={styles.add_to_cart}>
            <CartSvg height={cartSize} width={cartSize} />
          </button>
        </div>
      </div>
    </div>
  );
}