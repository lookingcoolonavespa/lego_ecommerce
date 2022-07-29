import { AGE_GROUPS, PRODUCT_THEMES } from '../utils/constants';
import { InputFieldInterface } from './interfaces';

export type PaginationType = (number | '...' | '--')[];

export type ProductThemes = typeof PRODUCT_THEMES[number];

export type AgeGroup = typeof AGE_GROUPS[number];

export type InputFields = {
  [key: number]: InputFieldInterface[];
};

export type CheckoutPageRange = 1 | 2 | 3;
