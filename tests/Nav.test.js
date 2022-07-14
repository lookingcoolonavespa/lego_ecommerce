import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Nav from '../components/Nav';
import { act } from 'react-dom/test-utils';

describe('mobile views', () => {
  const setup = () => {
    const view = render(<Nav mobile={true} />);
    const hamburgerBtn = view.getByRole('button', { name: 'hamburger menu' });

    return {
      hamburgerBtn,
      ...view,
    };
  };

  it('shows hamburger menu on mobile view', () => {
    const { hamburgerBtn } = setup();

    expect(hamburgerBtn).toBeVisible();
  });

  it('shows pullout menu when hamburger is clicked + animation plays', async () => {
    const { getByText, hamburgerBtn } = setup();

    hamburgerBtn.click();

    expect(screen.queryByText('Shop')).toBeNull();
    await new Promise((resolve) => setTimeout(resolve, 800));
    expect(getByText('Shop')).toBeVisible();
  });
});
