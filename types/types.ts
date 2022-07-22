import { AGE_GROUPS, PRODUCT_THEMES } from '../utils/constants';

export type PaginationType = (number | '...')[];

export type ProductThemes = typeof PRODUCT_THEMES[number];

export type AgeGroup = typeof AGE_GROUPS[number];
