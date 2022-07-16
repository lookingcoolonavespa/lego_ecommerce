import React, { ReactNode } from 'react';
import { InputDetailsInterface } from '../types/interfaces';

interface Props {
  label?: string;
  inputDetails: InputDetailsInterface;
  text?: string;
}

export default function InputWrapper({ label, inputDetails, text }: Props) {
  return (
    <div className="input_wrapper">
      {label && <label>{label}</label>}
      <input {...inputDetails} />
      {text && <span>{text}</span>}
    </div>
  );
}
