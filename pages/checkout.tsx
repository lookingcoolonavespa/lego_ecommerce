import React, {
  useEffect,
  useState,
  useContext,
  ChangeEvent,
  FocusEvent,
  useReducer,
} from 'react';
import { useSpring, animated, useSprings } from 'react-spring';
import Link from 'next/link';
import CartContext from '../utils/CartContext';
import styles from '../styles/Checkout.module.scss';
import LegoLego from '../components/svg/LegoLogo';
import {
  CheckboxInputFieldInterface,
  InputFieldInterface,
  ProductInCartInterface,
} from '../types/interfaces';
import CartProductWrapper from '../components/CartProductWrapper';
import InputWrapperWithError from '../components/InputWrapperWithError';
import { DEFAULT_INPUT_STATUS } from '../utils/constants';
import {
  testAlphabet,
  testCity,
  testEmail,
  testMMYY,
  testNumeric,
  testState,
} from '../utils/validators';
import { InputFields } from '../types/types';
import useInputFields from '../utils/hooks/useInputFields';
import { isCheckbox } from '../types/typeGuards';

function TextInputField(
  type: string,
  value = '',
  label: string,
  dataType = label,
  validator: (val: string) => boolean,
  maxLength?: number,
  halfSize = false,
  handleChange?: (val: string) => void,
  className?: string
): InputFieldInterface {
  return {
    label,
    dataType,
    validator,
    maxLength,
    halfSize,
    handleChange,
    className,
    inputDetails: {
      type,
      value,
      name: label,
      'aria-label': label,
    },
    status: DEFAULT_INPUT_STATUS,
  };
}

function CheckboxInputField(
  checked = false,
  label: string,
  id: string,
  halfSize = false,
  validator: (bool: boolean) => boolean,
  handleChange?: (val: string) => void,
  className?: string
): CheckboxInputFieldInterface {
  return {
    label,
    halfSize,
    className,
    handleChange,
    validator,
    status: DEFAULT_INPUT_STATUS,
    inputDetails: {
      id,
      checked,
      type: 'checkbox',
      name: label,
      'aria-label': label,
    },
  };
}

export const defaultInputFields: InputFields = {
  1: [
    TextInputField('text', '', 'Email', undefined, testEmail),
    TextInputField(
      'text',
      '',
      'First Name',
      undefined,
      testAlphabet(1, 40),
      40,
      true
    ),
    TextInputField(
      'text',
      '',
      'Last Name',
      undefined,
      testAlphabet(1, 40),
      40,
      true
    ),
  ],
  2: [
    TextInputField('text', '', 'Street Address', undefined, () => {
      return true;
    }),
    TextInputField('text', '', 'Apt #, Floor, etc (optional)', 'value', () => {
      return true;
    }),
    TextInputField('text', '', 'City', undefined, testCity(1, 41), 40, true),
    TextInputField('text', '', 'State', undefined, testState, 2, true),
    TextInputField(
      'number',
      '',
      'Zip Code',
      undefined,
      testNumeric(1, 5),
      5,
      true
    ),
  ],
  3: [
    TextInputField(
      'number',
      '',
      'Credit Card',
      undefined,
      testNumeric(1, 17),
      16
    ),
    TextInputField(
      'text',
      '',
      'Exp. (MM/YY)',
      'expiration date',
      testMMYY,
      5,
      true,
      (value: string) => {
        if (value.length === 1 && Number(value) > 1) value = '0' + value;
        if (value.length === 2) value += '/';

        return value;
      }
    ),
    TextInputField(
      'text',
      '',
      'CVV',
      'security code',
      testNumeric(1, 4),
      3,
      true
    ),
    CheckboxInputField(
      true,
      'Billing address same as shipping',
      'sameAddress',
      false,
      () => true,
      () => {},
      styles.checkbox_wrapper
    ),
    TextInputField('text', '', 'Street Address', undefined, () => {
      return true;
    }),
    TextInputField('text', '', 'Apt #, Floor, etc (optional)', 'value', () => {
      return true;
    }),
    TextInputField('text', '', 'City', undefined, testCity(1, 41), 40, true),
    TextInputField('text', '', 'State', undefined, testState, 2, true),
    TextInputField(
      'number',
      '',
      'Zip Code',
      undefined,
      testNumeric(1, 5),
      5,
      true
    ),
  ],
};

const titles = {
  1: 'Personal Information',
  2: 'Shipping Address',
  3: 'Billing Information',
  4: 'Billing Address',
};

export default function Checkout() {
  const { cart } = useContext(CartContext);

  type PageRange = 1 | 2 | 3;
  const [page, setPage] = useState<PageRange>(3);
  const { inputFields, handleInputBlur, handleInputChange } = useInputFields(
    page,
    defaultInputFields
  );

  const [spring, springApi] = useSpring(() => ({
    offset: 0,
  }));
  const [springs, springsApi] = useSprings(inputFields[page].length, () => ({
    transform: 'translateY(0em)',
  }));

  useEffect(() => {
    // run animation

    let halfSizeCount = 0;

    let totalErrors = 0;
    springsApi.start((idx) => {
      const curr = inputFields[page][idx];
      if (curr.halfSize) {
        // every two halfSize elements means a new row
        if (halfSizeCount === 2) halfSizeCount = 0;
        if (halfSizeCount < 2) halfSizeCount++;
      }

      if (
        halfSizeCount === 2 &&
        inputFields[page][idx - 1].status.type === 'error'
      ) {
        return {
          transform: `translateY(${(totalErrors - 1) * 2}em)`,
        };
      }

      if (curr.status.type === 'error')
        return {
          transform: `translateY(${totalErrors++ * 2}em)`,
        };

      return {
        transform: `translateY(${totalErrors * 2}em)`,
      };
    });
    springApi.update(() => ({ offset: totalErrors })).start();
  }, [inputFields, page, springApi, springsApi]);

  const maxPage = Object.keys(defaultInputFields).length;
  function toNextPage() {
    setPage((prev) => {
      if (prev === maxPage) return prev;
      const nextPage = (prev + 1) as PageRange;
      return nextPage;
    });
  }

  function toPrevPage() {
    setPage((prev) => {
      if (prev === 1) return prev;
      const prevPage = (prev - 1) as PageRange;
      return prev;
    });
  }

  // check to disable/enable 'next' button
  let valid = false;
  for (let i = 0; i < inputFields[page].length; i++) {
    const field = inputFields[page][i];
    if (!field.validator) continue;
    const validated = isCheckbox(field)
      ? field.validator(field.inputDetails.checked as boolean)
      : field.validator(field.inputDetails.value as string);
    if (!validated) break;
    if (i === inputFields[page].length - 1) valid = true;
  }

  return (
    <div className={styles.container}>
      <nav>
        <Link href="/">
          <div className={styles.logo_wrapper}>
            <LegoLego />
          </div>
        </Link>
      </nav>
      <main className="two_col_view">
        <form className={styles.form_ctn}>
          <header>
            <h3>{titles[page]}</h3>
          </header>
          <div className={styles.inputs_ctn}>
            {springs.map((animationStyles, i) => {
              const field = inputFields[page][i];

              return (
                <animated.div
                  key={field.label}
                  style={animationStyles}
                  className={field.halfSize ? 'half-size' : 'full-size'}
                >
                  <InputWrapperWithError
                    label={field.label}
                    inputDetails={field.inputDetails}
                    inputStatus={field.status}
                    handleChange={handleInputChange}
                    handleBlur={handleInputBlur}
                    className={field.className}
                  />
                </animated.div>
              );
            })}
          </div>
          <animated.div
            className={styles.btn_ctn}
            style={{
              transform: spring.offset.to(
                (offset) => `translateY(${offset * 2}em)`
              ),
              willChange: 'transform',
            }}
          >
            <button
              type="button"
              onClick={toPrevPage}
              className={`flat_btn ${styles.prev_btn}`}
              disabled={page === 1}
              aria-label="previous"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={toNextPage}
              className={`flat_btn ${styles.next_btn}`}
              disabled={!valid || page === maxPage}
              aria-label="next"
            >
              Next
            </button>
          </animated.div>
        </form>
        <div className={styles.products_ctn}>
          {cart.length ? (
            cart.map((product: ProductInCartInterface) => {
              return (
                <CartProductWrapper
                  key={product.title}
                  product={product}
                  readonly={true}
                />
              );
            })
          ) : (
            <h3 className={styles.no_items}>No items are in your cart</h3>
          )}
        </div>
      </main>
    </div>
  );
}
