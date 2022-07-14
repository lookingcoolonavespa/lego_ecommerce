import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { useSpring, animated, useTransition } from 'react-spring';
import styles from '../styles/Accordion.module.scss';
import ArrowSvg from './svg/ArrowSvg';

interface Props {
  className: string;
  title: string;
  insides: ReactNode;
}

export default function Accordion({ className, title, insides }: Props) {
  const [visible, setVisible] = useState(false);
  const transition = useTransition(visible, {
    from: { maxHeight: '0px', transform: 'translateY(0%)' },
    enter: {
      maxHeight: `${300}px`,
      transform: 'translateY(0%)',
    },
    leave: {
      maxHeight: '0px',
      transform: `translateY(-100%)`,
    },
  });

  const contentNode = useRef<HTMLDivElement | null>(null);

  const rootClasses = [styles.main];
  if (className) rootClasses.push(className);
  return (
    <div className={rootClasses.join(' ')}>
      <div
        className={`${styles.title_row} accordion_title_row`}
        onClick={() => setVisible((prev) => !prev)}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.arrowIcon}>
          <ArrowSvg dir={visible ? 'up' : 'down'} />
        </div>
      </div>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              ref={contentNode}
              className={styles.content}
              style={style}
            >
              {insides}
            </animated.div>
          )
      )}
    </div>
  );
}
