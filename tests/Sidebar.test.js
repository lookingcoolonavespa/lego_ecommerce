import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Sidebar from '../components/Catalog/Sidebar';
import { act } from 'react-dom/test-utils';
const setup = () => {
  function TestEnvironment() {
    const [priceFilters, setPriceFilters] = useState({ min: 0, max: 0 });

    return (
      <Sidebar priceFilters={priceFilters} setPriceFilters={setPriceFilters} />
    );
  }

  const view = render(<TestEnvironment />);
  const fromInput = view.getByRole('spinbutton', { name: 'From' });
  const toInput = view.getByRole('spinbutton', { name: 'To' });

  const removeFilterBtn = view.getByRole('button', { name: 'remove filters' });

  const user = userEvent.setup();
  return {
    user,
    removeFilterBtn,
    fromInput,
    toInput,
    ...view,
  };
};
describe('price filters work', () => {
  test('inputs have minimum of 0', async () => {
    const { user, fromInput, toInput } = setup();

    await act(async () => await user.type(fromInput, '-1000'));
    await act(async () => await user.type(toInput, '-1000'));

    expect(screen.getAllByDisplayValue('1000')).toHaveLength(2);
  });

  test('inputs have maximum of 9999', async () => {
    const { user, fromInput, toInput } = setup();
    await act(async () => await user.type(fromInput, '10000'));
    await act(async () => await user.type(toInput, '10000'));

    expect(screen.getAllByDisplayValue('1000')).toHaveLength(2);
  });

  test('input wrapper has error class if min is greater than max', async () => {
    const { user, fromInput, toInput } = setup();

    const inputWrapper = toInput.closest('div');

    await act(async () => await user.type(fromInput, '10000'));

    expect(inputWrapper.classList.contains('error')).toBe(true);
  });
});
