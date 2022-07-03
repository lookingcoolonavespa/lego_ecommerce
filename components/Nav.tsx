import React from 'react';
import styles from '../styles/Nav.module.scss';
import Account from './Account';
import CartIcon from './CartIcon';
import Language from './Language';

import LegoLego from './svg/LegoLogo';

export default function Nav() {
  return (
    <nav className={styles.main}>
      <section className={styles.left}>
        <div className={`${styles.no_border} centered`}>
          <div className={styles.logo_wrapper}>
            {<LegoLego width="70" height="auto" />}
          </div>
        </div>
        <div className={styles.nav_item}>Shop</div>
        <div className={styles.nav_item}>Discover</div>
        <div className={styles.nav_item}>Help</div>
      </section>
      <section className={styles.right}>
        <div className={styles.nav_item}>
          <Language />
        </div>
        <div className={styles.nav_item}>
          <Account />
        </div>
        <div className={styles.nav_item}>
          <CartIcon />
        </div>
      </section>
    </nav>
  );
}
