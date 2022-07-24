import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from '../styles/Catalog.module.scss';
import { BEST_SELLERS_MULTIPLIED, PRODUCTS_ON_PAGE } from '../utils/constants';
import { ProductWithCatsInterface } from '../types/interfaces';
import Sidebar from '../components/Catalog/Sidebar';
import CatalogNav from '../components/Catalog/CatalogNav';
import SortBy from '../components/Catalog/SortBy';
import SearchBar from '../components/Catalog/SearchBar';
import ProductPreview from '../components/ProductPreview';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import { AgeGroup, ProductThemes } from '../types/types';
import { isAgeGroup, isProductTheme } from '../types/typeGuards';
import ActiveFilter from '../components/Catalog/ActiveFilter';
import useFilters from '../utils/useFilters';
import useStickyScroll from '../utils/useStickyScroll';

// export async function getStaticProps() {
//   try {
//     const res = await axios.get('/api/bestSellers');

//     if (res.status !== 200) {
//       throw new Error('something changed on the lego catalog page');
//     }

//     const products = await res.data;
//     return {
//       props: {
//         bestSellers: products
//           .filter((p: any) => p)
//           .map((product: any) => {
//             return {
//               ...product,
//               price: product.price.replace('Price$', ''),
//             };
//           }),
//       },
//     };
//   } catch (err) {
//     if (err instanceof Error) console.log(err.message);

//     if (axios.isAxiosError(err)) {
//       switch (err.status) {
//         case '500':
//           console.log('something changed on lego catalog page');
//           break;
//         default:
//           console.log(err.response?.statusText);
//       }
//     }

//     return {
//       props: {
//         bestSellers: BEST_SELLERS_MULTIPLIED,
//       },
//     };
//   }
// }

interface Props {
  bestSellers: ProductWithCatsInterface[];
}

export default function Catalog({
  bestSellers = BEST_SELLERS_MULTIPLIED,
}: Props) {
  const [page, setPage] = useState(1);

  const [sortMethod, setSortMethod] = useState<
    'Popular' | 'Price: High to Low' | 'Price: Low to High'
  >('Popular');

  const {
    filters,
    filtered,
    filtersActive,
    setFiltersActive,
    setFilters,
    resetFilters,
  } = useFilters(bestSellers);

  const themeCount = useMemo(
    () =>
      bestSellers.reduce(
        (acc: { [key in ProductThemes]: number }, curr) => {
          acc[curr.theme]++;
          return acc;
        },
        {
          Space: 0,
          Ninja: 0,
          Transport: 0,
          Buildings: 0,
          Homes: 0,
        }
      ),
    [bestSellers]
  );

  const ageCount = useMemo(
    () =>
      bestSellers.reduce(
        (acc: { [key in AgeGroup]: number }, curr) => {
          acc[curr.ageGroup]++;
          return acc;
        },
        {
          'Up to a year': 0,
          '1 year - 2 years': 0,
          '3 years - 5 years': 0,
          '6 years - 10 years': 0,
          'Older than 12 years': 0,
        }
      ),
    [bestSellers]
  );

  const sorted =
    sortMethod === 'Popular'
      ? filtered
      : [...filtered].sort((a, b) => {
          switch (sortMethod) {
            case 'Price: High to Low': {
              return Number(b.price) - Number(a.price);
            }
            case 'Price: Low to High': {
              return Number(a.price) - Number(b.price);
            }
          }
        });

  const currentPaginationData = sorted.slice(
    (page - 1) * PRODUCTS_ON_PAGE,
    page * PRODUCTS_ON_PAGE
  );

  const maxPage = Math.ceil(bestSellers.length / PRODUCTS_ON_PAGE);

  const updatePage = (num: number) => {
    if (num < 1 || num > maxPage) {
      console.log('not a valid page');
      return;
    }

    setPage(num);
  };

  const { footer, container, scroller } = useStickyScroll(page);

  return (
    <Layout mobile={false} className={styles.layout} footerRef={footer}>
      <div ref={container} className={styles.container}>
        <CatalogNav />
        <div className={styles.content}>
          <Sidebar
            themeFilters={filters.theme}
            ageFilters={filters.age}
            priceFilters={filters.price}
            className={styles.sidebar}
            setFilters={setFilters}
            resetFilters={resetFilters}
            themeCount={themeCount}
            ageCount={ageCount}
            toggleFilter={() => setFiltersActive((prev) => !prev)}
          />
          <main>
            <div className={styles.main}>
              <div
                className={styles.subheader}
                style={filtersActive ? { marginBottom: '2em' } : undefined}
              >
                <SearchBar
                  value={filters.search}
                  setSearchFilter={(val: string) =>
                    setFilters({ type: 'search', payload: val })
                  }
                />
                <SortBy sortMethod={sortMethod} setSortMethod={setSortMethod} />
              </div>
              {filtersActive && (
                <div className={styles.active_filters_ctn}>
                  {filters.theme.map((v) => (
                    <ActiveFilter
                      key={v}
                      className={styles.active_filter}
                      text={v}
                      close={() => setFilters({ type: 'theme', payload: v })}
                    />
                  ))}
                  {filters.age.map((v) => (
                    <ActiveFilter
                      key={v}
                      className={styles.active_filter}
                      text={v}
                      close={() => setFilters({ type: 'age', payload: v })}
                    />
                  ))}
                </div>
              )}
              <div className={styles.grid_container}>
                <ul
                  ref={scroller}
                  className="scroller"
                  aria-label="product list"
                >
                  {currentPaginationData.map((product, i) => {
                    return (
                      <li key={i}>
                        <ProductPreview
                          product={product}
                          className={styles.product_wrapper}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <Pagination
              currentPage={page}
              maxPage={maxPage}
              onPageChange={updatePage}
            />
          </main>
        </div>
      </div>
    </Layout>
  );
}
