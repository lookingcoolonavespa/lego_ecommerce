import React from 'react';
import styles from '../../styles/CatalogNav.module.scss';
import LegoLego from '../svg/LegoLogo';
import Icon from '../Icon';
import CartSvg from '../svg/CartSvg';
import LanguageSvg from '../svg/LanguageSvg';
import AccountSvg from '../svg/AccountSvg';
import Link from 'next/link';

export default function CatalogNav() {
  return (
    <nav className={styles.main}>
      <Link href="/">
        <header className={styles.header}>
          <LegoLego size="50" />
          <h3>CATALOG</h3>
        </header>
      </Link>
      <div className={styles.nav_item}>Catalog</div>
      <div className={styles.nav_item}>Characters</div>
      <div className={styles.nav_item}>Brand</div>
      <div className={styles.nav_item}>
        <Icon svg={<LanguageSvg />} text="English" />
      </div>
      <div className={styles.nav_item}>
        <Icon svg={<AccountSvg />} text="Sign in" />
      </div>
      <div className={styles.nav_item}>
        <Icon svg={<CartSvg />} />
      </div>
    </nav>
  );
}
