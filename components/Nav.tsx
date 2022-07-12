import React, { useState } from 'react';
import styles from '../styles/Nav.module.scss';
import Icon from './Icon';

import LegoLego from './svg/LegoLogo';
import MenuSvg from './svg/MenuSvg';
import LanguageSvg from './svg/LanguageSvg';
import AccountSvg from './svg/AccountSvg';
import CartSvg from './svg/CartSvg';

interface Props {
  mobile: boolean;
}

export default function Nav({ mobile }: Props) {
  const [visible, setVisible] = useState(false);
  const desktopView = (
    <nav className={`${styles.main} ${styles.desktop}`}>
      <section className={styles.left}>
        <div className={`centered`}>
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
          <Icon svg={<LanguageSvg />} text="English" />
        </div>
        <div className={styles.nav_item}>
          <Icon svg={<AccountSvg />} text="Sign in" />
        </div>
        <div className={styles.nav_item}>
          <Icon svg={<CartSvg />} />
        </div>
      </section>
    </nav>
  );

  const mobileIconSize = '20';
  const mobileView = (
    <nav className={`${styles.main} ${styles.mobile}`}>
      <section className={styles.left}>
        <div className={`centered`}>
          <div className={styles.logo_wrapper}>
            {<LegoLego width="30" height="auto" />}
          </div>
        </div>
        <button aria-label="hamburger menu">
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
        <div className={styles.nav_item}>
          <Icon svg={<CartSvg size={mobileIconSize} />} />
        </div>
      </section>
    </nav>
  );
  return <>{mobile ? mobileView : desktopView}</>;
}
