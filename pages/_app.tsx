import React, { useEffect, useReducer } from 'react';

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import CartContext from '../utils/CartContext';
import { ProductInCartInterface, ProductInterface } from '../types/interfaces';

let initMount = true;
function MyApp({ Component, pageProps }: AppProps) {
  const [cart, handleCart] = useReducer(
    (
      state: ProductInCartInterface[],
      action: {
        type: 'add' | 'delete' | 'update' | 'set';
        payload: {
          product?: ProductInterface;
          quantity?: number;
          cart?: ProductInCartInterface[];
        };
      }
    ): ProductInCartInterface[] => {
      const { quantity, product, cart } = action.payload;

      switch (action.type) {
        case 'update':
        case 'add': {
          if (!product || !quantity) return state;
          const productInCart = state.find((p) => p.title === product.title);
          if (productInCart) {
            return state.map((p) => {
              if (p.title !== product.title) return p;

              return action.type === 'add'
                ? { ...p, quantity: p.quantity + quantity }
                : { ...p, quantity };
            });
          }

          return [...state, { ...product, quantity }];
        }

        case 'set': {
          return cart ? cart : state;
        }

        case 'delete': {
          if (!product) return state;
          return state.filter((p) => p.title !== product.title);
        }

        default:
          return state;
      }
    },
    []
  );

  useEffect(() => {}, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsed = JSON.parse(storedCart) as ProductInCartInterface[];
      console.log(parsed);
      handleCart({
        type: 'set',
        payload: { cart: parsed },
      });
    }
  }, []);

  useEffect(() => {
    if (!initMount) localStorage.setItem('cart', JSON.stringify(cart));
    initMount = false;
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, handleCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}

export default MyApp;
