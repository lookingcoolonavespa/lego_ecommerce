import React from 'react';
import Image from 'next/image';
import styles from '../styles/ProductPreview.module.scss';
import { ProductInterface } from '../types/interfaces';

interface Props {
  product: ProductInterface;
}

export default function ProductPreview({ product }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.image_row}>
        <a className={styles.img_wrapper}>
          <Image src={product.imgSrc} alt={product.title} />
        </a>
      </div>
      <div className={styles.details_ctn}>
        <a className={styles.title_wrapper}>{product.title}</a>
        <div className={styles.bottom_row}>
          <div className={styles.price_wrapper}>{product.price}</div>
          <button type="button" className={styles.add_to_cart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
