import React from 'react';
import styles from '../styles/Catalog.module.scss';
import axios from 'axios';
import { BEST_SELLERS } from '../utils/constants';
import { ProductInterface } from '../types/interfaces';

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
        recommended: BEST_SELLERS,
      },
    };
  }
}

interface Props {
  bestSellers: ProductInterface[];
}

export default function Catalog({ bestSellers }: Props) {
  return (
    <main className={styles.main}>
      <section className={styles.left_sidebar}>
        {
          //logo
          // breadcrumbs
          // price
          // theme
          // age
          // characters
        }
      </section>
    </main>
  );
}
