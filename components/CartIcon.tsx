import React from 'react';
import styles from '../styles/CartIcon.module.scss';
import CartSvg from './svg/CartSvg';

export default function CartIcon() {
  return (
    <div className={styles.main}>
      <CartSvg />
    </div>
  );
}
