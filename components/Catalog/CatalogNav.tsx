import React from 'react';
import styles from '../../styles/CatalogNav.module.scss';
import LegoLego from '../svg/LegoLogo';
import Icon from '../Icon';

import LanguageSvg from '../svg/LanguageSvg';
import AccountSvg from '../svg/AccountSvg';
import Link from 'next/link';
import NavCart from '../NavCart';

export default function CatalogNav() {
  return (
    <nav className={styles.main}>
      <Link href="/">
        <header className={styles.header}>
          <LegoLego size="50" />
          <h3>CATALOG</h3>
        </header>
      </Link>
      <div className={`${styles.nav_item} inactive`}>Catalog</div>
      <div className={`${styles.nav_item} inactive`}>Characters</div>
      <div className={`${styles.nav_item} inactive`}>Brand</div>
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
    </nav>
  );
}
