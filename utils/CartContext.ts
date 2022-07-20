import { createContext } from 'react';

const CartContext = createContext<{ [key: string]: any }>({});

export default CartContext;
