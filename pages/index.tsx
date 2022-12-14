import type { NextPage } from 'next';
import Head from 'next/head';
import Nav from '../components/Nav';
import Header from '../components/Header';
import styles from '../styles/Home.module.scss';
import ProductSlider from '../components/ProductSlider';
import { ProductInterface } from '../types/interfaces';
import { RECOMMENDED } from '../utils/constants';
import SignUpHero from '../components/SignUpHero';
import Layout from '../components/Layout';
import Device from '../components/Device/index';
import MobileNav from '../components/MobileNav';
import Link from 'next/link';

interface Props {
  recommended: ProductInterface[];
}
const Home: NextPage<Props> = ({
  recommended = RECOMMENDED as ProductInterface[],
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Device>
        {({ isMobile }) =>
          isMobile ? (
            <MobileNav
              pulloutChildren={[
                {
                  href: 'shop',
                  text: 'Shop',
                },
                {
                  href: '',
                  text: 'Discover',
                },
                {
                  href: '',
                  text: 'Help',
                },
              ]}
            />
          ) : (
            <Nav />
          )
        }
      </Device>
      <Header />
      <Layout>
        <main className={styles.main}>
          <ProductSlider title="recommended for you" products={recommended} />
          <SignUpHero />
          <ProductSlider
            title="featured sets"
            products={[...recommended].reverse()}
          />
        </main>
      </Layout>
    </div>
  );
};

export default Home;
