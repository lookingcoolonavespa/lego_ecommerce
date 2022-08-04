import React from 'react';
import styles from '../styles/Nav.module.scss';
import Icon from './Icon';

import LegoLego from './svg/LegoLogo';
import LanguageSvg from './svg/LanguageSvg';
import AccountSvg from './svg/AccountSvg';
import Link from 'next/link';
import NavCart from './NavCart';

export default function Nav() {
  return (
    <nav className={`${styles.main} ${styles.desktop}`}>
      <section className={styles.left}>
        <Link href="/">
          <a className={`centered`}>
            <div className={styles.logo_wrapper}>{<LegoLego size="70" />}</div>
          </a>
        </Link>
        <Link href="/shop">
          <a className={styles.nav_item}>Shop</a>
        </Link>
        <div className={`${styles.nav_item} inactive`}>Discover</div>
        <div className={`${styles.nav_item} inactive`}>Help</div>
      </section>
      <section className={styles.right}>
        <div className={`${styles.nav_item} inactive`}>
          <Icon svg={<LanguageSvg />} text="English" />
        </div>
        <div className={`${styles.nav_item} inactive`}>
          <Icon svg={<AccountSvg />} text="Sign in" />
        </div>
        <Link href="/cart">
          <a className={styles.nav_item}>
            <NavCart />
          </a>
        </Link>
      </section>
    </nav>
  );
}
