import { useCallback, useState, useEffect, useRef } from 'react';

export default function useMobile() {
  const [windowWidth, setWindowWidth] = useState(0);
  const mobileCheck = useRef(true);

  const handleWindowResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    mobileCheck.current = window.innerWidth <= 810;
  }, []);

  useEffect(() => {
    handleWindowResize();
  }, [handleWindowResize]);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  return { mobileCheck };
}
