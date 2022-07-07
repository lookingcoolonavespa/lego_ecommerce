import React, { useState, useEffect, ReactNode } from 'react';
import ArrowSvg from './svg/ArrowSvg';
import { animated, useSpring } from 'react-spring';

interface Props {
  children: ReactNode;
  lastPage: number;
  className: string;
}

export default function Slider({ children, lastPage, className }: Props) {
  const [page, setPage] = useState(0);

  const [slideProps, slidePropsApi] = useSpring(() => ({
    offset: 0,
  }));

  useEffect(() => {
    slidePropsApi.update(() => ({ offset: 0 - page })).start();
  }, [page, slidePropsApi]);

  function pageUp() {
    setPage((prev) => {
      console.log(prev, lastPage);
      if (prev === lastPage) return prev;
      return prev + 1;
    });
  }

  function pageDown() {
    setPage((prev) => {
      if (page === 0) return prev;
      return prev - 1;
    });
  }

  return (
    <div className={className}>
      <button type="button" onClick={pageDown} aria-label="left">
        <ArrowSvg dir="left" />
      </button>
      <div className="slide_frame">
        <animated.div
          data-testid="slider"
          className="slides_ctn"
          style={{
            transform: slideProps.offset.to(
              (offsetX) => `translateX(${offsetX * (772 + 40)}px)`
            ),
            willChange: 'transform',
          }}
        >
          {children}
        </animated.div>
      </div>
      <button type="button" onClick={pageUp} aria-label="right">
        <ArrowSvg dir="right" />
      </button>
    </div>
  );
}
