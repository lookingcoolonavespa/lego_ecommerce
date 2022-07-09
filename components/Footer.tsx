import React from 'react';
import styles from '../styles/Footer.module.scss';
import LinksCtn from './LinksCtn';
import LegoLego from './svg/LegoLogo';

const footerLinks = [
  {
    title: 'about us',
    links: [
      { text: 'about the LEGO group' },
      { text: 'LEGO news' },
      { text: 'sustainability' },
      { text: 'supply chain transparency statement' },
      { text: 'LEGO product certification' },
      { text: 'LEGO jobs' },
      { text: 'LEGO compliance line' },
    ],
  },
  {
    title: 'support',
    links: [
      { text: 'contact us' },
      { text: 'find building instructions' },
      { text: 'replacement parts' },
      { text: 'shipping and returns' },
      { text: 'payment methods' },
      { text: 'terms & conditions' },
      { text: 'product recalls' },
    ],
  },
  {
    title: 'attractions',
    links: [
      { text: 'LEGO house' },
      { text: 'LEGOLAND parks' },
      { text: 'LEGOLAND discovery centers' },
    ],
  },
  {
    title: 'more from us',
    links: [
      { text: 'LEGO LIFE' },
      { text: 'LEGO education' },
      { text: 'LEGO ideas' },
      { text: 'LEGO foundation' },
      { text: 'affiliate program' },
      { text: 'student offers' },
      { text: 'LEGO braille bricks' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.main}>
      <div className="two_col_view">
        <div className="col_one">
          <LegoLego />
        </div>
        <div className="col_two">
          {footerLinks.map((fl, i) => {
            return (
              <LinksCtn
                key={`${fl.title}-${i}`}
                title={fl.title}
                links={fl.links}
              />
            );
          })}
        </div>
      </div>
    </footer>
  );
}
