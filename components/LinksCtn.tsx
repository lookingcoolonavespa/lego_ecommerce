import React from 'react';
import { LinkInterface } from '../types/interfaces';
import { capitalizeEachWord } from '../utils/misc';

interface Props {
  title?: string;
  links: LinkInterface[];
}

export default function LinksCtn({ title, links }: Props) {
  return (
    <div className="links_ctn">
      {title && <h5>{title}</h5>}
      <ul>
        {links.map((link, i) => {
          return (
            <li key={`${link.text}-${i}`} className="link_wrapper">
              <a
                href={link.href || ''}
                onClick={(e) => {
                  if (!link.href) e.preventDefault();
                }}
              >
                {capitalizeEachWord(link.text)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
