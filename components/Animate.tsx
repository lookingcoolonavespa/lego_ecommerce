import { ElementType } from '@react-spring/types';
import React, { CSSProperties, ReactNode, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
  tag: ElementType;
  animation:
    | { [key in keyof CSSProperties]: string | number }
    | { [key: string]: { [key in keyof CSSProperties]: string | number } };
  className?: string;
  children: ReactNode;
}

export default function Animate({
  tag,
  animation,
  className,
  children,
}: Props) {
  const AnimateTag = animated(tag);

  const [spring, springApi] = useSpring(() => animation);

  useEffect(() => {
    springApi.start();
  }, [springApi]);

  return (
    <AnimateTag style={spring} className={className}>
      {children}
    </AnimateTag>
  );
}
