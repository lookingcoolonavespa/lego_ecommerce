import React, { useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Recommended.module.scss';
import scrape from '../utils/scraper';

export default function Recommended() {
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:8000/recommended');
        const data = await res.data;

        console.log(JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return <section className={styles.main}></section>;
}
