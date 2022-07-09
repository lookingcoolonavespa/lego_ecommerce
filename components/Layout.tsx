import React, { ReactNode } from 'react';
import Footer from './Footer';

interface Props {
  children: ReactNode;
  className: string;
}

export default function Layout({ children, className }: Props) {
  return (
    <>
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}
