import React, { ReactNode } from 'react';
import Footer from './Footer';

interface Props {
  children: ReactNode;
  className?: string;
  mobile: boolean;
}

export default function Layout({ children, className, mobile }: Props) {
  return (
    <>
      <div className={className || ''}>
        {children}
        <Footer mobile={mobile} />
      </div>
    </>
  );
}
