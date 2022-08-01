import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import CartContext from '../utils/CartContext';
import CartProductWrapper from './CartProductWrapper';
import { ProductInCartInterface } from '../types/interfaces';

interface Props {
  className: string;
}

export default function CartProductsCtn({ className }: Props) {
  const { cart } = useContext(CartContext);

  const [productWrapperHeight, setProductWrapperHeight] = useState(0);

  return (
    <section
      className={className}
      style={{
        height: cart.length > 3 ? `${3 * productWrapperHeight}px` : 'auto',
      }}
    >
      <div className={cart.length > 3 ? 'scroller' : ''}>
        {cart.length ? (
          cart.map((product: ProductInCartInterface, i: number) => {
            return (
              <CartProductWrapper
                divRef={
                  i === 0
                    ? (node) => {
                        if (!node) return;
                        setProductWrapperHeight(
                          Number(
                            window.getComputedStyle(node).height.slice(0, -2)
                          )
                        );
                      }
                    : undefined
                }
                key={product.title}
                product={product}
              />
            );
          })
        ) : (
          <h3 className="no_items">No items are in your cart</h3>
        )}
      </div>
    </section>
  );
}
