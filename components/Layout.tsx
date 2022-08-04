import React, { ReactNode } from 'react';
import Footer from './Footer';

interface Props {
  children: ReactNode;
  className?: string;
  footerRef?: React.RefObject<HTMLElement>;
}

export default function Layout({ children, className, footerRef }: Props) {
  return (
    <>
      <div className={className || ''}>
        {children}
        <Footer forwardedRef={footerRef} />
      </div>
    </>
  );
}
