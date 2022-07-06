import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
// import userEvent from '@testing-library/user-event';
import Recommended from '../components/Recommended';

describe('learning how tests work', () => {
  it('renders correct heading', () => {
    const { getByRole } = render(<Recommended />);
    expect(getByRole('heading').textContent).toMatch(/recommended for you/i);
  });
});
