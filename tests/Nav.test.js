import React from 'react';
import ReactDOM from 'react-dom/client';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Nav from '../components/Nav';
import { act } from 'react-dom/test-utils';
import CartContext from '../utils/CartContext';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Nav mobile={true} />
      </CartContext.Provider>
    );
  });
});

afterEach(() => {
  jest.resetAllMocks();

  document.body.removeChild(container);
  container = null;
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('mobile views', () => {
  it('shows hamburger menu on mobile view', () => {
    expect(
      screen.getByRole('button', { name: 'hamburger menu' })
    ).toBeVisible();
  });

  it('shows pullout menu when hamburger is clicked + animation plays', async () => {
    expect(screen.queryByText('Shop')).toBeNull();

    act(() => screen.getByRole('button', { name: 'hamburger menu' }).click());

    await new Promise((resolve) => setTimeout(resolve, 800));
    expect(screen.getByText('Shop')).toBeVisible();
  });
});
