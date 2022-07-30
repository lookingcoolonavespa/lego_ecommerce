import React, { ChangeEvent } from 'react';
import { AgeGroup, ProductThemes } from './types';

export interface SvgProps {
  height: string;
  width: string;
}

export interface ProductInterface {
  imgSrc: string;
  title: string;
  price: string;
}

export interface ProductWithCatsInterface extends ProductInterface {
  theme: ProductThemes;
  ageGroup: AgeGroup;
}

export interface ProductInCartInterface extends ProductInterface {
  quantity: number;
}

export interface LinkInterface {
  text: string;
  href?: string;
}

export interface InputDetailsInterface {
  [key: string]: string | number | ((e: InputEvent) => void) | boolean;
}
interface CheckboxDetailsInterface extends InputDetailsInterface {
  type: 'checkbox';
}

export interface InputStatusInterface {
  message: string;
  type: 'error' | 'success' | undefined;
}

export interface PriceFilterInterface {
  min: number;
  max: number;
}

export interface Filters {
  price: {
    min: number;
    max: number;
  };
  theme: ProductThemes[];
  age: AgeGroup[];
  search: string;
}

export interface InputFieldInterface {
  inputDetails: InputDetailsInterface;
  status: InputStatusInterface;
  label: string;
  dataType: string;
  validator: (val: string) => boolean;
  handleChange?: ((val: string) => void) | ((val: string) => string);
  maxLength?: number;
  halfSize: boolean;
  className?: string;
}
export interface CheckboxInputFieldInterface {
  label: string;
  halfSize: boolean;
  className: string | undefined;
  handleChange: ((val: string) => void) | undefined;
  inputDetails: CheckboxDetailsInterface;
  status: InputStatusInterface;
  validator: (bool: boolean) => boolean;
}
