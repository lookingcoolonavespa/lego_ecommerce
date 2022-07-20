import React from 'react';
import styles from '../styles/Header.module.scss';

import hero_img from '../public/images/lego_header.png';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.main}>
      <div className={styles.text_block}>
        <h2>
          <p>Celebrate Our 90th</p>
          <p>Anniversary</p>
        </h2>
        <Link href="/shop">
          <button type="button">SHOP NOW</button>
        </Link>
      </div>
    </header>
  );
}
