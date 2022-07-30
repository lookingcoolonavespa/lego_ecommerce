import React, { useRef, useContext } from 'react';
import Link from 'next/link';
import CartContext from '../utils/CartContext';
import Layout from '../components/Layout';
import styles from '../styles/Cart.module.scss';
import useMobile from '../utils/hooks/useMobile';
import Nav from '../components/Nav';
import Image from 'next/image';
import { ProductInCartInterface } from '../types/interfaces';
import CartProductWrapper from '../components/CartProductWrapper';

export default function Cart() {
  const { cart } = useContext(CartContext);
  const { mobileCheck } = useMobile();

  const costTotal = cart.reduce(
    (acc: number, curr: ProductInCartInterface) =>
      acc + Number(curr.price) * curr.quantity,
    0
  );
  const costTotalRounded = Math.ceil(costTotal * 100) / 100; // so price is cut off after two decimal points

  const productWrapper = useRef<HTMLDivElement | null>(null);
  const productWrapperHeight = productWrapper.current // dont need to recalculate on resize because useMobile rerenders component on resize
    ? Number(
        window.getComputedStyle(productWrapper.current).height.slice(0, -2)
      )
    : 0;

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
              <section
                className={styles.products_ctn}
                style={{
                  height:
                    cart.length > 3 ? `${3 * productWrapperHeight}px` : 'auto',
                }}
              >
                <div className={cart.length > 3 ? 'scroller' : ''}>
                  {cart.length ? (
                    cart.map((product: ProductInCartInterface) => {
                      return (
                        <CartProductWrapper
                          divRef={productWrapper}
                          key={product.title}
                          product={product}
                        />
                      );
                    })
                  ) : (
                    <h3 className={styles.no_items}>
                      No items are in your cart
                    </h3>
                  )}
                </div>
              </section>
              <section className={styles.price_ctn}>
                <span className={styles.detail_label}>Item(s) total:</span>
                <span>{costTotalRounded} $</span>
                <span className={styles.detail_label}>Shipping:</span>
                <span>5 $</span>
                <span className={styles.detail_label}>Total:</span>
                <span className="bold">
                  {costTotalRounded ? `${costTotalRounded + 5} $` : '--'}
                </span>
              </section>
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
