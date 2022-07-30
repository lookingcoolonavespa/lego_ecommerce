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
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function InputWrapperWithError({
  label,
  inputDetails,
  inputStatus,
  handleChange,
  handleBlur,
  className,
}: Props) {
  const spring = useSpring({
    transform: inputStatus.type ? `translateY(2em)` : 'translateY(0em)',
    opacity: inputStatus.type ? 1 : 0,
  });

  const rootClasses = ['input_wrapper'];
  if (className) rootClasses.push(className);
  return (
    <div className={rootClasses.join(' ')}>
      {label && (
        <label htmlFor={(inputDetails.id as string) || ''}>{label}</label>
      )}
      <input {...inputDetails} onChange={handleChange} onBlur={handleBlur} />
      <animated.p
        style={spring}
        className={
          inputStatus.type === 'error' ? 'input_error' : 'input_success'
        }
      >
        {inputStatus.message}
      </animated.p>
    </div>
  );
}
