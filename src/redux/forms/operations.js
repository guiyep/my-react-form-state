import { debounce } from '@mfs-lib/debounce';
import { unflatten } from '@mfs-lib/flat';
import ParamValidator from '@mfs-lib/param-validator';
import { getFormFromRegistry } from '@mfs-registry';

import { getFormIdState, getFormResult } from './selectors';

import {
  validateForm as validateFormAction,
  updateForm as updateFormAction,
  submitForm as submitFormAction,
  removeForm as removeFormAction,
  initializeForm as initializeFormAction,
  resetForm as resetFormAction,
} from './action-creators';

/**
 * A function that returns an expression to be executed later.
 * @typedef {function} Thunk
 * @returns {Function}
 */

/**
 * Will validate the form state based on your validation function and update the form state and props.
 *
 * @kind Thunk
 * @name validateForm
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Promise} Promise when dispatched
 * @throws arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(validateForm({
 *        formId: 'unique-form-id'
 *     }))
 */

const validateForm = ({ formId }) => async (dispatch, getState) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isFunction(dispatch, 'dispatch');
  ParamValidator.isFunction(getState, 'getState');

  const formData = getFormFromRegistry(formId);
  const validatorFunction = formData.formValidator;

  if (!validatorFunction) {
    dispatch(validateFormAction({ errors: undefined, formId }));
    return true;
  }

  const formState = getFormIdState(getState(), { formId });

  const errors = await validatorFunction(unflatten({ ...formState.initialData, ...formState.data }));

  if (errors) {
    dispatch(validateFormAction({ errors, formId }));
    return false;
  }

  dispatch(validateFormAction({ errors: undefined, formId }));
  return true;
};

/**
 * Dispatchable operation that updates one field value inside the `my-react-form-state` redux state. Will update any form/field property
 * that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc).
 * The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.
 *
 * @kind Thunk
 * @name updateField
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @param {string} arguments.field - the field name inside the form.
 * @param {any} arguments.value - any value.
 * @returns Nothing.
 * @throws arguments.formId is falsy
 * @throws arguments.field is falsy
 *
 * @example
 *
 *     import { updateField } from 'my-react-form-state/redux/operations';
 *
 *     dispatch(updateField({
 *        field: 'color',
 *        value: 'red',
 *        formId: 'unique-form-id'
 *     }))
 */
export const updateField = ({ formId, field, value }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isString(field, 'field');
  ParamValidator.isFunction(dispatch, 'dispatch');

  dispatch(
    updateForm({
      formId,
      data: {
        [field]: value,
      },
    }),
  );
};

const validateFormDebounced = debounce(
  (formId, dispatch) => {
    dispatch(validateForm({ formId }));
  },
  // this number need to be bellow 100 so it is not noticeable to the user
  100,
  false,
);

/**
 * Dispatchable operation that updates one/more field/s value/s inside the `my-react-form-state` redux state. Will update any form/field property
 * that is being affected by this field. (ex: isSubmittable, isValid, isInvalid, etc).
 * The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.
 *
 * @kind Thunk
 * @name updateForm
 * @param {*} arguments - arguments as object.
 * @param {Object} arguments.data -  a key value pair with the form data. { [key] : value, [key] : value }
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns Nothing.
 * @throws arguments.formId is falsy
 * @throws arguments.data is falsy
 *
 * @example
 *
 *     import { updateForm } from 'my-react-form-state/redux/operations';
 *
 *     dispatch(updateForm({
 *        data: {
 *          color: 'red'
 *        },
 *        formId: 'unique-form-id'
 *     }))
 */

export const updateForm = ({ formId, data }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(data, 'data');
  ParamValidator.isFunction(dispatch, 'dispatch');

  dispatch(updateFormAction({ data, formId }));

  validateFormDebounced(formId, dispatch);
};

/**
 * Dispatchable operation that will submit and lock the form state. Will set the isSubmitted form property to true.
 * You can await for this operation and will resolve the promise once the validation is completed after the form is submitted.
 * The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.
 *
 * @kind Thunk
 * @name submitForm
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Promise} Promise when dispatched.
 * @throws arguments.formId is falsy
 *
 * @example
 *      import { submitForm } from 'my-react-form-state/redux/operations';
 *
 *     dispatch(submitForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const submitForm = ({ formId }) => async (dispatch, getState) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isFunction(dispatch, 'dispatch');

  dispatch(submitFormAction({ formId }));

  await dispatch(validateForm({ formId }));

  return getFormResult(getState(), { formId });
};

/**
 * Dispatchable operation that will initialize the form state. Normally use it after the component that uses this operation is mounted.
 * You can await for this operation and will resolve the promise once the form is initialized.
 * The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.
 *
 * @kind Thunk
 * @name initializeForm
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @param {Object} [arguments.initialState] - the form initial state
 * @returns {Promise} Promise when dispatched.
 * @throws arguments.formId is falsy
 *
 * @example
 *     import { initializeForm } from 'my-react-form-state/redux/operations';
 *
 *     dispatch(initializeForm({
 *        formId: 'unique-form-id'
 *     }))
 *
 */

export const initializeForm = ({ formId, initialState = {} }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isObject(initialState, 'initialState');
  ParamValidator.isFunction(dispatch, 'dispatch');

  const { fieldsDefinition } = getFormFromRegistry(formId);

  dispatch(initializeFormAction({ initialState, formId, fieldsDefinition }));

  // it is not always the case we need to validate the schema on initialization
  return dispatch(validateForm({ formId }));
};

/**
 * Dispatchable operation that will clear the form state from the store. Normally use it after the component that uses this operation is unmounted.
 * The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.
 *
 * @kind Thunk
 * @name removeForm
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns Nothing.
 * @throws arguments.formId is falsy
 *
 * @example
 *     import { removeForm } from 'my-react-form-state/redux/operations';
 *
 *     dispatch(removeForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const removeForm = ({ formId }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.isFunction(dispatch, 'dispatch');

  return dispatch(removeFormAction({ formId }));
};

/**
 * Dispatchable operation that will reset the form state to the initial state. You can also change the initialState using the operation.
 * The `formId` is not required when used using `registerForm` from `my-react-form-state/core` or `useMyFormState` from `my-react-form-state/react` or `my-react-form-state/react-redux`.
 *
 * @kind Thunk
 * @name resetForm
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @param {Object} [arguments.initialState] - the form initial state
 * @returns Nothing.
 * @throws arguments.formId is falsy
 *
 * @example
 *     import { resetForm } from 'my-react-form-state/redux/operations';
 *
 *     dispatch(resetForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const resetForm = ({ formId, initialState }) => (dispatch) => {
  ParamValidator.isString(formId, 'formId');
  ParamValidator.notRequired.isObject(initialState, 'initialState');
  ParamValidator.isFunction(dispatch, 'dispatch');

  const formData = getFormFromRegistry(formId);
  dispatch(removeFormAction({ formId }));
  dispatch(
    resetFormAction({
      formId,
      initialState: initialState || formData.initialState,
      fieldsDefinition: formData.fieldsDefinition,
    }),
  );
};
