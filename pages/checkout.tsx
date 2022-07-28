import React, {
  useEffect,
  useState,
  useContext,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { useSpring, animated } from 'react-spring';
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
    },
    status: DEFAULT_INPUT_STATUS,
  };
}

const defaultInputFields = {
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
      return /^[a-zA-Z0-9\s]+$/.test(addy);
    }),
    InputField('text', '', 'Apt #, Floor ,etc (optional)', (addy: string) => {
      return /^[a-zA-Z0-9\s]+$/.test(addy);
    }),
    InputField('text', '', 'City', (city: string) => {
      return city.length < 40 && /^[a-zA-Z\s]+$/.test(city);
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

  const [page, setPage] = useState<1>(1);
  const [inputFields, setInputFields] = useState(defaultInputFields);

  const [slideProps, slidePropsApi] = useSpring(() => ({
    offset: 1,
  }));

  useEffect(() => {
    // run slider animation
    slidePropsApi.start();
  }, [inputFields, slidePropsApi]);

  function handleInputChange(e: ChangeEvent) {
    if (!e.target || !(e.target instanceof HTMLInputElement)) return;
    const name = e.target.name;
    const value = e.target.value;

    setInputFields((prev) => {
      return {
        ...prev,
        [page]: prev[page].map((field) => {
          if (field.inputDetails.name !== name) return field;

          return {
            ...field,
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

  let valid = false;
  for (let i = 0; i < inputFields[page].length; i++) {
    const field = inputFields[page][i];
    const validated = field.validator(field.inputDetails.value as string);
    if (!validated) break;
    if (i === inputFields[page].length - 1) valid = true;
  }

  let fieldsWithErrors = 0;
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
          {inputFields[page].map((field, i) => {
            const fieldHasError = field.status.type === 'error';
            if (fieldHasError) fieldsWithErrors++;
            return (
              <animated.div
                key={field.label}
                style={{
                  transform: slideProps.offset.to(
                    (offset) =>
                      `translateY(${
                        offset *
                        (fieldHasError
                          ? fieldsWithErrors - 1
                          : fieldsWithErrors) *
                        2
                      }em)`
                  ),
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
          })}
          <animated.button
            type="button"
            className="flat_btn"
            disabled={!valid}
            aria-label="next"
            style={{
              transform: slideProps.offset.to(
                (offset) => `translateY(${offset * fieldsWithErrors * 2}em)`
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
