import React from 'react';
import Accordion from '../Accordian';
import styles from '../../styles/OptionsFilter.module.scss';

interface OptionsAsArray<Options> {
  title: string;
  options: Options[];
  className: string;
  selected: Options[];
  selectOption: (option: Options) => void;
  name?: string;
}

interface OptionsAsObject<T, K extends keyof T> {
  title: string;
  options: T;
  className: string;
  selected: K[];
  selectOption: (option: K) => void;
  name?: string;
}

export default function OptionsFilter({
  title,
  className,
  options,
  selected,
  selectOption,
  name,
}:
  | OptionsAsArray<string>
  | OptionsAsObject<{ [key: string]: number }, string>) {
  return (
    <Accordion
      title={title}
      className={`${styles.main} ${className}`}
      name={name}
      insides={
        <>
          {Array.isArray(options)
            ? options.map((option) => {
                return (
                  <li key={option} className={styles.checkbox_wrapper}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        value={option}
                        onChange={(e) => {
                          selectOption(e.target.value);
                        }}
                      />
                      <span className={styles.checkbox} />
                      <span className={styles.label_text}>{option}</span>
                    </label>
                  </li>
                );
              })
            : Object.entries(options).map((subArray) => {
                const [option, count] = subArray;

                return (
                  <li key={option} className={styles.checkbox_wrapper}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        value={option}
                        onChange={(e) => {
                          selectOption(e.target.value);
                        }}
                      />
                      <span className={styles.checkbox} />
                      <span
                        className={styles.label_text}
                        suppressHydrationWarning
                      >
                        {option} ({count})
                      </span>
                    </label>
                  </li>
                );
              })}
        </>
      }
    />
  );
}
