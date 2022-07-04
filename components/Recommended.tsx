import React, { useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Recommended.module.scss';

export default function Recommended() {
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/recommended');
        const data = await res.data;

        if (res.status !== 200) {
          throw new Error(data);
        }

        console.log(JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return <section className={styles.main}></section>;
}
