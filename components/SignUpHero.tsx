import React from 'react';
import Image from 'next/image';
import HeroImg from '../public/images/favpng_lego-minifigures-online-toy.png';
import styles from '../styles/SignUpHero.module.scss';

export default function SignUpHero() {
  return (
    <section className={styles.main}>
      <div className={styles.img_col}>
        <Image src={HeroImg} alt="lego man in a chicken suit" />
      </div>
      <form className={styles.text_block}>
        <h3>Sign Up</h3>
        <p>Loream ipsum</p>
        <input type="text" />
        <button>Sign up</button>
      </form>
    </section>
  );
}
