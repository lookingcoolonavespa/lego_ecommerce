import { AGE_GROUPS, PRODUCT_THEMES } from '../utils/constants';
import { AgeGroup, ProductThemes } from './types';

export const isProductTheme = (x: any): x is ProductThemes =>
  PRODUCT_THEMES.includes(x);

export const isAgeGroup = (x: any): x is AgeGroup => AGE_GROUPS.includes(x);
