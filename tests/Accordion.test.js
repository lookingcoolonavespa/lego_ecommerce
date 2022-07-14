import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import { act } from 'react-dom/test-utils';
import Accordion from '../components/Accordian';

const setup = () => {
  const view = render(<Accordion title="aba" insides={<div>Im open</div>} />);
  const titleRow = view.container.querySelector('.title_row');

  return {
    titleRow,
    ...view,
  };
};

test('accordion shows title, but not insides on mount', () => {
  const { getByText } = setup();

  expect(getByText('aba')).toBeVisible();
  expect(screen.queryByText('Im open')).toBeNull();
});

test('accordion expands/contracts when the title row is clicked + animation runs', async () => {
  const { titleRow, getByText } = setup();

  act(() => titleRow.click());

  expect(getByText('Im open')).not.toBeNull();

  act(() => titleRow.click());

  expect(screen.queryByText('Im open')).not.toBeNull();

  await new Promise((resolve) => setTimeout(resolve, 800));
  expect(screen.queryByText('Im open')).toBeNull();
});
