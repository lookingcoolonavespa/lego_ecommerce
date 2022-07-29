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
  InputFieldInterface,
  ProductInCartInterface,
} from '../types/interfaces';
import CartProductWrapper from '../components/CartProductWrapper';
import InputWrapperWithError from '../components/InputWrapperWithError';
import { DEFAULT_INPUT_STATUS } from '../utils/constants';
import {
  testAlphabet,
  testEmail,
  testMMYY,
  testNumeric,
} from '../utils/validators';
import { InputFields } from '../types/types';
import useInputFields from '../utils/hooks/useInputFields';

function InputField(
  type: string,
  value = '',
  label: string,
  dataType = label,
  validator: (val: string) => boolean,
  maxLength?: number,
  halfSize = false,
  handleChange?: (val: string) => void
): InputFieldInterface {
  return {
    label,
    dataType,
    validator,
    maxLength,
    halfSize,
    handleChange,
    inputDetails: {
      type,
      value,
      name: label,
      'aria-label': label,
    },
    status: DEFAULT_INPUT_STATUS,
  };
}

export const defaultInputFields: InputFields = {
  1: [
    InputField('text', '', 'Email', undefined, testEmail),
    InputField(
      'text',
      '',
      'First Name',
      undefined,
      testAlphabet(1, 40),
      40,
      true
    ),
    InputField(
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
    InputField('text', '', 'Street Address', undefined, () => {
      return true;
    }),
    InputField('text', '', 'Apt #, Floor, etc (optional)', 'value', () => {
      return true;
    }),
    InputField('text', '', 'City', undefined, testAlphabet(1, 40), 40, true),
    InputField('text', '', 'State', undefined, testAlphabet(1, 2), 2, true),
    InputField('number', '', 'Zip Code', undefined, testNumeric(1, 5), 5, true),
  ],
  3: [
    InputField('number', '', 'Credit Card', undefined, testNumeric(1, 16), 16),
    InputField(
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
    InputField('text', '', 'CVV', 'security code', testNumeric(1, 3), 3, true),
  ],
};

export default function Checkout() {
  const { cart } = useContext(CartContext);

  type PageRange = 1 | 2 | 3;
  const [page, setPage] = useState<PageRange>(2);
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
    const totalErrors = Math.ceil(
      inputFields[page].reduce((acc, curr) => {
        if (curr.status.type === 'error') {
          if (curr.halfSize) acc += 0.5;
          else acc++;
        }

        return acc;
      }, 0)
    );

    springsApi.start((idx) => {
      let halfSizeCount = 0;
      for (let i = 0; i < idx; i++) {
        if (!inputFields[page][i].halfSize) continue;
        halfSizeCount++;
      }
      const newRow = halfSizeCount % 2 === 0;

      const roundingFn = newRow ? Math.ceil : Math.floor;

      const errorsAboveInput = roundingFn(
        inputFields[page].reduce((acc, curr, i, arr) => {
          if (idx <= i) return acc;
          if (curr.status.type === 'error') {
            if (curr.halfSize) acc += 0.5;
            else acc++;
          }
          return acc;
        }, 0)
      );

      return {
        transform: `translateY(${errorsAboveInput * 2}em)`,
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

  // check to disable/enable 'next' button
  let valid = false;
  for (let i = 0; i < inputFields[page].length; i++) {
    const field = inputFields[page][i];
    const validated = field.validator(field.inputDetails.value as string);
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
                  />
                </animated.div>
              );
            })}
          </div>
          <animated.button
            type="button"
            onClick={toNextPage}
            className="flat_btn"
            disabled={!valid || page === maxPage}
            aria-label="next"
            style={{
              transform: spring.offset.to(
                (offset) => `translateY(${offset * 2}em)`
              ),
              willChange: 'transform',
            }}
          >
            Next
          </animated.button>
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
