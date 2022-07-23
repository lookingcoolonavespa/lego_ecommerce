import React from 'react';
import CloseSvg from '../svg/CloseSvg';

interface Props {
  text: string;
  className: string;
  close: () => void;
}

export default function ActiveFilter({ className, text, close }: Props) {
  return (
    <div className={className} data-testid={text}>
      <span>{text}</span>
      <button type="button" onClick={close}>
        <CloseSvg size="18" />
      </button>
    </div>
  );
}
