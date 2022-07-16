import React from 'react';
import Accordion from '../Accordian';
import styles from '../../styles/OptionsFilter.module.scss';

interface Props {
  title: string;
  options: string[];
  className: string;
}

export default function OptionsFilter({ title, className, options }: Props) {
  return (
    <Accordion
      title={title}
      className={`${styles.main} ${className}`}
      insides={
        <>
          {options.map((option) => {
            return (
              <div key={option} className={styles.checkbox_wrapper}>
                <label>
                  <input type="checkbox" />
                  <span className={styles.checkbox} />
                  <span className={styles.label_text}>{option}</span>
                </label>
              </div>
            );
          })}
        </>
      }
    />
  );
}
