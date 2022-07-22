import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Catalog.module.scss';
import { BEST_SELLERS_MULTIPLIED } from '../utils/constants';
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

const PRODUCTS_ON_PAGE = 30;

export default function Catalog({
  bestSellers = BEST_SELLERS_MULTIPLIED,
}: Props) {
  const [priceFilters, setPriceFilters] = useState({ min: 0, max: 0 });
  const [themeFilters, setThemeFilters] = useState<ProductThemes[]>([]);
  const [ageFilters, setAgeFilters] = useState<AgeGroup[]>([]);
  const [filtersActive, setFiltersActive] = useState(false);

  const [page, setPage] = useState(1);

  const [sortMethod, setSortMethod] = useState<
    'Popular' | 'Price: High to Low' | 'Price: Low to High'
  >('Popular');

  function setFilters(
    type: 'priceMin' | 'priceMax' | 'theme' | 'age',
    payload: number | ProductThemes | AgeGroup
  ) {
    switch (type) {
      case 'priceMin':
        return setPriceFilters((prev) => {
          const value = payload as number;
          if (Number(value) < 0) return prev;
          if (Number(value) > 9999) return prev;

          return { ...prev, min: value };
        });
      case 'priceMax':
        return setPriceFilters((prev) => {
          const value = payload as number;
          if (Number(value) < 0) return prev;
          if (Number(value) > 9999) return prev;

          return { ...prev, max: value };
        });
      case 'theme':
        return setThemeFilters((prev) => {
          if (!isProductTheme(payload)) return prev;

          const value = payload;
          if (prev.includes(value)) return prev.filter((t) => t !== value);
          return [...prev, value];
        });
      case 'age':
        return setAgeFilters((prev) => {
          if (!isAgeGroup(payload)) return prev;

          const value = payload;
          if (prev.includes(value)) return prev.filter((t) => t !== value);
          return [...prev, value];
        });
    }
  }

  function resetFilters() {
    setPriceFilters({ min: 0, max: 0 });
    setThemeFilters([]);
    setAgeFilters([]);
  }

  const themeCount = bestSellers.reduce(
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
  );

  const ageCount = bestSellers.reduce(
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
  );

  bestSellers = filtersActive
    ? bestSellers.filter((product) => {
        return (
          themeFilters.includes(product.theme) ||
          ageFilters.includes(product.ageGroup)
        );
      })
    : bestSellers;

  const sorted =
    sortMethod === 'Popular'
      ? bestSellers
      : [...bestSellers].sort((a, b) => {
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

  const footer = useRef<HTMLElement | null>(null);
  const scroller = useRef<HTMLUListElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleScroll() {
      // push the content down as you scroll until scroller reaches the bottom
      // this way the content "sticks" until the scroller is done scrolling
      if (!footer.current || !scroller.current || !container.current) return;
      scroller.current.scroll({
        top: window.scrollY,
        behavior: 'smooth',
      });

      const scrollerHeight = Number(
        window.getComputedStyle(scroller.current).height.slice(0, -2)
      );

      if (
        (scroller.current.scrollHeight >
          scroller.current.scrollTop + scrollerHeight &&
          window.scrollY <= scroller.current.scrollHeight) ||
        (scroller.current.scrollHeight ===
          scroller.current.scrollTop + scrollerHeight - 0.2 &&
          window.scrollY <= scroller.current.scrollHeight)
      ) {
        container.current.style.top = window.scrollY + 'px';
        footer.current.style.marginTop = window.scrollY + 'px';
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  useEffect(
    function resetScrollOnPageChange() {
      if (!footer.current || !scroller.current || !container.current) return;
      window.scrollTo(0, 0);
      // scroller.current.scrollTop = 0;
      // container.current.style.top = window.scrollY + 'px';
      // footer.current.style.marginTop = window.scrollY + 'px';
    },
    [page]
  );

  return (
    <Layout mobile={false} className={styles.layout} footerRef={footer}>
      <div ref={container} className={styles.container}>
        <CatalogNav />
        <div className={styles.content}>
          <Sidebar
            themeFilters={themeFilters}
            ageFilters={ageFilters}
            priceFilters={priceFilters}
            className={styles.sidebar}
            setFilters={setFilters}
            resetFilters={resetFilters}
            themeCount={themeCount}
            ageCount={ageCount}
            toggleFilter={() => setFiltersActive((prev) => !prev)}
          />
          <main>
            <div className={styles.main}>
              <div className={styles.subheader}>
                <SearchBar />
                <SortBy sortMethod={sortMethod} setSortMethod={setSortMethod} />
              </div>
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
