import React from 'react';
import { animated, useSpring } from 'react-spring';
import {
  InputDetailsInterface,
  InputStatusInterface,
} from '../types/interfaces';

interface Props {
  label?: string;
  inputDetails: InputDetailsInterface;
  inputStatus: InputStatusInterface;
}

export default function InputWrapper({
  label,
  inputDetails,
  inputStatus,
}: Props) {
  const spring = useSpring({
    transform: inputStatus.type ? `translateY(2em)` : 'translateY(0em)',
    opacity: inputStatus.type ? 1 : 0,
  });
  return (
    <div className="input_wrapper">
      {label && <label>{label}</label>}
      <input {...inputDetails} />
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
