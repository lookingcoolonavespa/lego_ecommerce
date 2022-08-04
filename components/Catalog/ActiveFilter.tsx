import React from 'react';
import CloseSvg from '../svg/CloseSvg';

interface Props {
  text: string;
  close: () => void;
}

export default function ActiveFilter({ text, close }: Props) {
  return (
    <div className="active_filter" data-testid={text}>
      <span>{text}</span>
      <button type="button" onClick={close}>
        <CloseSvg size="18" />
      </button>
    </div>
  );
}
