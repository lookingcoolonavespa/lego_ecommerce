import React, { ReactNode, useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Link from 'next/link';
import styles from '../styles/MobileNav.module.scss';
import LegoLego from './svg/LegoLogo';
import LanguageSvg from './svg/LanguageSvg';
import AccountSvg from './svg/AccountSvg';
import NavCart from './NavCart';
import MenuSvg from './svg/MenuSvg';
import Icon from './Icon';

type PullOutChild = {
  text: string;
  href: string;
};

interface Props {
  pulloutChildren: PullOutChild[];
}

export default function MobileNav({ pulloutChildren }: Props) {
  const [visible, setVisible] = useState(false);
  const transition = useTransition(visible, {
    from: { transform: 'translateY(-100%' },
    enter: { transform: 'translateY(0%' },
    leave: { transform: 'translateY(-100%' },
  });

  useEffect(() => {
    function closePullOut() {
      setVisible(false);
    }

    window.addEventListener('click', closePullOut);

    return () => window.removeEventListener('click', closePullOut);
  }, []);

  const mobileIconSize = '20';

  return (
    <>
      <nav className={`${styles.main} ${styles.mobile}`}>
        <section className={styles.left}>
          <Link href="/">
            <a className={`centered`}>
              <div className={styles.logo_wrapper}>
                {<LegoLego size="30" />}
              </div>
            </a>
          </Link>
          <button
            aria-label="hamburger menu"
            onClick={(e) => {
              e.stopPropagation();
              setVisible((prev) => !prev);
            }}
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
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className={styles.pullout_menu}
              onClick={(e) => e.stopPropagation()}
            >
              {pulloutChildren.map((pc) => (
                <Link key={pc.text} href={`/${pc.href}`}>
                  <a
                    className={styles.nav_item}
                    onClick={(e) => {
                      if (!pc.href) e.preventDefault();
                    }}
                  >
                    {pc.text}
                  </a>
                </Link>
              ))}
            </animated.div>
          )
      )}
    </>
  );
}
