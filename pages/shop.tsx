import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Catalog.module.scss';
import axios from 'axios';
import { BEST_SELLERS } from '../utils/constants';
import { ProductInterface } from '../types/interfaces';
import Sidebar from '../components/Catalog/Sidebar';
import CatalogNav from '../components/Catalog/CatalogNav';
import SortBy from '../components/Catalog/SortBy';
import SearchBar from '../components/Catalog/SearchBar';
import ProductPreview from '../components/ProductPreview';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';

export async function getStaticProps() {
  try {
    const res = await axios.get('/api/bestSellers');

    if (res.status !== 200) {
      throw new Error('something changed on the lego catalog page');
    }

    const products = await res.data;
    return {
      props: {
        bestSellers: products
          .filter((p: any) => p)
          .map((product: any) => {
            return {
              ...product,
              price: product.price.replace('Price$', ''),
            };
          }),
      },
    };
  } catch (err) {
    if (err instanceof Error) console.log(err.message);

    if (axios.isAxiosError(err)) {
      switch (err.status) {
        case '500':
          console.log('something changed on lego catalog page');
          break;
        default:
          console.log(err.response?.statusText);
      }
    }

    return {
      props: {
        bestSellers: BEST_SELLERS,
      },
    };
  }
}

interface Props {
  bestSellers: ProductInterface[];
}

const PRODUCTS_ON_PAGE = 10;

export default function Catalog({ bestSellers }: Props) {
  const [priceFilters, setPriceFilters] = useState({ min: 0, max: 0 });
  const [page, setPage] = useState(1);

  const currentPaginationData = bestSellers.slice(
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

  return (
    <Layout mobile={false} className={styles.layout}>
      <div className={styles.container}>
        <CatalogNav />
        <div className={styles.content}>
          <Sidebar
            priceFilters={priceFilters}
            className={styles.sidebar}
            setPriceFilters={setPriceFilters}
          />
          <main>
            <div className={styles.main}>
              <header>
                <h2>Catalog</h2>
              </header>
              <div className={styles.subheader}>
                <SearchBar />
                <SortBy />
              </div>
              <div className={styles.grid_container}>
                <ul className="scroller" aria-label="product list">
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
