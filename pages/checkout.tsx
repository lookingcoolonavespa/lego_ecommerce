import React, {
  useEffect,
  useState,
  useContext,
  ChangeEvent,
  FocusEvent,
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
import { ApiError } from 'next/dist/server/api-utils';

function InputField(
  type: string,
  value = '',
  label: string,
  validator: (val: string) => boolean | ((val: number) => boolean)
): InputFieldInterface {
  return {
    label,
    validator,
    inputDetails: {
      type,
      value,
      name: label,
      'aria-label': label,
    },
    status: DEFAULT_INPUT_STATUS,
  };
}

export const defaultInputFields = {
  1: [
    InputField('text', '', 'Email', (email: string) => {
      return /\S+@\S+\.\S+/.test(email);
    }),
    InputField('text', '', 'First Name', (name: string) => {
      return name.length < 40 && /^[a-zA-Z\s]+$/.test(name);
    }),
    InputField('text', '', 'Last Name', (name: string) => {
      return name.length < 40 && /^[a-zA-Z\s]+$/.test(name);
    }),
  ],
  2: [
    InputField('text', '', 'Street Address', (addy: string) => {
      return true;
    }),
    InputField('text', '', 'Apt #, Floor ,etc (optional)', () => {
      return true;
    }),
    InputField('text', '', 'City', (city: string) => {
      return city.length < 40 && /^[a-zA-Z.\s]+$/.test(city);
    }),
    InputField('text', '', 'State', (state: string) => {
      return state.length < 40 && /^[a-zA-Z\s]+$/.test(state);
    }),
    InputField('text', '', 'Zip Code', (zipCode: string) => {
      return zipCode.length === 5 && /^[0-9]+$/.test(zipCode);
    }),
  ],
};

export default function Checkout() {
  const { cart } = useContext(CartContext);

  const [page, setPage] = useState<1 | 2>(1);
  const [inputFields, setInputFields] = useState(defaultInputFields);

  const [spring, springApi] = useSpring(() => ({
    offset: 1,
  }));
  const [springs, springsApi] = useSprings(inputFields[page].length, (idx) => ({
    transform: 'translateY(0em)',
  }));

  useEffect(() => {
    // run animation
    const totalErrors = inputFields[page].reduce((acc, curr) => {
      if (curr.status.type === 'error') acc++;

      return acc;
    }, 0);

    springsApi.start((idx) => {
      const errorsAboveInput = inputFields[page].reduce((acc, curr, i) => {
        if (idx <= i) return acc;
        if (curr.status.type === 'error') acc++;
        console.log({ idx, i, acc });
        return acc;
      }, 0);

      console.log({ errorsAboveInput, idx });
      return {
        transform: `translateY(${errorsAboveInput * 2}em)`,
      };
    });
    springApi.update(() => ({ offset: totalErrors })).start();
  }, [inputFields, page, springApi, springsApi]);

  function handleInputChange(e: ChangeEvent) {
    if (!e.target || !(e.target instanceof HTMLInputElement)) return;
    const name = e.target.name;
    const value = e.target.value;

    setInputFields((prev) => {
      return {
        ...prev,
        [page]: prev[page].map((field) => {
          if (field.inputDetails.name !== name) return field;

          const validated = field.validator(value);
          let status = field.status;
          if (validated) status.type = undefined;

          return {
            ...field,
            status,
            inputDetails: { ...field.inputDetails, value },
          };
        }),
      };
    });
  }

  function handleInputBlur(e: FocusEvent<HTMLInputElement>) {
    if (!e.target || !(e.target instanceof HTMLInputElement)) return;
    const name = e.target.name;
    const value = e.target.value;

    const field = inputFields[page].find((f) => f.inputDetails.name === name);
    const validated = field?.validator(value as string);

    if (!validated)
      setInputFields((prev) => {
        return {
          ...prev,
          [page]: prev[page].map((field) => {
            if (field.inputDetails.name !== name) return field;

            return {
              ...field,
              status: {
                type: 'error',
                message: `not a valid ${field.label.toLowerCase()}`,
              },
            };
          }),
        };
      });
  }

  const maxPage = Object.keys(defaultInputFields).length;
  function toNextPage() {
    setPage((prev) => {
      if (prev === 2) return prev;
      const nextPage = (prev + 1) as 2;
      return nextPage;
    });
  }

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
          {springs.map((styles, i) => {
            const field = inputFields[page][i];
            return (
              <animated.div key={field.label} style={styles}>
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
          {/* {inputFields[page].map((field, i) => {
            const passedErrors = inputFields[page].reduce((acc, curr, idx) => {
              if (idx >= i) return acc;
              if (curr.status.type === 'error') acc++;

              return acc;
            }, 0);

            return (
              <animated.div
                key={field.label}
                style={{
                  transform: `translateY(${passedErrors * 2}em)`,
                  willChange: 'transform',
                }}
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
          })} */}
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
