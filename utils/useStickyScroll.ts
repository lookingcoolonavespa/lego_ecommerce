import { useRef, useEffect } from 'react';

export default function useStickyScroll(page: number) {
  const footer = useRef<HTMLElement | null>(null);
  const scroller = useRef<HTMLUListElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleScroll() {
      // push the content down as you scroll until scroller reaches the bottom
      // this way the content "sticks" until the scroller is done scrolling
      if (!footer.current || !scroller.current || !container.current) return;
      scroller.current.scroll({
        top: window.scrollY,
        behavior: 'smooth',
      });

      const scrollerHeight = Number(
        window.getComputedStyle(scroller.current).height.slice(0, -2)
      );

      if (
        (scroller.current.scrollHeight >
          scroller.current.scrollTop + scrollerHeight &&
          window.scrollY <= scroller.current.scrollHeight) ||
        (scroller.current.scrollHeight ===
          scroller.current.scrollTop + scrollerHeight - 0.2 &&
          window.scrollY <= scroller.current.scrollHeight)
      ) {
        container.current.style.top = window.scrollY + 'px';
        footer.current.style.marginTop = window.scrollY + 'px';
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  useEffect(
    function resetScrollOnPageChange() {
      if (!footer.current || !scroller.current || !container.current) return;
      window.scrollTo(0, 0);
      // scroller.current.scrollTop = 0;
      // container.current.style.top = window.scrollY + 'px';
      // footer.current.style.marginTop = window.scrollY + 'px';
    },
    [page]
  );

  return {
    footer,
    scroller,
    container,
  };
}
