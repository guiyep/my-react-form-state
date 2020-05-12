import { useMemo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { registerForm, getFormFromRegistry } from '@mfs-core';
import { useThunks } from './useThunks';

/**
 * @typedef {object} formState
 * @property {string} fromId
 */

/**
 * @typedef {[formState, { resetForm: function, updateForm: function, submitForm:function, updateField: function}]} MyFormStateHook
 */

/**
 * React-redux hook that will execute an update each time the redux form state changes. you will be able to
 * perform any of the next actions:
 * - resetForm
 * - updateForm
 * - submitForm : Promise. (will be resolve when the form is locked and will return the result)
 * - updateField
 * - removeForm
 *
 * @kind react-redux hook.
 * @param {*} arguments - arguments as object.
 * @param {string} [arguments.formId] - The unique form id indicator, will generate a unique id if not.
 * @param {Function} [arguments.formValidator] - The form validator.
 * @param {Function} [arguments.formSchema] - The form schema. This can be json-schema, yup or joi.
 * @param {Object} [arguments.initialState] - The initial state you want to use.
 * @param {boolean} [arguments.clearOnUnmount=true] - When the component unmounts it will remove the form reference.
 * @param {boolean} [arguments.isGlobalForm=false] - Tells if the form is defined global or not. If that is the case we will just reuse it.
 * @param {boolean} [arguments.onFormChange] - Callback that is executed when the from state changes.
 * @return {MyFormStateHook} hook to be use in a react component.
 *
 * @example
 *
 * import yup from 'my-react-form-state/yup'
 *
 * const [formState, { updateField, updateForm, submitForm, resetForm}] = useMyFormState({
 *     initialState: { ...props },
 *     formSchema: yup.formSchema(schema),
 * });
 */

export const useMyFormState = ({
  formId,
  formValidator,
  formSchema,
  initialState,
  clearOnUnmount = true,
  isGlobalForm = false,
  onFormChange = () => {},
}) => {
  const {
    operations,
    selectors: { getForm },
    unregister,
    initialFormState,
  } = useMemo(
    () =>
      ((!isGlobalForm && registerForm) || getFormFromRegistry)({
        formId,
        formValidator,
        initialState,
        formSchema,
      }),
    [],
  );

  const formState = useSelector(getForm);
  const dispatch = useThunks();

  useEffect(() => {
    dispatch(operations.initializeForm({ initialState: initialFormState }));
    return () => {
      unregister();
      if (clearOnUnmount) {
        dispatch(operations.removeForm());
      }
    };
  }, []);

  useEffect(() => {
    onFormChange(formState);
  }, [formState]);

  const resetForm = useCallback((param) => dispatch(operations.resetForm({ initialState: param.initialState })), [
    operations.resetForm,
  ]);

  const updateForm = useCallback(({ data }) => dispatch(operations.updateForm(data)), [operations.updateForm]);

  const submitForm = useCallback(() => dispatch(operations.submitForm()), [operations.submitForm]);

  const updateField = useCallback(({ field, value }) => dispatch(operations.updateField({ field, value })), [
    operations.updateField,
  ]);

  return [
    formState,
    {
      resetForm,
      updateForm,
      updateField,
      submitForm,
    },
  ];
};
