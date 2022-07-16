import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Image from 'next/image';
import HeroImg from '../public/images/favpng_lego-minifigures-online-toy.png';
import styles from '../styles/SignUpHero.module.scss';
import useEmail from '../utils/useEmail';
import InputWrapper from './InputWrapperWithError';

export default function SignUpHero() {
  const { email, inputStatus, submit, handleChange } = useEmail();

  const spring = useSpring({
    transform: inputStatus.type ? `translateY(2em)` : 'translateY(0em)',
  });

  return (
    <section className={styles.main}>
      <div className={styles.img_col}>
        <Image src={HeroImg} alt="lego man in a chicken suit" />
      </div>
      <form className={styles.text_block} onSubmit={submit}>
        <h3>stay up to date</h3>
        <p>Enter your email below to stay up to date.</p>
        <InputWrapper
          inputDetails={{
            type: 'text',
            name: 'email',
            placeholder: 'email',
            value: email,
            onChange: handleChange,
          }}
          inputStatus={inputStatus}
        />

        <animated.button className="flat_btn" style={spring}>
          Sign up
        </animated.button>
      </form>
    </section>
  );
}
