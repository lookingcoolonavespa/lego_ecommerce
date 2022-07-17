import React, { ReactNode } from 'react';
import Footer from './Footer';

interface Props {
  children: ReactNode;
  className?: string;
  mobile: boolean;
  footerRef?: React.RefObject<HTMLElement>;
}

export default function Layout({
  children,
  className,
  mobile,
  footerRef,
}: Props) {
  return (
    <>
      <div className={className || ''}>
        {children}
        <Footer mobile={mobile} forwardedRef={footerRef} />
      </div>
    </>
  );
}
