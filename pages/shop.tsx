import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/Catalog.module.scss';
import { BEST_SELLERS_MULTIPLIED, PRODUCTS_ON_PAGE } from '../utils/constants';
import { ProductWithCatsInterface } from '../types/interfaces';
import Sidebar from '../components/Catalog/Sidebar';
import CatalogNav from '../components/Catalog/CatalogNav';
import ProductPreview from '../components/ProductPreview';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import { AgeGroup, ProductThemes, SortMethod } from '../types/types';
import useFilters from '../utils/hooks/useFilters';
import useStickyScroll from '../utils/hooks/useStickyScroll';
import { useSpring, animated } from 'react-spring';
import MobileNav from '../components/MobileNav';
import Link from 'next/link';
import Subheader from '../components/Catalog/Subheader';
import ActiveFilterCtn from '../components/Catalog/ActiveFilterCtn';
import Device from '../components/Device/index';

interface Props {
  bestSellers: ProductWithCatsInterface[];
}
let count = 0;
export default function Catalog({
  bestSellers = BEST_SELLERS_MULTIPLIED,
}: Props) {
  const [page, setPage] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [sortMethod, setSortMethod] = useState<SortMethod>('Popular');

  const [filtersActive, setFiltersActive] = useState(false);
  const { filters, filtered, setFilters, resetFilters } = useFilters(
    bestSellers,
    filtersActive,
    () => {
      setFiltersActive(false);
      setPage(1);
    }
  );

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

  const sorted = useMemo(() => {
    return sortMethod === 'Popular'
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
  }, [filtered, sortMethod]);

  const currentPaginationData = useMemo(
    () => sorted.slice((page - 1) * PRODUCTS_ON_PAGE, page * PRODUCTS_ON_PAGE),
    [sorted, page]
  );

  const [spring, springApi] = useSpring(() => ({
    opacity: 0,
    transform: 'translate3d(5%, 10%, 0)',
  }));
  useEffect(() => {
    springApi.start({
      from: {
        opacity: 0,
        transform: 'translate3d(5%, 10%, 0)',
      },
      to: {
        opacity: 1,
        transform: 'translate3d(0%, 0%, 0)',
      },
    });
  }, [currentPaginationData, springApi]);

  const maxPage = Math.ceil(sorted.length / PRODUCTS_ON_PAGE);

  const updatePage = (num: number) => {
    if (num < 1 || num > maxPage) {
      console.log('not a valid page');
      return;
    }

    setPage(num);
  };

  const { footer, container, scroller } = useStickyScroll(page);

  const { max, min } = filters.price;
  const priceMaxActive = min > 0 && max > 0 ? max > min : max > 0;
  const priceMinActive = min > 0 && max > 0 ? max > min : min > 0;

  return (
    <Layout className={styles.layout} footerRef={footer}>
      <div ref={container} className={styles.container}>
        <Device>
          {({ isMobile }) =>
            isMobile || window.innerWidth <= 810 ? (
              <MobileNav
                pulloutChildren={[
                  {
                    href: 'shop',
                    text: 'Catalog',
                  },
                  {
                    href: '',
                    text: 'Characters',
                  },
                  {
                    href: '',
                    text: 'Brand',
                  },
                ]}
              />
            ) : (
              <CatalogNav />
            )
          }
        </Device>
        <Device>
          {({ isMobile }) => (
            <div
              className={`${styles.content} ${
                isMobile || window.innerWidth <= 810 ? 'mobile' : ''
              }`}
            >
              <Sidebar
                themeFilters={filters.theme}
                ageFilters={filters.age}
                priceFilters={filters.price}
                className={`${styles.sidebar} ${
                  sidebarVisible ? 'visible' : ''
                }`}
                setFilters={setFilters}
                resetFilters={resetFilters}
                themeCount={themeCount}
                ageCount={ageCount}
                applyFilter={() => {
                  setPage(1);
                  setFiltersActive(true);
                  isMobile ||
                    (window.innerWidth <= 810 && setSidebarVisible(false));
                }}
                close={() => setSidebarVisible(false)}
                mobile={isMobile || window.innerWidth <= 810}
              />
              <main>
                <div className={styles.main}>
                  <Subheader
                    className={styles.subheader}
                    active={filtersActive}
                    searchVal={filters.search}
                    setSearchVal={(val: string) =>
                      setFilters({ type: 'search', payload: val })
                    }
                    sortMethod={sortMethod}
                    setSortMethod={setSortMethod}
                    mobile={isMobile || window.innerWidth <= 810}
                    showFilterOptions={() => setSidebarVisible(true)}
                  />
                  {filtersActive &&
                    (filters.theme.length ||
                      filters.age.length ||
                      priceMaxActive ||
                      priceMinActive) && (
                      <ActiveFilterCtn
                        className={styles.active_filters_ctn}
                        priceMinActive={priceMinActive}
                        priceMaxActive={priceMaxActive}
                        priceMinFilter={filters.price.min}
                        priceMaxFilter={filters.price.max}
                        themeFilters={filters.theme}
                        ageFilters={filters.age}
                        closeAgeFilter={(val: AgeGroup) => () =>
                          setFilters({ type: 'age', payload: val })}
                        closeThemeFilter={(val: ProductThemes) => () =>
                          setFilters({ type: 'theme', payload: val })}
                        closeMaxFilter={() =>
                          setFilters({ type: 'priceMax', payload: 0 })
                        }
                        closeMinFilter={() =>
                          setFilters({ type: 'priceMin', payload: 0 })
                        }
                      />
                    )}
                  <div className={styles.grid_container}>
                    <ul
                      ref={scroller}
                      className="scroller"
                      aria-label="product list"
                    >
                      {currentPaginationData.map((product, i) => {
                        return (
                          <animated.li key={count++} style={spring}>
                            <ProductPreview
                              product={product}
                              className={styles.product_wrapper}
                              containerSelector={`.${styles.main}`}
                            />
                          </animated.li>
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
          )}
        </Device>
      </div>
    </Layout>
  );
}
