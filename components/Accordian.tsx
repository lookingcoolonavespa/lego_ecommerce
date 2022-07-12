import React, { useState, ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from '../styles/Accordion.module.scss';
import ArrowSvg from './svg/ArrowSvg';

interface Props {
  className: string;
  title: string;
  insides: ReactNode;
}

export default function Accordion({ className, title, insides }: Props) {
  const [visible, setVisible] = useState(false);

  const spring = useSpring({
    height: visible ? '0%' : '100%',
  });
  return (
    <div className={className}>
      <div className={styles.title_row}>
        <div
          className={styles.title}
          onClick={() => setVisible((prev) => !prev)}
        >
          {title}
        </div>
        <div className={styles.arrowIcon}>
          <ArrowSvg dir={visible ? 'up' : 'down'} />
        </div>
      </div>
      {visible && <animated.div style={spring}>{insides}</animated.div>}
    </div>
  );
}
