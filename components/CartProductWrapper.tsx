import React from 'react';
import Image from 'next/image';
import styles from '../styles/CartProductWrapper.module.scss';
import { ProductInCartInterface } from '../types/interfaces';

interface Props {
  product: ProductInCartInterface;
}

export default function CartProductWrapper({ product }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.product_img_wrapper}>
        <Image
          src={product.imgSrc}
          alt={product.title}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.product_details}>
        <div className={styles.title_wrapper}>
          <h3>{product.title}</h3>
        </div>
        <div className={styles.price_wrapper}>${product.price}</div>
        <div className={styles.quantity_wrapper}>{product.quantity}</div>
      </div>
    </div>
  );
}
