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
    (acc: number, curr: ProductInCartInterface) => acc + Number(curr.price),
    0
  );

  return (
    <>
      <Nav mobile={mobileCheck.current} />
      <Layout mobile={mobileCheck.current}>
        <div className={styles.main}>
          <header>
            <h2>Shopping Cart</h2>
          </header>
          <main className={styles.cart}>
            <section>
              {cart.length ? (
                cart.map((product: ProductInCartInterface) => {
                  return (
                    <CartProductWrapper key={product.title} product={product} />
                  );
                })
              ) : (
                <h3>No items are in your cart</h3>
              )}
            </section>
            <section className={styles.price_ctn}>
              <div className="">Item(s) total: ${itemTotal}</div>
              <div className="">Shipping: $5</div>
              <div className="">Total: ${itemTotal + 5}</div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
}
