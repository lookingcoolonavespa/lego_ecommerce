import { useReducer, ChangeEvent, FocusEvent } from 'react';
import { isCheckbox } from '../../types/typeGuards';
import { CheckoutPageRange, InputFields } from '../../types/types';

export default function useInputFields(
  page: CheckoutPageRange,
  init: InputFields
) {
  const [inputFields, dispatch] = useReducer(reducer, init);
  function reducer(
    state: InputFields,
    action: {
      type: 'change' | 'blur';
      payload: {
        name: string;
        value: string;
      };
    }
  ): InputFields {
    const { type, payload } = action;
    let { name, value } = payload;
    const field = state[page].find((f) => f.inputDetails.name === name);

    if (!isCheckbox(field)) {
      switch (type) {
        case 'blur': {
          const validated = field?.validator(value as string);

          if (!validated)
            return {
              ...state,
              [page]: state[page].map((field) => {
                if (isCheckbox(field)) return field;
                if (field.inputDetails.name !== name) return field;

                return {
                  ...field,
                  status: {
                    type: 'error',
                    message: `not a valid ${field.dataType.toLowerCase()}`,
                  },
                };
              }),
            };

          return state;
        }
        case 'change': {
          return {
            ...state,
            [page]: state[page].map((field) => {
              if (isCheckbox(field)) return field;

              if (field.inputDetails.name !== name) return field;

              //run change cb from field
              value = field.handleChange
                ? (field.handleChange(value) as string)
                : value;

              // validate field
              const validated = field.validator(value);
              let status = field.status;
              if (validated) status.type = undefined;

              //check length
              if (field.maxLength && value.length > field.maxLength)
                value = field.inputDetails.value as string;

              return {
                ...field,
                status,
                inputDetails: { ...field.inputDetails, value },
              };
            }),
          };
        }
      }
    }

    if (isCheckbox(field)) {
      if (type === 'change')
        return {
          ...state,
          [page]: state[page].map((field) => {
            if (field.inputDetails.name !== name) return field;
            if (!isCheckbox(field)) return field;

            return {
              ...field,
              inputDetails: {
                ...field.inputDetails,
                checked: !field.inputDetails.checked,
              },
            };
          }),
        };

      return state;
    }

    return state;
  }

  function handleInputEvent(eventType: 'change' | 'blur') {
    return (
      e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
    ) => {
      const name = e.target.name;
      const value = e.target.value;

      dispatch({
        type: eventType,
        payload: {
          name,
          value,
        },
      });
    };
  }

  const handleInputChange = handleInputEvent('change');

  const handleInputBlur = handleInputEvent('blur');

  return { inputFields, handleInputBlur, handleInputChange };
}
