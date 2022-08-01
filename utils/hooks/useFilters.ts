import { useState, useReducer, useMemo } from 'react';
import { ProductThemes, AgeGroup } from '../../types/types';
import { isProductTheme, isAgeGroup } from '../../types/typeGuards';
import { ProductWithCatsInterface, Filters } from '../../types/interfaces';

export default function useFilters(
  products: ProductWithCatsInterface[],
  filtersActive: boolean,
  turnOffFilters: () => void
) {
  const initFiltersState: Filters = {
    price: {
      min: 0,
      max: 0,
    },
    theme: [],
    age: [],
    search: '',
  };

  const [filters, setFilters] = useReducer(
    (
      prev: Filters,
      action:
        | {
            type: 'priceMin' | 'priceMax';
            payload: number;
          }
        | {
            type: 'theme';
            payload: ProductThemes;
          }
        | {
            type: 'age';
            payload: AgeGroup;
          }
        | {
            type: 'search';
            payload: string;
          }
        | { type: 'reset'; payload?: null }
    ): Filters => {
      const { type, payload } = action;

      const noFiltersLeft = !prev.age.length && !prev.theme.length;
      const noPriceFilters =
        (!prev.price.max && type === 'priceMin' && payload === 0) ||
        (!prev.price.min && type === 'priceMax' && payload === 0);

      if (noFiltersLeft && noPriceFilters) turnOffFilters();

      switch (type) {
        case 'priceMin': {
          if (payload < 0) return prev;
          if (payload > 9999) return prev;

          return { ...prev, price: { ...prev.price, min: payload } };
        }
        case 'priceMax': {
          if (payload < 0) return prev;
          if (payload > 9999) return prev;

          return { ...prev, price: { ...prev.price, max: payload } };
        }
        case 'theme': {
          if (prev.theme.includes(payload)) {
            const noFiltersLeft = prev.theme.length === 1 && !prev.age.length;
            const noPriceFilters = !prev.price.max && !prev.price.min;
            if (noFiltersLeft && noPriceFilters) turnOffFilters();
            return { ...prev, theme: prev.theme.filter((t) => t !== payload) };
          }
          return { ...prev, theme: [...prev.theme, payload] };
        }
        case 'age': {
          if (prev.age.includes(payload)) {
            const noFiltersLeft = prev.age.length === 1 && !prev.theme.length;
            const noPriceFilters = !prev.price.max && !prev.price.min;
            if (noFiltersLeft && noPriceFilters) turnOffFilters();
            return { ...prev, age: prev.age.filter((t) => t !== payload) };
          }
          return { ...prev, age: [...prev.age, payload] };
        }
        case 'search': {
          return { ...prev, search: payload };
        }
        case 'reset': {
          return initFiltersState;
        }
        default:
          return prev;
      }
    },
    initFiltersState
  );

  function resetFilters() {
    setFilters({ type: 'reset' });
    turnOffFilters();
  }

  const matchSearch = useMemo(
    () => products.filter((product) => product.title.includes(filters.search)),
    [filters.search, products]
  );

  const betweenPriceFilters = useMemo(() => {
    let { max, min } = filters.price;
    if (min && !max) max = Infinity;
    if (max && !min) min = -Infinity;

    if (max <= min || !filtersActive) return matchSearch;

    return matchSearch.filter((product) => {
      const price = Number(product.price);
      return price >= min && price <= max;
    });
  }, [filtersActive, filters.price, matchSearch]);

  const filtered = useMemo(() => {
    if (!filtersActive || (!filters.theme.length && !filters.age.length))
      return betweenPriceFilters;

    return betweenPriceFilters.filter((product) => {
      return (
        filters.theme.includes(product.theme) ||
        filters.age.includes(product.ageGroup)
      );
    });
  }, [filters.age, filters.theme, filtersActive, betweenPriceFilters]);
  return {
    filters,
    filtered,
    setFilters,
    resetFilters,
  };
}
