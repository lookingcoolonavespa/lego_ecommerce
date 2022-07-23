import { render, screen, within } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@testing-library/jest-dom'; // optional
import { act } from 'react-dom/test-utils';
import Catalog from '../pages/shop';
import {
  BEST_SELLERS,
  BEST_SELLERS_MULTIPLIED,
  PRODUCTS_ON_PAGE,
} from '../utils/constants';
import userEvent from '@testing-library/user-event';
import CartContext from '../utils/CartContext';

window.scrollTo = jest.fn();

const productList = BEST_SELLERS_MULTIPLIED;
const maxPage = Math.ceil(productList.length / PRODUCTS_ON_PAGE);

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  jest.resetAllMocks();

  document.body.removeChild(container);
  container = null;
});

afterAll(() => {
  jest.clearAllMocks();
});

test('Prev button should exist', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />
      </CartContext.Provider>
    );
  });

  expect(
    screen.getByRole('button', {
      name: 'Goto previous page',
    })
  ).toBeVisible();
});

test('Next button should exist', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });
  const nextButton = screen.getByRole('button', {
    name: 'Goto next page',
  });

  expect(nextButton).toBeVisible();
});

test('First products should be rendered by default', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });
  const list = screen.getByRole('list', { name: 'product list' });
  const productItems = within(list).getAllByRole('listitem');

  expect(productItems).toHaveLength(PRODUCTS_ON_PAGE);

  for (let i = 0; i < PRODUCTS_ON_PAGE; i++) {
    const productItem = productItems[i];
    const product = productList[i];

    const title = within(productItem).getByText(product.title);
    expect(title).toBeInTheDocument();
    const price = within(productItem).getByText(`${product.price} $`);
    expect(price).toBeInTheDocument();
  }
});

test('Page 1 is initially selected', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });
  const currentPage = screen.getByRole('listitem', {
    current: true,
  });

  expect(currentPage).toHaveTextContent('1');
});

test('Page 1 is not selected when page 2 is selected', async () => {
  const user = userEvent.setup();
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });
  const pageTwoButton = screen.getByText('2', { selector: 'button' });

  await user.click(pageTwoButton);

  const pageTwo = screen.getByText('2', { selector: 'button' }).closest('li');
  expect(pageTwo).toHaveAttribute('aria-current', 'true');
  const pageOne = screen.getByText('1', { selector: 'button' }).closest('li');
  expect(pageOne).toHaveAttribute('aria-current', 'false');
});

test('Prev button should be disabled when page 1 is selected', async () => {
  const user = userEvent.setup();
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });
  const pageOneButton = screen.getByText('1', { selector: 'button' });
  await user.click(pageOneButton);

  const previousButton = screen.getByRole('button', {
    name: 'Goto previous page',
  });

  expect(previousButton).toBeDisabled();
});

test('Next button should be disabled when max page is selected', async () => {
  const user = userEvent.setup();
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />
      </CartContext.Provider>
    );
  });
  const lastPageButton = screen.getByText(`${maxPage}`, { selector: 'button' });
  await user.click(lastPageButton);

  const nextButton = screen.getByRole('button', {
    name: 'Goto next page',
  });

  expect(nextButton).toBeDisabled();
});

test('All pagination buttons should exist by default', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });

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
    `${maxPage}`,
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

  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });
  const lastPageButton = screen.getByText(`${maxPage}`, { selector: 'button' });
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
    `${maxPage - 2}`,
    `${maxPage - 1}`,
    `${maxPage}`,
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

  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog bestSellers={productList} />{' '}
      </CartContext.Provider>
    );
  });
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
    `${maxPage}`,
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

test('Pagination buttons show up correctly when max page is between 1 - 3', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog
          bestSellers={productList.filter(
            (p, i) => i < 2 * PRODUCTS_ON_PAGE - 5
          )}
        />{' '}
      </CartContext.Provider>
    );
  });

  const paginationList = screen.getByRole('list', {
    name: 'pagination list',
  });

  const paginationItems = within(paginationList).getAllByRole('listitem');
  expect(paginationItems).toHaveLength(7);
  expect(paginationItems.map((item) => item.textContent)).toStrictEqual([
    'Previous',
    '1',
    '2',
    '--',
    '--',
    `--`,
    'Next',
  ]);
});

test('Pagination buttons show up correctly when max page is between 1', async () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <CartContext.Provider
        value={{
          cart: [],
          handleCart: () => {},
        }}
      >
        <Catalog
          bestSellers={productList.filter((p, i) => i < PRODUCTS_ON_PAGE - 2)}
        />
      </CartContext.Provider>
    );
  });

  const paginationList = screen.getByRole('list', {
    name: 'pagination list',
  });

  const paginationItems = within(paginationList).getAllByRole('listitem');
  expect(paginationItems).toHaveLength(7);
  expect(paginationItems.map((item) => item.textContent)).toStrictEqual([
    'Previous',
    '1',
    '--',
    '--',
    '--',
    `--`,
    'Next',
  ]);
});
