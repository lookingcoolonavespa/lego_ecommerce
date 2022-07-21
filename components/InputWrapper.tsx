import React, { ReactNode } from 'react';
import { InputDetailsInterface } from '../types/interfaces';

interface Props {
  label?: string;
  inputDetails: InputDetailsInterface;
  text?: string;
  className?: string;
}

export default function InputWrapper({
  className,
  label,
  inputDetails,
  text,
}: Props) {
  const rootClass = ['input_wrapper'];
  if (className) rootClass.push(className);

  return (
    <div className={rootClass.join(' ')}>
      {label && <label>{label}</label>}
      <input {...inputDetails} />
      {text && <span>{text}</span>}
    </div>
  );
}
