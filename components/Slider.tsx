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
  className?: string;
  slideWidth: number;
  title?: string;
}

export default function Slider({
  children,
  className,
  slideWidth,
  title,
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

  useEffect(
    function adjustSlideOnResize() {
      setTranslateVal((prev) => {
        const firstSlideIsCutOff = prev % slideWidth;
        const sliderIsPastLastSlide =
          prev + slideFrameWidth > slidesCtnWidth.current;
        if (sliderIsPastLastSlide || firstSlideIsCutOff) {
          return slidesCtnWidth.current - slideFrameWidth;
        } else return prev;
      });
    },
    [slideFrameWidth, slideWidth]
  );

  useEffect(() => {
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

  useEffect(function getHeight() {
    if (!slideFrame.current || !slidesCtn.current) return;

    const slidesHeight = window.getComputedStyle(slidesCtn.current).height;
    slideFrame.current.style.height = slidesHeight;
  }, []);

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

      if (newTranslateVal < 0) return 0;
      if (
        // first slide is cut off
        newTranslateVal %
        (Math.floor(slideFrameWidth / slideWidth) * slideWidth)
      ) {
        const currSlideNo =
          Math.floor(
            slidesCtnWidth.current /
              (Math.floor(slideFrameWidth / slideWidth) * slideWidth)
          ) - 1;

        newTranslateVal =
          currSlideNo * (Math.floor(slideFrameWidth / slideWidth) * slideWidth);
      }

      if (prev === 0) return prev;
      return newTranslateVal;
    });
  }

  return (
    <div className={className}>
      <button type="button" onClick={pageDown} aria-label="left">
        <ArrowSvg dir="left" size="60" />
      </button>
      <div className="content">
        {title && (
          <header>
            <h3>{title}</h3>
          </header>
        )}
        <div ref={slideFrame} data-testid="slide_frame" className="slide_frame">
          <animated.div
            ref={slidesCtn}
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
      </div>
      <button type="button" onClick={pageUp} aria-label="right">
        <ArrowSvg dir="right" size="60" />
      </button>
    </div>
  );
}
