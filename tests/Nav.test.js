import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Nav from '../components/Nav';
import { act } from 'react-dom/test-utils';

describe('mobile views', () => {
  it('shows hamburger menu on mobile view', () => {
    const { getByRole } = render(<Nav mobile={true} />);

    const hamburgerBtn = getByRole('button', { name: 'hamburger menu' });

    expect(hamburgerBtn).toBeVisible();
  });
});
