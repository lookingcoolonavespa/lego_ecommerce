import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Catalog from '../pages/shop';
import { act } from 'react-dom/test-utils';

const setup = () => {
  const view = render(<Catalog />);
  const footer = view.getByRole('contentinfo');

  return {
    footer,
    ...view,
  };
};

describe('scroll behavior', () => {
  test('catalog is scrolled before main container is', async () => {
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(window.scrollY).toBe(0);
  });
});
