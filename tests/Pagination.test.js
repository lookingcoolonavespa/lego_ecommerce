import { render, screen, within } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'; // optional
import { act } from 'react-dom/test-utils';
import Catalog from '../pages/shop';
import { BEST_SELLERS } from '../utils/constants';
import userEvent from '@testing-library/user-event';

// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

test('Prev button should exist', async () => {
  render(<Catalog bestSellers={BEST_SELLERS} />);
  const previousButton = screen.getByRole('button', {
    name: 'Goto previous page',
  });

  expect(
    screen.getByRole('button', {
      name: 'Goto previous page',
    })
  ).toBeVisible();
});

test('Next button should exist', async () => {
  render(<Catalog bestSellers={BEST_SELLERS} />);
  const nextButton = screen.getByRole('button', {
    name: 'Goto next page',
  });

  expect(nextButton).toBeVisible();
});

test('First  posts should be rendered by default', async () => {
  render(<Catalog bestSellers={BEST_SELLERS} />);
  const blogList = screen.getByRole('list', { name: 'product list' });
  const productItems = within(blogList).getAllByRole('listitem');

  expect(productItems).toHaveLength(10);

  for (let i = 0; i < 10; i++) {
    const productItem = productItems[i];
    const product = BEST_SELLERS[i];

    const title = within(productItem).getByText(product.title);
    expect(title).toBeInTheDocument();
    const price = within(productItem).getByText(`${product.price} $`);
    expect(price).toBeInTheDocument();
  }
});

test('Page 1 is initially selected', async () => {
  render(<Catalog bestSellers={BEST_SELLERS} />);
  const currentPage = screen.getByRole('listitem', {
    current: true,
  });

  expect(currentPage).toHaveTextContent('1');
});

test('Page 1 is not selected when page 2 is selected', async () => {
  const user = userEvent.setup();
  render(<Catalog bestSellers={BEST_SELLERS} />);
  const pageTwoButton = screen.getByText('2', { selector: 'button' });

  await user.click(pageTwoButton);

  const pageTwo = screen.getByText('2', { selector: 'button' }).closest('li');
  expect(pageTwo).toHaveAttribute('aria-current', 'true');
  const pageOne = screen.getByText('1', { selector: 'button' }).closest('li');
  expect(pageOne).toHaveAttribute('aria-current', 'false');
});

test('Prev button should be disabled when page 1 is selected', async () => {
  const user = userEvent.setup();
  render(<Catalog bestSellers={BEST_SELLERS} />);
  const pageOneButton = screen.getByText('1', { selector: 'button' });
  await user.click(pageOneButton);

  const previousButton = screen.getByRole('button', {
    name: 'Goto previous page',
  });

  expect(previousButton).toBeDisabled();
});

test('Next button should be disabled when max page is selected', async () => {
  const user = userEvent.setup();
  render(<Catalog bestSellers={BEST_SELLERS} />);
  const pageSixButton = screen.getByText('6', { selector: 'button' });
  await user.click(pageSixButton);

  const nextButton = screen.getByRole('button', {
    name: 'Goto next page',
  });

  expect(nextButton).toBeDisabled();
});

test('All pagination buttons should exist by default', async () => {
  render(<Catalog bestSellers={BEST_SELLERS} />);

  const paginationList = screen.getByRole('list', {
    name: 'pagination list',
  });

  const paginationItems = within(paginationList).getAllByRole('listitem');
  expect(paginationItems).toHaveLength(7);
  expect(paginationItems.map((item) => item.textContent)).toStrictEqual([
    'Previous',
    '1',
    '2',
    '3',
    '…',
    '6',
    'Next',
  ]);

  const previousButton = screen.getByRole('button', {
    name: 'Goto previous page',
  });
  expect(paginationItems[0]).toContainElement(previousButton);
  const nextButton = screen.getByRole('button', {
    name: 'Goto next page',
  });
  expect(paginationItems[6]).toContainElement(nextButton);
});

test('Pagination buttons are correct on last page', async () => {
  const user = userEvent.setup();

  render(<Catalog bestSellers={BEST_SELLERS} />);
  const lastPageButton = screen.getByText('6', { selector: 'button' });
  await user.click(lastPageButton);

  const paginationList = screen.getByRole('list', {
    name: 'pagination list',
  });

  const paginationItems = within(paginationList).getAllByRole('listitem');
  expect(paginationItems).toHaveLength(7);
  expect(paginationItems.map((item) => item.textContent)).toStrictEqual([
    'Previous',
    '1',
    '…',
    '4',
    '5',
    '6',
    'Next',
  ]);

  const previousButton = screen.getByRole('button', {
    name: 'Goto previous page',
  });
  expect(paginationItems[0]).toContainElement(previousButton);
  const nextButton = screen.getByRole('button', {
    name: 'Goto next page',
  });
  expect(paginationItems[6]).toContainElement(nextButton);
});

test('Pagination buttons are correct on fourth page', async () => {
  const user = userEvent.setup();

  render(<Catalog bestSellers={BEST_SELLERS} />);
  const thirdPageButton = screen.getByText('3', { selector: 'button' });
  await user.click(thirdPageButton);
  const fourthPageButton = screen.getByText('4', { selector: 'button' });
  await user.click(fourthPageButton);

  const paginationList = screen.getByRole('list', {
    name: 'pagination list',
  });

  const paginationItems = within(paginationList).getAllByRole('listitem');
  expect(paginationItems).toHaveLength(9);
  expect(paginationItems.map((item) => item.textContent)).toStrictEqual([
    'Previous',
    '1',
    '…',
    '3',
    '4',
    '5',
    '…',
    '6',
    'Next',
  ]);

  const previousButton = screen.getByRole('button', {
    name: 'Goto previous page',
  });
  expect(paginationItems[0]).toContainElement(previousButton);
  const nextButton = screen.getByRole('button', {
    name: 'Goto next page',
  });
  expect(paginationItems[8]).toContainElement(nextButton);
});
