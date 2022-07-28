import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // optional
import userEvent from '@testing-library/user-event';
import Checkout, { defaultInputFields } from '../pages/checkout';
import { act } from 'react-dom/test-utils';
import CartContext from '../utils/CartContext';

const user = userEvent.setup();
const setup = () => {
  const view = render(
    <CartContext.Provider value={{ cart: [] }}>
      <Checkout />
    </CartContext.Provider>
  );

  return {
    ...view,
  };
};

describe('input functionality works', () => {
  test('it displays input correctly', async () => {
    const { getAllByRole } = setup();

    const input = getAllByRole('textbox')[0];

    await user.type(input, 'hey');

    expect(screen.queryByDisplayValue('hey')).not.toBeNull();
  });

  describe('first page inputs validate correctly', () => {
    describe('email input validates correctly', () => {
      test('handles incorrect strings', async () => {
        const { getByLabelText, getByText } = setup();

        const input = getByLabelText('Email');

        await user.type(input, 'hey');

        act(() => fireEvent.blur(input));

        expect(getByText('not a valid email')).not.toBeNull();
      });

      test('handles correct strings', async () => {
        const { getByLabelText, queryByText } = setup();

        const input = getByLabelText('Email');

        await user.type(input, 'hey@gmail.com');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid email')).toBeNull();
      });
    });

    describe('first name input validates correctly', () => {
      test('handles special characters', async () => {
        const { getByLabelText, getByText } = setup();

        const input = getByLabelText('First Name');

        await user.type(input, '@heyits*me');

        act(() => fireEvent.blur(input));

        expect(getByText('not a valid first name')).not.toBeNull();
      });

      test('handles numbers', async () => {
        const { getByLabelText, getByText } = setup();

        const input = getByLabelText('First Name');

        await user.type(input, '123 this is my name');

        act(() => fireEvent.blur(input));

        expect(getByText('not a valid first name')).not.toBeNull();
      });

      test('handles correct strings', async () => {
        const { getByLabelText, queryByText } = setup();

        const input = getByLabelText('First Name');

        await user.type(input, 'hey');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid first name')).toBeNull();
      });

      test('accepts names with spaces', async () => {
        const { getByLabelText, queryByText } = setup();

        const input = getByLabelText('First Name');

        await user.type(input, 'hey itsme');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid first name')).toBeNull();
      });
    });

    describe('last name input validates correctly', () => {
      test('handles special characters', async () => {
        const { getByLabelText, getByText } = setup();

        const input = getByLabelText('Last Name');

        await user.type(input, '@heyits*me');

        act(() => fireEvent.blur(input));

        expect(getByText('not a valid last name')).not.toBeNull();
      });

      test('handles numbers', async () => {
        const { getByLabelText, getByText } = setup();

        const input = getByLabelText('Last Name');

        await user.type(input, '123 this is my name');

        act(() => fireEvent.blur(input));

        expect(getByText('not a valid last name')).not.toBeNull();
      });

      test('handles correct strings', async () => {
        const { getByLabelText, queryByText } = setup();

        const input = getByLabelText('Last Name');

        await user.type(input, 'hey');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid last name')).toBeNull();
      });

      test('accepts names with spaces', async () => {
        const { getByLabelText, queryByText } = setup();

        const input = getByLabelText('Last Name');

        await user.type(input, 'hey itsme');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid last name')).toBeNull();
      });
    });
  });

  describe('second page validates correctly', () => {
    let queryByLabelText, getByLabelText, getByRole, queryByText;
    beforeEach(async () => {
      ({ queryByLabelText, getByLabelText, getByRole, queryByText } = setup());

      expect(getByRole('button', { name: 'next' })).toBeDisabled();

      await user.type(getByLabelText('Email'), 'fdaf@gmail.com');
      await user.type(getByLabelText('First Name'), 'fdaffdadfa');
      await user.type(getByLabelText('Last Name'), 'fdadfafa');

      await user.click(getByRole('button', { name: 'next' }));
    });

    describe('address validates correctly', () => {
      test('handles correct strings', async () => {
        const input = getByLabelText('Street Address');
        await user.type(input, '498 citrus ave');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid street address')).toBeNull();
      });
    });

    describe('city validates correctly', () => {
      test('handles numbers', async () => {
        const input = getByLabelText('City');
        await user.type(input, '498 citrus ave');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid city')).not.toBeNull();
      });

      test('handles special characters', async () => {
        const input = getByLabelText('City');
        await user.type(input, '@san francisco');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid city')).not.toBeNull();
      });

      test('accepts periods', async () => {
        const input = getByLabelText('City');
        await user.type(input, 'St. louis');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid city')).toBeNull();
      });
    });

    describe('state validates correctly', () => {
      test('handles numbers', async () => {
        const input = getByLabelText('State');
        await user.type(input, '498 citrus ave');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid state')).not.toBeNull();
      });

      test('handles special characters', async () => {
        const input = getByLabelText('State');
        await user.type(input, '@san francisco');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid state')).not.toBeNull();
      });

      test('handles correct strings', async () => {
        const input = getByLabelText('State');
        await user.type(input, 'California');

        act(() => fireEvent.blur(input));

        expect(queryByText('not a valid state')).toBeNull();
      });
    });
  });

  test('inputs with errors retract error after correct string is input', async () => {
    const { getByLabelText, queryByText } = setup();

    const input = getByLabelText('Email');

    await user.type(input, 'hey');

    act(() => fireEvent.blur(input));

    await user.type(input, 'hey@gmail.com');

    expect(queryByText('not a valid email')).toBeNull();
  });
});

test('next button is disabled until all fields are valid', async () => {
  const { getByLabelText, getByRole } = setup();
  expect(getByRole('button', { name: 'next' })).toBeDisabled();

  await user.type(getByLabelText('Email'), 'fdaf@gmail.com');
  await user.type(getByLabelText('First Name'), 'fdaffdadfa');
  await user.type(getByLabelText('Last Name'), 'fdadfafa');

  expect(getByRole('button', { name: 'next' })).not.toBeDisabled();
});

describe('form displays correct inputs for the page', () => {
  test('page one', () => {
    const { queryByLabelText } = setup();

    Object.keys(defaultInputFields).forEach((key, i) => {
      defaultInputFields[key].forEach((field) => {
        if (i === 0) expect(queryByLabelText(field.label)).not.toBeNull();
        else expect(queryByLabelText(field.label)).toBeNull();
      });
    });
  });

  test('page two', async () => {
    const { queryByLabelText, getByLabelText, getByRole } = setup();
    expect(getByRole('button', { name: 'next' })).toBeDisabled();

    await user.type(getByLabelText('Email'), 'fdaf@gmail.com');
    await user.type(getByLabelText('First Name'), 'fdaffdadfa');
    await user.type(getByLabelText('Last Name'), 'fdadfafa');

    await user.click(getByRole('button', { name: 'next' }));

    Object.keys(defaultInputFields).forEach((key, i) => {
      defaultInputFields[key].forEach((field) => {
        if (i === 1) expect(queryByLabelText(field.label)).not.toBeNull();
        else expect(queryByLabelText(field.label)).toBeNull();
      });
    });
  });
});
