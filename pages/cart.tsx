import React, { useContext } from 'react';
import CartContext from '../utils/CartContext';
import Layout from '../components/Layout';
import styles from '../styles/Cart.module.scss';
import useMobile from '../utils/useMobile';
import Nav from '../components/Nav';
import Image from 'next/image';
import { ProductInCartInterface } from '../types/interfaces';
import CartProductWrapper from '../components/CartProductWrapper';

export default function Cart() {
  const { cart } = useContext(CartContext);
  const { mobileCheck } = useMobile();

  const itemTotal = cart.reduce(
    (acc: number, curr: ProductInCartInterface) =>
      acc + Number(curr.price) * curr.quantity,
    0
  );
  const itemTotalRounded = Math.ceil(itemTotal * 100) / 100; // so price is cut off after two decimal points

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
              <section className={styles.products_ctn}>
                {cart.length ? (
                  cart.map((product: ProductInCartInterface) => {
                    return (
                      <CartProductWrapper
                        key={product.title}
                        product={product}
                      />
                    );
                  })
                ) : (
                  <h3>No items are in your cart</h3>
                )}
              </section>
              <section className={styles.price_ctn}>
                <span className={styles.detail_label}>Item(s) total:</span>
                <span>{itemTotalRounded} $</span>
                <span className={styles.detail_label}>Shipping:</span>
                <span>5 $</span>
                <span className={styles.detail_label}>Total:</span>
                <span className="bold">
                  {itemTotalRounded ? `${itemTotalRounded + 5} $` : '--'}
                </span>
              </section>
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
}
