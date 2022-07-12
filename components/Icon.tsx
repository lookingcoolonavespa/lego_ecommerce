import React, { ReactNode } from 'react';

interface Props {
  text?: string;
  svg: ReactNode;
  className?: string;
}

export default function Icon({ text, svg, className }: Props) {
  const rootClasses = ['icon'];
  if (className) rootClasses.push(className);

  return (
    <div className={rootClasses.join(' ')}>
      {svg}
      {text && <p>{text}</p>}
    </div>
  );
}
