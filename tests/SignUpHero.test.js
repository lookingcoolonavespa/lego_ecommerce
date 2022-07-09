import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import SignUpHero from '../components/SignUpHero';
import { act } from 'react-dom/test-utils';
const setup = () => {
  const view = render(<SignUpHero />);
  const input = view.getByRole('textbox');
  const submitBtn = view.getByRole('button');

  return {
    input,
    submitBtn,
    ...view,
  };
};

describe('input functionality works', () => {
  test('it displays input correctly', () => {
    const { input } = setup();

    expect(input.value).toBe('');
    const str = 'hey';
    fireEvent.change(input, { target: { value: str } });
    expect(input.value).toBe(str);
  });

  test('error message disappears once valid email is input', async () => {
    const { input, submitBtn } = setup();

    expect(input.value).toBe('');
    const str = 'hey';
    fireEvent.change(input, { target: { value: str } });
    act(() => submitBtn.click());
    expect(screen.queryByText('not a valid email')).not.toBeVisible(); // needs to be animated
    await new Promise((resolve) => setTimeout(() => resolve(), 100));
    expect(await screen.findByText('not a valid email')).toBeVisible();

    fireEvent.change(input, { target: { value: 'hey@gmail.com' } });
    expect(screen.queryByText('not a valid email')).toBeNull();
  });

  test('success message disappears after 2secs', async () => {
    const { input, submitBtn } = setup();

    expect(input.value).toBe('');
    const str = 'hey@gmail.com';
    fireEvent.change(input, { target: { value: str } });
    act(() => submitBtn.click());
    expect(screen.queryByText('success')).not.toBeVisible();
    await new Promise((resolve) => setTimeout(() => resolve(), 100));
    expect(await screen.findByText('success')).toBeVisible();

    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
    expect(screen.queryByText('success')).toBeNull();
  });
});
