import { render, screen, fireEvent, within } from '@testing-library/react';
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

let user;

beforeEach(() => {
  user = userEvent.setup();
  render(
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

afterEach(() => {
  jest.resetAllMocks();
  user = null;
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('sidebar works', () => {
  const setup = () => {
    const fromInput = screen.getByRole('spinbutton', { name: 'From' });
    const toInput = screen.getByRole('spinbutton', { name: 'To' });

    const removeFilterBtn = screen.getByRole('button', {
      name: 'remove filters',
    });

    return {
      removeFilterBtn,
      fromInput,
      toInput,
    };
  };
  describe('price filters work', () => {
    jest.setTimeout(10000); // these tests timeout at 5000 for some reason

    test('inputs have minimum of 0', async () => {
      const { fromInput, toInput } = setup();

      await user.type(fromInput, '-1000');
      await user.type(toInput, '-1000');

      expect(screen.getAllByDisplayValue('1000')).toHaveLength(2);
    });

    test('inputs have maximum of 9999', async () => {
      const { fromInput, toInput } = setup();
      await user.type(toInput, '10000');
      await user.type(fromInput, '10000');

      expect(screen.getAllByDisplayValue('1000')).toHaveLength(2);
    });

    test('input wrapper has error class if min is greater than max', async () => {
      const { fromInput, toInput } = setup();

      const inputWrapper = toInput.closest('div');

      await user.type(fromInput, '10000');

      expect(inputWrapper.classList.contains('error')).toBe(true);
    });
  });

  describe('checkbox filters work', () => {
    test('input is checked when label is clicked', async () => {
      // for themes
      await user.click(screen.getByText('Theme'));
      const list = screen.getByRole('list', { name: 'themes' });
      const themeOptions = within(list).getAllByRole('checkbox');
      async function clickLabel(el) {
        await user.click(el.closest('label'));
      }
      await Promise.all(themeOptions.map(clickLabel));
      themeOptions.forEach((el) => expect(el).toBeChecked());
      await Promise.all(themeOptions.map(clickLabel));
      themeOptions.forEach((el) => expect(el).not.toBeChecked());

      // for age groups
      await user.click(screen.getByText('Age'));
      const list2 = screen.getByRole('list', { name: 'age groups' });
      const ageOptions = within(list2).getAllByRole('checkbox');
      await Promise.all(ageOptions.map(clickLabel));
      ageOptions.forEach((el) => expect(el).toBeChecked());
      await Promise.all(ageOptions.map(clickLabel));
      ageOptions.forEach((el) => expect(el).not.toBeChecked());
    });

    test('turns filter off when last one is unchecked', async () => {
      await user.click(screen.getByText('Theme'));
      const list = screen.getByRole('list', { name: 'themes' });
      const themeOptions = within(list).getAllByRole('checkbox');

      await user.click(themeOptions[0]);

      await user.click(screen.getByText('APPLY FILTER'));

      await user.click(themeOptions[0]);

      const plist = screen.getByRole('list', { name: 'product list' });
      const productItems = within(plist).getAllByRole('listitem');

      expect(productItems).toHaveLength(PRODUCTS_ON_PAGE);

      for (let i = 0; i < PRODUCTS_ON_PAGE; i++) {
        const productItem = productItems[i];
        const product = productList[i];

        const titleEl = within(productItem).getByText(product.title);
        expect(titleEl.textContent).toBe(product.title);
      }
    });
  });

  describe('apply filters works', () => {
    test('applies checkbox filters', async () => {
      await user.click(screen.getByText('Theme'));
      const list = screen.getByRole('list', { name: 'themes' });
      const themeOptions = within(list).getAllByRole('checkbox');

      await user.click(themeOptions[0]);

      await user.click(screen.getByText('APPLY FILTER'));

      expect(screen.getByTestId(themeOptions[0].value)).toBeInTheDocument();

      const filtered = productList.filter(
        (p) => p.theme === themeOptions[0].value
      );

      const maxPage = Math.ceil(filtered.length / PRODUCTS_ON_PAGE);
      expect(
        screen.getByText(`${maxPage}`, { selector: 'button' })
      ).toBeInTheDocument();

      const listOfProductWrappers = screen.getByRole('list', {
        name: 'product list',
      });
      const productItems = within(listOfProductWrappers).getAllByRole(
        'listitem'
      );

      for (let i = 0; i < PRODUCTS_ON_PAGE; i++) {
        const productItem = productItems[i];
        const product = filtered[i];

        const titleEl = within(productItem).getByText(product.title);
        expect(titleEl.textContent).toBe(product.title);
      }
    });
  });

  describe('remove filters works', () => {
    test('it resets price filter inputs', async () => {
      const { fromInput, toInput } = setup();

      await user.type(fromInput, '100');
      await user.type(toInput, '1000');

      await user.click(screen.getByRole('button', { name: 'remove filters' }));

      expect(screen.getAllByDisplayValue('0')).toHaveLength(2);
    });

    test('it unchecks all checked filters', async () => {
      await user.click(screen.getByText('Theme'));
      const list = screen.getByRole('list', { name: 'themes' });
      const themeOptions = within(list).getAllByRole('checkbox');
      async function clickLabel(el) {
        await user.click(el.closest('label'));
      }
      await Promise.all(themeOptions.map(clickLabel));

      // for age groups
      await user.click(screen.getByText('Age'));
      const list2 = screen.getByRole('list', { name: 'age groups' });
      const ageOptions = within(list2).getAllByRole('checkbox');
      await Promise.all(ageOptions.map(clickLabel));

      await user.click(screen.getByRole('button', { name: 'remove filters' }));

      ageOptions.forEach((el) => expect(el).not.toBeChecked());
      themeOptions.forEach((el) => expect(el).not.toBeChecked());
    });
  });
});

describe('sort methods work', () => {
  test('doesnt sort when Popular is selected', async () => {
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Popular' })
    );

    const list = screen.getByRole('list', { name: 'product list' });
    const productItems = within(list).getAllByRole('listitem');

    expect(productItems).toHaveLength(PRODUCTS_ON_PAGE);

    for (let i = 0; i < PRODUCTS_ON_PAGE; i++) {
      const productItem = productItems[i];
      const product = productList[i];

      const titleEl = within(productItem).getByText(product.title);
      expect(titleEl.textContent).toBe(product.title);
    }
  });

  test('sorts correctly when Price: High to Low is selected', async () => {
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Price: High to Low' })
    );

    const list = screen.getByRole('list', { name: 'product list' });
    const productItems = within(list).getAllByRole('listitem');
    expect(productItems).toHaveLength(PRODUCTS_ON_PAGE);

    const sorted = [...productList].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );

    for (let i = 0; i < PRODUCTS_ON_PAGE; i++) {
      const productItem = productItems[i];
      const product = sorted[i];

      const titleEl = within(productItem).getByText(product.title);
      expect(titleEl.textContent).toBe(product.title);
    }
  });

  test('sorts correctly when Price: Low to High is selected', async () => {
    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Price: Low to High' })
    );

    const list = screen.getByRole('list', { name: 'product list' });
    const productItems = within(list).getAllByRole('listitem');
    expect(productItems).toHaveLength(PRODUCTS_ON_PAGE);

    const sorted = [...productList].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );

    for (let i = 0; i < PRODUCTS_ON_PAGE; i++) {
      const productItem = productItems[i];
      const product = sorted[i];

      const titleEl = within(productItem).getByText(product.title);
      expect(titleEl.textContent).toBe(product.title);
    }
  });
});

describe('active filters close properly', () => {
  test('it unchecks input when closed', async () => {
    await user.click(screen.getByText('Theme'));
    const list = screen.getByRole('list', { name: 'themes' });
    const themeOptions = within(list).getAllByRole('checkbox');

    await user.click(themeOptions[0]);

    await user.click(screen.getByText('APPLY FILTER'));

    const activeFilter = screen.getByTestId(themeOptions[0].value);

    await user.click(within(activeFilter).getByRole('button'));

    expect(themeOptions[0]).not.toBeChecked();
  });
});

describe('search works', () => {
  test('input displays the typed string', async () => {
    await user.type(screen.getByRole('textbox', { name: 'search' }), 'volcano');

    expect(screen.getByDisplayValue('volcano')).toBeInTheDocument();
  });

  test('search filters out products whose title contains string', async () => {
    const searchStr = 'ab';

    await user.type(screen.getByRole('textbox', { name: 'search' }), 'ab');

    const plist = screen.getByRole('list', { name: 'product list' });
    const productItems = within(plist).getAllByRole('listitem');

    for (let i = 0; i < PRODUCTS_ON_PAGE; i++) {
      const productItem = productItems[i];
      if (!productItem) return;

      const titleEl = within(productItem).getByRole('link');
      expect(titleEl.textContent.includes(searchStr)).toBe(true);
    }
  });
});
