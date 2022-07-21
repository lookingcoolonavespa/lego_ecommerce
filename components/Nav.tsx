import React, { useContext, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import styles from '../styles/Nav.module.scss';
import Icon from './Icon';

import LegoLego from './svg/LegoLogo';
import MenuSvg from './svg/MenuSvg';
import LanguageSvg from './svg/LanguageSvg';
import AccountSvg from './svg/AccountSvg';
import CartSvg from './svg/CartSvg';
import Link from 'next/link';
import CartContext from '../utils/CartContext';
import NavCart from './NavCart';

interface Props {
  mobile: boolean;
}

export default function Nav({ mobile }: Props) {
  const [visible, setVisible] = useState(false);
  const transition = useTransition(visible, {
    from: { transform: 'translateY(-100%' },
    enter: { transform: 'translateY(0%' },
    leave: { transform: 'translateY(-100%' },
  });

  const desktopView = (
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
                  <a className={styles.nav_item}>Shop</a>
                </Link>
                <div className={styles.nav_item}>Discover</div>
                <div className={styles.nav_item}>Help</div>
              </animated.div>
            )
        )}
    </>
  );
}
