import React, { useContext } from 'react';
import Icon from './Icon';
import CartSvg from './svg/CartSvg';
import CartContext from '../utils/CartContext';
import { ProductInCartInterface } from '../types/interfaces';

interface Props {
  iconSize?: string;
}
export default function NavCart({ iconSize }: Props) {
  const { cart } = useContext(CartContext);
  const amountOfProducts = cart.reduce(
    (acc: number, curr: ProductInCartInterface) => acc + curr.quantity,
    0
  );

  return (
    <div className="cart_wrapper">
      <Icon svg={<CartSvg size={iconSize || undefined} />} />
      <div className="cart_counter">{amountOfProducts}</div>
    </div>
  );
}
