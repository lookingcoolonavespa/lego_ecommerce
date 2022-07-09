import React from 'react';
import { InputDetailsInterface } from '../types/interfaces';

interface Props {
  label?: string;
  inputDetails: InputDetailsInterface;
}

export default function InputWrapper({ label, inputDetails }: Props) {
  return (
    <div className="input_wrapper">
      {label && <label>{label}</label>}
      <input {...inputDetails} />
    </div>
  );
}
