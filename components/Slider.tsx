import React, {
  useState,
  useEffect,
  ReactNode,
  useRef,
  useLayoutEffect,
} from 'react';
import ArrowSvg from './svg/ArrowSvg';
import { animated, useSpring } from 'react-spring';

interface Props {
  children: ReactNode;
  lastPage: number;
  className?: string;
  slideWidth: number;
}

export default function Slider({
  children,
  lastPage,
  className,
  slideWidth,
}: Props) {
  const slidesCtn = useRef<HTMLDivElement | null>(null);
  const slidesCtnWidth = useRef(0);
  const slideFrame = useRef<HTMLDivElement | null>(null);
  const [slideFrameWidth, setSlideFrameWidth] = useState(0);

  const [translateVal, setTranslateVal] = useState(0);

  const [slideProps, slidePropsApi] = useSpring(() => ({
    offset: 0,
  }));

  useEffect(() => {
    slidePropsApi.update(() => ({ offset: 0 - translateVal })).start();
  }, [translateVal, slidePropsApi]);

  useLayoutEffect(() => {
    function getWidth() {
      if (!slideFrame.current || !slidesCtn.current) return;

      const slidesWidth = window.getComputedStyle(slideFrame.current).width;
      setSlideFrameWidth(Number(slidesWidth.slice(0, -2)));

      slidesCtnWidth.current = Number(
        window.getComputedStyle(slidesCtn.current).width.slice(0, -2)
      );
    }

    getWidth();

    window.addEventListener('resize', getWidth);

    return () => {
      window.removeEventListener('resize', getWidth);
    };
  }, []);
  // function pageUp() {
  //   setPage((prev) => {
  //     console.log(prev, lastPage);
  //     if (prev === lastPage) return prev;
  //     return prev + 1;
  //   });
  // }

  function pageUp() {
    setTranslateVal((prev) => {
      let newTranslateVal =
        Math.floor(slideFrameWidth / slideWidth) * slideWidth + prev;

      if (
        // slider goes past end of last slide
        newTranslateVal + slideFrameWidth >
        slidesCtnWidth.current
      ) {
        newTranslateVal = slidesCtnWidth.current - slideFrameWidth;
      }
      return newTranslateVal;
    });
  }

  function pageDown() {
    setTranslateVal((prev) => {
      let newTranslateVal =
        prev - Math.floor(slideFrameWidth / slideWidth) * slideWidth;

      if (
        // first slide is cut off
        newTranslateVal %
        (Math.floor(slideFrameWidth / slideWidth) * slideWidth)
      ) {
        newTranslateVal -=
          newTranslateVal %
          (Math.floor(slideFrameWidth / slideWidth) * slideWidth);
      }

      if (prev === 0) return prev;
      return newTranslateVal;
    });
  }

  // function pageDown() {
  //   setPage((prev) => {
  //     if (page === 0) return prev;
  //     return prev - 1;
  //   });
  // }

  return (
    <div className={className}>
      <button type="button" onClick={pageDown} aria-label="left">
        <ArrowSvg dir="left" />
      </button>
      <div ref={slideFrame} className="slide_frame">
        <animated.div
          ref={slidesCtn}
          data-testid="slider"
          className="slides_ctn"
          style={{
            transform: slideProps.offset.to(
              (offsetX) => `translateX(${offsetX}px)`
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
