import { NumericDictionary } from 'cypress/types/lodash';
import React, { ChangeEvent } from 'react';

export interface SvgProps {
  height: string;
  width: string;
}

export interface ProductInterface {
  imgSrc: string;
  title: string;
  price: string;
}

export interface ProductInCartInterface extends ProductInterface {
  quantity: number;
}

export interface LinkInterface {
  text: string;
  href?: string;
}

export interface InputDetailsInterface {
  [key: string]: string | number | ((e: InputEvent) => void);
}

export interface InputStatusInterface {
  message: string;
  type: 'error' | 'success' | undefined;
}

export interface PriceFilterInterface {
  min: number;
  max: number;
}
