import React, { useRef, useContext } from 'react';
import Link from 'next/link';
import CartContext from '../utils/CartContext';
import Layout from '../components/Layout';
import styles from '../styles/Cart.module.scss';
import useMobile from '../utils/hooks/useMobile';
import Nav from '../components/Nav';
import CartProductsCtn from '../components/CartProductsCtn';
import CartPriceCtn from '../components/CartPriceCtn';

export default function Cart() {
  const { cart } = useContext(CartContext);
  const { mobileCheck } = useMobile();

  return (
    <>
      <Nav mobile={mobileCheck.current} />
      <Layout mobile={mobileCheck.current}>
        <div className={styles.container}>
          <div className={styles.main}>
            <header>
              <h2>shopping cart</h2>
            </header>
            <main className={styles.cart}>
              <CartProductsCtn className={styles.products_ctn} />
              <CartPriceCtn className={styles.price_ctn} />
            </main>
            <Link href="/checkout">
              <button
                className={`${styles.checkout_btn} flat_btn`}
                type="button"
                disabled={!cart.length ? true : undefined}
              >
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
