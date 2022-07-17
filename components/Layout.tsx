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
      {children}
      <Footer mobile={mobile} />
    </>
  );
}
