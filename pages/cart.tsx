import React, { useRef, useContext } from 'react';
import Link from 'next/link';
import CartContext from '../utils/CartContext';
import Layout from '../components/Layout';
import styles from '../styles/Cart.module.scss';
import Nav from '../components/Nav';
import CartProductsCtn from '../components/CartProductsCtn';
import CartPriceCtn from '../components/CartPriceCtn';
import MobileNav from '../components/MobileNav';
import Device from '../components/Device/index';

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <Device>
        {({ isMobile }) =>
          isMobile ? (
            <MobileNav
              pulloutChildren={[
                {
                  href: 'shop',
                  text: 'Shop',
                },
                {
                  href: '',
                  text: 'Discover',
                },
                {
                  href: '',
                  text: 'Help',
                },
              ]}
            />
          ) : (
            <Nav />
          )
        }
      </Device>
      <Layout>
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
