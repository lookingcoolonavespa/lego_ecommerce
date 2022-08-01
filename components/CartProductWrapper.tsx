import React, { useContext, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/CartProductWrapper.module.scss';
import { ProductInCartInterface } from '../types/interfaces';
import CartContext from '../utils/CartContext';

interface Props {
  product: ProductInCartInterface;
  divRef?: React.RefObject<HTMLDivElement> | ((el: HTMLDivElement) => void);
  readonly?: boolean;
}

export default function CartProductWrapper({
  product,
  divRef,
  readonly = false,
}: Props) {
  const { handleCart } = useContext(CartContext);
  const selectInput = useRef<HTMLSelectElement | null>(null);

  return (
    <div ref={divRef} className={`${styles.main} product_wrapper`}>
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
        <div className={styles.detail_wrapper}>
          <span className={styles.detail_label}>Price:</span>
          <span className={styles.price_wrapper}>{product.price} $</span>
        </div>
        <div className={styles.detail_wrapper}>
          <span className={styles.detail_label}>Quantity:</span>
          <div className={styles.quantity_wrapper}>
            {readonly ? (
              <span className="">{product.quantity}</span>
            ) : (
              <select
                ref={selectInput}
                value={product.quantity}
                onChange={() => {
                  if (!selectInput.current) return;
                  handleCart({
                    type: 'update',
                    payload: {
                      product,
                      quantity: Number(selectInput.current.value),
                    },
                  });
                }}
              >
                {[...Array(11)]
                  .map((v, i) => i)
                  .map((num) => {
                    return (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    );
                  })}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
