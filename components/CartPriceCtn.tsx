import React, { useContext } from 'react';
import { ProductInCartInterface } from '../types/interfaces';
import CartContext from '../utils/CartContext';

interface Props {
  className: string;
}

export default function CartPriceCtn({ className }: Props) {
  const { cart } = useContext(CartContext);
  const costTotal = cart.reduce(
    (acc: number, curr: ProductInCartInterface) =>
      acc + Number(curr.price) * curr.quantity,
    0
  );
  const costTotalRounded = Math.ceil(costTotal * 100) / 100; // so price is cut off after two decimal points

  return (
    <section className={className}>
      <span className="detail_label">Item(s) total:</span>
      <span>{costTotalRounded} $</span>
      <span className="detail_label">Shipping:</span>
      <span>5 $</span>
      <span className="detail_label">Total:</span>
      <span className="bold">
        {costTotalRounded ? `${costTotalRounded + 5} $` : '--'}
      </span>
    </section>
  );
}
