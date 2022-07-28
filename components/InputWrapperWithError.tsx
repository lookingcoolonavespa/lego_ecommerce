import React, { ChangeEvent, FocusEvent } from 'react';
import { animated, useSpring } from 'react-spring';
import {
  InputDetailsInterface,
  InputStatusInterface,
} from '../types/interfaces';

interface Props {
  label?: string;
  inputDetails: InputDetailsInterface;
  inputStatus: InputStatusInterface;
  handleChange?: (e: ChangeEvent) => void;
  handleBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function InputWrapperWithError({
  label,
  inputDetails,
  inputStatus,
  handleChange,
  handleBlur,
}: Props) {
  const spring = useSpring({
    transform: inputStatus.type ? `translateY(2em)` : 'translateY(0em)',
    opacity: inputStatus.type ? 1 : 0,
  });
  return (
    <div className="input_wrapper">
      {label && <label>{label}</label>}
      <input {...inputDetails} onChange={handleChange} onBlur={handleBlur} />
      {inputStatus.type && (
        <animated.p
          style={spring}
          className={
            inputStatus.type === 'error' ? 'input_error' : 'input_success'
          }
        >
          {inputStatus.message}
        </animated.p>
      )}
    </div>
  );
}
