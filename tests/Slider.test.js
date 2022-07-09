import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import { RECOMMENDED } from '../utils/constants';
import Slider from '../components/Slider';

it('renders correct heading', () => {
  const { getByRole } = render(
    <Slider title="recommended for you" products={RECOMMENDED} />,
    {}
  );
  expect(getByRole('heading').textContent).toMatch(/^recommended for you$/i);
});

it('renders two buttons', () => {
  const { getByRole } = render(<Slider products={RECOMMENDED} />, {});

  expect(
    getByRole('button', {
      name: 'right',
    })
  ).toBeInTheDocument();

  expect(
    getByRole('button', {
      name: 'left',
    })
  ).toBeInTheDocument();
});
