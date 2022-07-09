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
        <h3>stay up to date</h3>
        <p>Enter your email below to stay up to date.</p>
        <input type="text" name="email" placeholder="email" />
        <button>Sign up</button>
      </form>
    </section>
  );
}
