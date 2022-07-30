import { AGE_GROUPS, PRODUCT_THEMES } from '../utils/constants';
import { InputFieldInterface, CheckboxInputFieldInterface } from './interfaces';

export type PaginationType = (number | '...' | '--')[];

export type ProductThemes = typeof PRODUCT_THEMES[number];

export type AgeGroup = typeof AGE_GROUPS[number];

export type CheckoutFormTitles =
  | 'Personal Information'
  | 'Shipping Address'
  | 'Billing Information';

export type InputFields = Record<CheckoutFormTitles, InputFieldInterface[]>;

export type CheckoutPageRange = 1 | 2 | 3;
