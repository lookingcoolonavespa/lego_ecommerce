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
  const [contentNodeHeight, setContentNodeHeight] = useState('0px');

  const spring = useSpring({
    maxHeight: visible ? contentNodeHeight : '0px',
    transform: visible ? 'translateY(0%)' : 'translateY(-100%)',
  });

  const contentNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentNode.current) return;
    setContentNodeHeight(window.getComputedStyle(contentNode.current).height);
  }, []);

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
      <animated.div className={styles.content} style={spring}>
        {insides}
      </animated.div>
      <div className={styles.hidden} ref={contentNode}>
        {insides}
      </div>
    </div>
  );
}
