import React, { useState, useRef, useEffect, useContext } from 'react';
import Image from 'next/image';
import styles from '../styles/ProductPreview.module.scss';
import { ProductInterface } from '../types/interfaces';
import CartSvg from './svg/CartSvg';
import CartContext from '../utils/CartContext';

interface Props {
  product: ProductInterface;
  className?: string;
}

export default function ProductPreview({ product, className }: Props) {
  const { handleCart } = useContext(CartContext);
  const [cartSize, setCartSize] = useState('24px');
  const priceNode = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!priceNode.current) return;

    const priceSize = window.getComputedStyle(priceNode.current).fontSize;
    setCartSize(priceSize);
  }, []);

  function addToCart() {
    handleCart({
      type: 'add',
      payload: {
        product,
        quantity: 1,
      },
    });
  }

  const rootClasses = [styles.main];
  if (className) rootClasses.push(className);
  return (
    <div className={rootClasses.join(' ')}>
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
            <p ref={priceNode}>{product.price} $</p>
          </div>
          <button
            type="button"
            className={styles.add_to_cart}
            onClick={addToCart}
          >
            <CartSvg size={cartSize} />
          </button>
        </div>
      </div>
    </div>
  );
}
