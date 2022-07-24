import { useState, useReducer } from 'react';
import { ProductThemes, AgeGroup } from '../types/types';
import { isProductTheme, isAgeGroup } from '../types/typeGuards';
import { ProductWithCatsInterface, Filters } from '../types/interfaces';

export default function useFilters(products: ProductWithCatsInterface[]) {
  const [filtersActive, setFiltersActive] = useState(false);

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
      action: {
        type: 'priceMin' | 'priceMax' | 'theme' | 'age' | 'search' | 'reset';
        payload?: number | ProductThemes | AgeGroup | string;
      }
    ): Filters => {
      const { type, payload } = action;

      switch (type) {
        case 'priceMin': {
          if (typeof payload !== 'number') return prev;
          if (Number(payload) < 0) return prev;
          if (Number(payload) > 9999) return prev;

          return { ...prev, price: { ...prev.price, min: payload } };
        }
        case 'priceMax': {
          if (typeof payload !== 'number') return prev;
          if (Number(payload) < 0) return prev;
          if (Number(payload) > 9999) return prev;

          return { ...prev, price: { ...prev.price, max: payload } };
        }
        case 'theme': {
          if (!isProductTheme(payload)) return prev;

          if (prev.theme.includes(payload)) {
            if (prev.theme.length === 1) setFiltersActive(false);
            return { ...prev, theme: prev.theme.filter((t) => t !== payload) };
          }
          return { ...prev, theme: [...prev.theme, payload] };
        }
        case 'age': {
          if (!isAgeGroup(payload)) return prev;

          if (prev.age.includes(payload)) {
            if (prev.age.length === 1) setFiltersActive(false);
            return { ...prev, age: prev.age.filter((t) => t !== payload) };
          }
          return { ...prev, age: [...prev.age, payload] };
        }
        case 'search': {
          if (typeof payload !== 'string') return prev;
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
    setFiltersActive(false);
  }

  const filtered = filtersActive
    ? products.filter((product) => {
        return (
          filters.theme.includes(product.theme) ||
          filters.age.includes(product.ageGroup)
        );
      })
    : products;

  return {
    filters,
    filtered,
    filtersActive,
    setFiltersActive,
    setFilters,
    resetFilters,
  };
}