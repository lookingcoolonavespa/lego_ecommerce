import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Checkout from '../pages/checkout';
import { act } from 'react-dom/test-utils';
import CartContext from '../utils/CartContext';

const user = userEvent.setup();
const setup = () => {
  const view = render(
    <CartContext.Provider value={{ cart: [] }}>
      <Checkout />
    </CartContext.Provider>
  );

  return {
    ...view,
  };
};

describe('input functionality works', () => {
  test('it displays input correctly', async () => {
    const { getAllByRole } = setup();

    const input = getAllByRole('textbox')[0];

    await user.type(input, 'hey');

    expect(screen.queryByDisplayValue('hey')).not.toBeNull();
  });

  test('email input validates correctly', () => {});
  //   test('error message disappears once valid email is input', async () => {
  //     const { input, submitBtn } = setup();

  //     expect(input.value).toBe('');
  //     const str = 'hey';
  //     fireEvent.change(input, { target: { value: str } });
  //     act(() => submitBtn.click());
  //     expect(screen.queryByText('not a valid email')).not.toBeVisible(); // needs to be animated
  //     await new Promise((resolve) => setTimeout(() => resolve(), 100));
  //     expect(await screen.findByText('not a valid email')).toBeVisible();

  //     fireEvent.change(input, { target: { value: 'hey@gmail.com' } });
  //     expect(screen.queryByText('not a valid email')).toBeNull();
  //   });
});

test('next button is disabled until all fields are valid', async () => {
  const { getAllByRole, getByRole } = setup();

  const inputs = getAllByRole('textbox');

  await user.type(inputs[0], 'fdaf@gmail.com');
  await user.type(inputs[1], 'fdaffdadfa');
  await user.type(inputs[2], 'fdadfafa');

  expect(getByRole('button', { name: 'next' })).not.toBeDisabled();
});
