import { AGE_GROUPS, PRODUCT_THEMES } from '../utils/constants';
import { CheckboxInputFieldInterface } from './interfaces';
import { AgeGroup, ProductThemes } from './types';

export const isProductTheme = (x: any): x is ProductThemes =>
  PRODUCT_THEMES.includes(x);

export const isAgeGroup = (x: any): x is AgeGroup => AGE_GROUPS.includes(x);

export const isCheckbox = (x: any): x is CheckboxInputFieldInterface =>
  x.inputDetails.type === 'checkbox';
