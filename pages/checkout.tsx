import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSpring, animated, useSprings } from 'react-spring';
import Link from 'next/link';
import styles from '../styles/Checkout.module.scss';
import LegoLego from '../components/svg/LegoLogo';
import {
  CheckboxInputFieldInterface,
  InputFieldInterface,
} from '../types/interfaces';
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
import { CheckoutFormTitles, InputFields } from '../types/types';
import useInputFields from '../utils/hooks/useInputFields';
import { isCheckbox } from '../types/typeGuards';
import Animate from '../components/Animate';
import CartProductsCtn from '../components/CartProductsCtn';
import CartPriceCtn from '../components/CartPriceCtn';
import useMobile from '../utils/hooks/useMobile';

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
  'Personal Information': [
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
  'Shipping Address': [
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
      testNumeric.haveLength(5),
      5,
      true
    ),
  ],
  'Billing Information': [
    TextInputField(
      'number',
      '',
      'Credit Card',
      undefined,
      testNumeric.haveLength(16),
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
      testNumeric.haveLength(3),
      3,
      true
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
      testNumeric.haveLength(5),
      5,
      true
    ),
  ],
};

const billingAddyStartIdx = defaultInputFields['Billing Information'].findIndex(
  (inputField) => inputField.label === 'Street Address'
);

const billingCheckbox = CheckboxInputField(
  true,
  'Billing address same as shipping',
  'sameAddress',
  false,
  () => true,
  () => {},
  styles.checkbox_wrapper
);

export default function Checkout() {
  type PageRange = 0 | 1 | 2;
  const startPage = 0;
  const [page, setPage] = useState<PageRange>(startPage);
  const prevPage = useRef(startPage);
  const pageTitle = useMemo(
    () => Object.keys(defaultInputFields)[page] as CheckoutFormTitles,
    [page]
  );
  const { inputFields, handleInputBlur, handleInputChange } = useInputFields(
    pageTitle,
    defaultInputFields
  );
  const [billingAddySameAsShipping, setBillingAddySameAsShipping] =
    useState(true);

  const billingSpring = useSpring({
    transform: billingAddySameAsShipping
      ? 'translateY(-10%)'
      : 'translateY(0%)',
    opacity: billingAddySameAsShipping ? 0 : 1,
  });
  const [btnSpring, btnSpringApi] = useSpring(() => ({
    transform: 'translateY(0em)',
  }));
  const [checkboxSpring, checkboxSpringApi] = useSpring(() => ({
    transform: 'translateY(0em)',
  }));
  const [springs, springsApi] = useSprings(
    inputFields[pageTitle].length,
    () => ({
      transform: 'translateY(0em)',
    })
  );

  useEffect(() => {
    // run animation

    let halfSizeCount = 0;

    let errorsAboveCheckbox = 0;
    let totalErrors = 0;
    springsApi.start((idx) => {
      if (idx === billingAddyStartIdx && pageTitle === 'Billing Information')
        errorsAboveCheckbox = totalErrors;

      if (
        idx >= billingAddyStartIdx &&
        pageTitle === 'Billing Information' &&
        billingAddySameAsShipping
      )
        return;
      const curr = inputFields[pageTitle][idx];
      if (curr.halfSize) {
        // every two halfSize elements means a new row
        if (halfSizeCount === 2) halfSizeCount = 0;
        if (halfSizeCount < 2) halfSizeCount++;
      }

      if (
        halfSizeCount === 2 &&
        inputFields[pageTitle][idx - 1].status.type === 'error'
      ) {
        halfSizeCount = 0;
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

    checkboxSpringApi.start(() => ({
      transform: `translateY(${errorsAboveCheckbox * 2}em)`,
    }));

    btnSpringApi.start(() => ({
      transform: `translateY(${totalErrors * 2}em)`,
    }));
  }, [
    inputFields,
    billingAddySameAsShipping,
    pageTitle,
    btnSpringApi,
    springsApi,
    checkboxSpringApi,
  ]);

  const maxPage = Object.keys(defaultInputFields).length;
  function toNextPage() {
    setPage((prev) => {
      if (prev === maxPage) return prev;
      const nextPage = (prev + 1) as PageRange;
      prevPage.current = prev;
      return nextPage;
    });
  }

  function toPrevPage() {
    setPage((prev) => {
      if (prev === 0) return prev;
      const previousPage = (prev - 1) as PageRange;
      prevPage.current = prev;
      return previousPage;
    });
  }

  // check to disable/enable 'next' button
  let valid = false;
  for (let i = 0; i < inputFields[pageTitle].length; i++) {
    const field = inputFields[pageTitle][i];
    if (!field.validator) continue;
    const validated = isCheckbox(field)
      ? field.validator(field.inputDetails.checked as boolean)
      : field.validator(field.inputDetails.value as string);
    if (!validated) break;
    if (i === inputFields[pageTitle].length - 1) valid = true;
  }

  const { mobileCheck } = useMobile();

  return (
    <div className={styles.container}>
      <nav>
        <Link href="/">
          <div className={styles.logo_wrapper}>
            <LegoLego />
          </div>
        </Link>
      </nav>
      <main className={mobileCheck ? `${styles.mobile}` : 'two_col_view'}>
        <Animate
          tag="form"
          className={styles.form_ctn}
          key={page}
          animation={{
            from: {
              transform:
                page - prevPage.current > 0
                  ? 'translateX(10%)'
                  : 'translateX(-10%)',
              opacity: 0,
            },
            to: {
              transform: 'translateY(0%)',
              opacity: 1,
            },
          }}
        >
          <header>
            <h3>{pageTitle}</h3>
          </header>
          <div className={styles.inputs_ctn}>
            {springs.map((animationStyles, i) => {
              if (
                i >= billingAddyStartIdx &&
                pageTitle === 'Billing Information'
              )
                return;

              const field = inputFields[pageTitle][i];
              const rootClass = [field.halfSize ? 'half-size' : 'full-size'];
              return (
                <animated.div
                  key={field.label}
                  style={animationStyles}
                  className={rootClass.join(' ')}
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
            {pageTitle === 'Billing Information' && (
              <animated.div style={checkboxSpring}>
                <InputWrapperWithError
                  label={billingCheckbox.label}
                  inputDetails={{
                    ...billingCheckbox.inputDetails,
                    checked: billingAddySameAsShipping,
                  }}
                  inputStatus={billingCheckbox.status}
                  handleChange={() =>
                    setBillingAddySameAsShipping((prev) => !prev)
                  }
                  className={billingCheckbox.className}
                />
              </animated.div>
            )}
            {pageTitle === 'Billing Information' && !billingAddySameAsShipping && (
              <animated.div style={billingSpring} className={styles.inputs_ctn}>
                {springs.map((animationStyles, i) => {
                  if (i < billingAddyStartIdx) return;
                  const field = inputFields[pageTitle][i];

                  const rootClass = [
                    field.halfSize ? 'half-size' : 'full-size',
                  ];
                  return (
                    <animated.div
                      key={field.label}
                      style={animationStyles}
                      className={rootClass.join(' ')}
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
              </animated.div>
            )}
          </div>
          <animated.div className={styles.btn_ctn} style={btnSpring}>
            {page !== 0 && (
              <button
                type="button"
                onClick={toPrevPage}
                className={`flat_btn ${styles.prev_btn}`}
                aria-label="previous"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={toNextPage}
              className={`flat_btn ${styles.next_btn}`}
              disabled={!valid || page === maxPage}
              aria-label="next"
            >
              {page === 2 ? 'Checkout' : 'Next'}
            </button>
          </animated.div>
        </Animate>
        <Animate
          tag="div"
          animation={{
            from: {
              transform: 'translateX(10%)',
              opacity: 0,
            },
            to: {
              transform: 'translateY(0%)',
              opacity: 1,
            },
          }}
          className={styles.col_two}
        >
          <CartProductsCtn className={styles.products_ctn} />
          <CartPriceCtn className={styles.price_ctn} />
        </Animate>
      </main>
    </div>
  );
}
