import { flatten, unflatten } from '@mfs-lib/flat';
import { getFields } from '@mfs-lib/get-fields';
import { VALIDATED_FORM, UPDATE_FORM, SUBMIT_FORM, CLEAR_FORM, INITIALIZE_FORM, RESET_FORM } from './types';

export const myFormStateReducer = (state = {}, action) => {
  const formId = action && action.options && action.options.formId;

  if (!formId) {
    return state;
  }

  const formState = state[formId];
  const nextFormState = formReducer(formState, action);

  if (nextFormState === undefined) {
    // eslint-disable-next-line
    delete state[formId];
    return state;
  }

  // eslint-disable-next-line
  state[formId] = nextFormState;
  return state;
};

export const formReducer = (state = {}, action) => {
  switch (action.type) {
    case VALIDATED_FORM: {
      const isInvalid = (action.payload && Object.keys(action.payload).length > 0) || false;

      const nextState = {
        ...state,
        errors: flatten(action.payload),
        isInvalid,
        isValid: !isInvalid,
        isSubmittable: !!state.isTouched && !isInvalid,
      };

      nextState.fields = getFields(nextState);
      return nextState;
    }
    case UPDATE_FORM: {
      if (action.payload) {
        const flattenData = flatten(action.payload);

        const nextState = {
          ...state,
          isPristine: false,
          isTouched: true,
          isSubmitted: false,
          isSubmittable: !!state.isTouched && !!state.isValid,
          dirtyFields: state.dirtyFields || {},
        };

        Object.assign(
          nextState.dirtyFields,
          Object.keys(flattenData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {}),
        );

        Object.assign(state.data, flattenData);

        nextState.fields = getFields(nextState, true);
        return nextState;
      }

      return state;
    }

    case INITIALIZE_FORM:
    case RESET_FORM: {
      const nextState = {
        data: {},
        initialData: action.payload ? flatten(action.payload) : {},
        isPristine: true,
        isInitialized: true,
        isSubmitted: false,
        isSubmittable: false,
        isTouched: false,
        errors: {},
        dirtyFields: {},
        isInvalid: undefined,
        isValid: undefined,
      };

      nextState.fields = getFields(nextState, true);
      return nextState;
    }

    case SUBMIT_FORM: {
      const nextState = {
        ...state,
        resultData: unflatten({ ...state.initialData, ...state.data }),
        isSubmitted: true,
      };

      nextState.fields = getFields(nextState);
      return nextState;
    }

    case CLEAR_FORM:
      return undefined;

    default:
      return state;
  }
};

export default myFormStateReducer;
