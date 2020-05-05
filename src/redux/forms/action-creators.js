import { VALIDATED_FORM, UPDATE_FORM, SUBMIT_FORM, CLEAR_FORM, INITIALIZE_FORM, RESET_FORM } from './types';

/**
 * A Redux Action.
 * @typedef {object} Action
 * @property {string} type - The action type.
 * @property {object} payload - The changes to be sent to the reducer.
 * @property {object} options
 * @property {object} options.formId - The unique form Id.
 */

/**
 * Will return an action that will validate the form state based on your validation function and update the form state and props. This is normally
 * handled by the operations.
 *
 * @module my-react-form-state/redux
 * @param {*} arguments - arguments as object.
 * @param {Object} [arguments.errors] - key value pair { [field] : error } with the changes.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Action} an action to be executed using dispatch.
 * @throws arguments.formId is falsy.
 *
 * @example
 *
 *     dispatch(validateForm({
 *        error: {
 *          color: 'color need to be defined'
 *        },
 *        formId: 'unique-form-id'
 *     }))
 */

export const validateForm = ({ errors, formId }) => ({
  type: VALIDATED_FORM,
  payload: typeof errors === 'object' ? errors : {},
  options: {
    formId,
  },
});

/**
 * Will return an action that will update the my-form form state state with the changes once executed using dispatch.
 * Will also update all the isSubmitted, isValid, etc. props of the form and the fields based on the change.
 *
 * @module my-react-form-state/redux
 * @param {*} arguments - arguments as object.
 * @param {Object} [arguments.data] - key value pair { [field] : value } with the changes.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Action} an action to be executed using dispatch.
 * @throws arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(updateForm({
 *        data: {
 *          color: 'blue'
 *        },
 *        formId: 'unique-form-id'
 *     }))
 */

export const updateForm = ({ data, formId }) => ({
  type: UPDATE_FORM,
  payload: data,
  options: {
    formId,
  },
});

/**
 * Will submit the changes to the form and lock them.
 * Will also update all the isSubmitted, isValid, etc. props of the form and the fields based on the change.
 *
 * @module my-react-form-state/redux
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Action} an action to be executed using dispatch.
 * @throws arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(submitForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const submitForm = ({ formId }) => ({
  type: SUBMIT_FORM,
  options: {
    formId,
  },
});

/**
 * This initialize the form internal state and add it to the forms store. Normally this will be executed after the
 * component has been mounted. It is a good time for sending your initial form values.
 *
 * @module my-react-form-state/redux
 * @param {*} arguments - arguments as object.
 * @param {Object} [arguments.initialState] - your form initial state as { [props] : value }.
 * @param {Object} [arguments.fieldsDefinition] - your form fields structure state as { [props] : boolean }.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Action} an action to be executed using dispatch.
 * @throws arguments.formId is falsy
 * @example
 *
 *     dispatch(initializeForm({
 *        initialState: {
 *          color: 'red'
 *        },
 *        formId: 'unique-form-id'
 *     }))
 */

export const initializeForm = ({ initialState, formId, fieldsDefinition }) => ({
  type: INITIALIZE_FORM,
  payload: initialState,
  options: {
    formId,
    fieldsDefinition,
  },
});

/**
 * This remove all references to the form in your store. Normally will be executed when your component was unmounted.
 *
 * @module my-react-form-state/redux
 * @param {*} arguments - arguments as object.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Action} an action to be executed using dispatch.
 * @throws arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(removeForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const removeForm = ({ formId }) => ({
  type: CLEAR_FORM,
  options: {
    formId,
  },
});

/**
 * This will reset the form and all its internal props to it original state. Normally used if we want to re-use the current
 * form after was submitted. You can re-initialize the form with another initial state if you want.
 *
 * @module my-react-form-state/redux
 * @param {*} arguments - arguments as object.
 * @param {Object} [arguments.initialState] - your form initial state as { [props] : value }.
 * @param {Object} [arguments.fieldsDefinition] - your form fields structure state as { [props] : boolean }.
 * @param {string} arguments.formId - the unique form id indicator.
 * @returns {Action} an action to be executed using dispatch.
 * @throws arguments.formId is falsy
 *
 * @example
 *
 *     dispatch(resetForm({
 *        formId: 'unique-form-id'
 *     }))
 */

export const resetForm = ({ formId, initialState, fieldsDefinition }) => ({
  type: RESET_FORM,
  payload: initialState,
  options: {
    formId,
    fieldsDefinition,
  },
});
