import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import styles from '../../styles/CatalogNav.module.scss';
import LegoLego from '../svg/LegoLogo';
import Icon from '../Icon';
import CartSvg from '../svg/CartSvg';
import MenuSvg from '../svg/MenuSvg';

import LanguageSvg from '../svg/LanguageSvg';
import AccountSvg from '../svg/AccountSvg';
import Link from 'next/link';
import NavCart from '../NavCart';

interface Props {
  mobile: boolean;
}

export default function CatalogNav({ mobile }: Props) {
  const [visible, setVisible] = useState(false);
  const transition = useTransition(visible, {
    from: { transform: 'translateY(-100%' },
    enter: { transform: 'translateY(0%' },
    leave: { transform: 'translateY(-100%' },
  });
  const desktopView = (
    <nav className={`${styles.main} ${styles.desktop}`}>
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

  const mobileIconSize = '20';
  const mobileView = (
    <nav className={`${styles.main} ${styles.mobile}`}>
      <section className={styles.left}>
        <Link href="/">
          <a className={`centered`}>
            <div className={styles.logo_wrapper}>{<LegoLego size="30" />}</div>
          </a>
        </Link>
        <button
          aria-label="hamburger menu"
          onClick={() => setVisible((prev) => !prev)}
        >
          <MenuSvg />
        </button>
      </section>
      <section className={styles.right}>
        <div className={styles.nav_item}>
          <Icon svg={<LanguageSvg size={mobileIconSize} />} />
        </div>
        <div className={styles.nav_item}>
          <Icon svg={<AccountSvg size={mobileIconSize} />} />
        </div>
        <Link href="/cart">
          <a className={styles.nav_item}>
            <NavCart iconSize={mobileIconSize} />
          </a>
        </Link>
      </section>
    </nav>
  );

  return (
    <>
      {mobile ? mobileView : desktopView}
      {mobile &&
        transition(
          (style, item) =>
            item && (
              <animated.div style={style} className={styles.pullout_menu}>
                <Link href="/shop">
                  <a className={styles.nav_item}>Catalog</a>
                </Link>
                <div className={styles.nav_item}>Characters</div>
                <div className={styles.nav_item}>Brand</div>
              </animated.div>
            )
        )}
    </>
  );
}
