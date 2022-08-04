import React, { useRef, useState, useEffect, useReducer } from 'react';

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import CartContext from '../utils/CartContext';
import { ProductInCartInterface, ProductInterface } from '../types/interfaces';
import ClientOnlyPortal from '../components/ClientOnlyPortal';
import CheckSvg from '../components/svg/CheckSvg';
import CloseSvg from '../components/svg/CloseSvg';

let initMount = true;
function MyApp({ Component, pageProps }: AppProps) {
  const [, setWindowWidth] = useState(0);
  const [message, setMessage] = useState({
    active: false,
    selector: '',
    text: '',
    success: true,
  });
  const [cart, handleCart] = useReducer(
    (
      state: ProductInCartInterface[],
      action:
        | {
            type: 'add' | 'update';
            payload: {
              quantity: number;
              selector: string;
              product: ProductInterface;
            };
          }
        | {
            type: 'delete';
            payload: {
              product: ProductInterface;
            };
          }
        | {
            type: 'set';
            payload: {
              cart: ProductInCartInterface[];
            };
          }
    ): ProductInCartInterface[] => {
      // const { quantity, product, selector, cart } = action.payload;

      switch (action.type) {
        case 'update':
        case 'add': {
          const { quantity, product, selector } = action.payload;

          const productInCart = state.find((p) => p.title === product.title);

          if (action.type === 'update') {
            if (quantity === 0) {
              setMessage({
                selector,
                active: true,
                text: 'Removed from Cart',
                success: true,
              });
              return state.filter((p) => p.title !== product.title);
            }

            if (productInCart) {
              const quantityGreaterThan10 = quantity > 10;
              if (quantityGreaterThan10)
                setMessage({
                  selector,
                  text: 'Update failed (products limited to 10)',
                  success: false,
                  active: true,
                });

              return state.map((p) => {
                if (p.title !== product.title) return p;

                // if (quantity > 10) quantity = 10;
                return {
                  ...p,
                  quantity: quantityGreaterThan10 ? 10 : quantity,
                };
              });
            }
          } else if (action.type === 'add') {
            setMessage({
              selector,
              active: true,
              text: 'Added To Cart',
              success: true,
            });

            if (productInCart) {
              return state.map((p) => {
                if (p.title !== product.title) return p;
                const newQuantity = p.quantity + quantity;
                const quantityGreaterThan10 = newQuantity > 10;
                if (quantityGreaterThan10)
                  setMessage({
                    selector,
                    text: 'Update failed (products limited to 10)',
                    success: false,
                    active: true,
                  });
                return {
                  ...p,
                  quantity: quantityGreaterThan10 ? 10 : newQuantity,
                };
              });
            }
          }

          return [...state, { ...product, quantity }];
        }

        case 'set': {
          const { cart } = action.payload;

          return cart;
        }

        case 'delete': {
          const { product } = action.payload;

          return state.filter((p) => p.title !== product.title);
        }

        default:
          return state;
      }
    },
    []
  );

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>();
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
    if (message.active)
      timer.current = setTimeout(() => {
        setMessage({
          active: false,
          selector: '',
          text: '',
          success: true,
        });
      }, 1500);
  }, [message]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsed = JSON.parse(storedCart) as ProductInCartInterface[];
      handleCart({
        type: 'set',
        payload: { cart: parsed },
      });
    }
  }, []);

  useEffect(() => {
    // so the cart isnt overwritten by the default value
    if (!initMount) localStorage.setItem('cart', JSON.stringify(cart));
    initMount = false;
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, handleCart }}>
      <Component {...pageProps} />
      {message.active && (
        <ClientOnlyPortal selector={message.selector || 'body'}>
          <div className="notification">
            {message.success ? (
              <span className="svg_wrapper success">
                <CheckSvg size="1.5em" />
              </span>
            ) : (
              <span className="svg_wrapper error">
                <CloseSvg size="1.5em" />
              </span>
            )}
            {message.text}
          </div>
        </ClientOnlyPortal>
      )}
    </CartContext.Provider>
  );
}

export default MyApp;
