import React from 'react';
import styles from '../styles/Header.module.scss';

import hero_img from '../public/images/lego_header.png';

export default function Header() {
  return (
    <header className={styles.main}>
      <div className={styles.text_block}>
        <h2>
          <p>Celebrate Our 90th</p>
          <p>Anniversary</p>
        </h2>
        <button type="button">SHOP NOW</button>
      </div>
    </header>
  );
}
