import { memoize } from '@mfs-lib/memoize';
import ParamValidator from '@mfs-lib/param-validator';
import { getFormFromRegistry } from '@mfs-registry';
import { gerReducerProp, gerDefaultReducerProp } from '../init';

export const getFormIdState = (state, { formId }) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  const formsListState = state && state[gerReducerProp() || gerDefaultReducerProp()];

  if (!formsListState) {
    // we will hit this only running from redux
    throw new Error(
      '`my-react-form-state` reducer has not been initialized yet. Please run first `initializeReducer` from `my-react-form-state/redux`',
    );
  }

  return (formsListState && formsListState[formId]) || {};
};

const memoizeGetForm = memoize((formId, thisFormIdState) => {
  const { initialFields, initialState } = getFormFromRegistry(formId);

  return {
    data: thisFormIdState.data || {},

    initialData: thisFormIdState.initialData || initialState,

    resultData: thisFormIdState.resultData,

    isSubmitted: thisFormIdState.isSubmitted,

    isSubmittable: thisFormIdState.isSubmittable,

    isInitialized: thisFormIdState.isInitialized,

    isTouched: thisFormIdState.isTouched,

    isPristine: thisFormIdState.isPristine,

    errors: thisFormIdState.errors || {},

    isValid: thisFormIdState.isValid,

    isInvalid: thisFormIdState.isInvalid,

    dirtyFields: thisFormIdState.dirtyFields || {},

    fields: thisFormIdState.fields || initialFields || {},
  };
});

/**
 * Selector that returns the current state of the form.
 * Passing formId is not required when used using `registerForm` from `my-react-form-state/core`.
 *
 * @kind function
 * @name getForm
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - The unique form id indicator.
 * @returns {object} form state.
 * @throws arguments.formId is falsy
 *
 * @example
 *     import { getForm } from 'my-react-form-state/redux/selectors';
 *
 *     getForm(state, { formId: 'unique-form-id' })
 *
 */

export const getForm = (state, { formId }) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  const thisFormIdState = getFormIdState(state, { formId }) || {};
  return memoizeGetForm(formId, thisFormIdState);
};

/**
 * Gets the forms result data. This result data is the merge between the form changes and the initial state.
 * Passing formId is not required when used using `registerForm` from `my-react-form-state/core`.
 *
 * @kind function
 * @name getFormResult
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - The unique form id indicator.
 * @returns {object} form state.
 * @throws arguments.formId is falsy
 *
 * @example
 *     import { getFormResult } from 'my-react-form-state/redux/selectors';
 *
 *     getFormResult(state, { formId: 'unique-form-id' })
 *
 */

export const getFormResult = (state, { formId }) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(state, 'state');

  const thisFormIdState = getFormIdState(state, { formId }) || {};
  return thisFormIdState && thisFormIdState.resultData;
};
