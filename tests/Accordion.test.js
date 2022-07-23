import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import { act } from 'react-dom/test-utils';
import Accordion from '../components/Accordian';

const setup = () => {
  const view = render(
    <Accordion title="aba" insides={<div>Im open</div>} name="test" />
  );
  const titleRow = view.container.querySelector('.title_row');

  return {
    titleRow,
    ...view,
  };
};

test('accordion shows title, but not insides on mount', () => {
  const { getByText, getByRole } = setup();

  expect(getByText('aba')).toBeVisible();

  const ul = getByRole('list');
  expect(ul).toHaveStyle({
    maxHeight: '0px',
    transform: 'translateY(-100%)',
  });
});
