import { ChangeEvent, useState, FormEvent } from 'react';
import { InputStatusInterface } from '../types/interfaces';

const defaultInputStatus = {
  type: undefined,
  message: '',
};

export default function useEmail() {
  const [email, setEmail] = useState('');
  const [inputStatus, setInputStatus] =
    useState<InputStatusInterface>(defaultInputStatus);

  function resetInputStatus() {
    setInputStatus(defaultInputStatus);
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valid = validateEmail(email);

    if (!valid) {
      return setInputStatus({
        message: 'not a valid email',
        type: 'error',
      });
    }

    setInputStatus({
      message: 'success',
      type: 'success',
    });

    setTimeout(resetInputStatus, 2000);
  }

  function handleChange(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    if (validateEmail(input.value) && inputStatus.type === 'error')
      resetInputStatus();
    setEmail(input.value);
  }

  function validateEmail(str: string) {
    return /\S+@\S+\.\S+/.test(str);
  }

  return {
    email,
    inputStatus,
    submit,
    handleChange,
  };
}
